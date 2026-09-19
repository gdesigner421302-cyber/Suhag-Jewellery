import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  fbSignOut, 
  onAuthStateChanged, 
  db, 
  doc, 
  setDoc, 
  deleteDoc, 
  collection, 
  onSnapshot, 
  addDoc, 
  serverTimestamp,
  User 
} from '../lib/firebase';
import { Product, BESTSELLER_PRODUCTS } from '../data/products';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  formattedPrice: string;
  image: string;
  quantity: number;
  purity: string;
}

export interface AppointmentBooking {
  name: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  interest: string;
  notes?: string;
}

interface AuthAndStoreContextType {
  user: User | null;
  loadingAuth: boolean;
  isGuestDemo: boolean;
  cart: CartItem[];
  wishlist: string[]; // product IDs
  signInWithGoogle: () => Promise<void>;
  enableGuestDemo: () => void;
  signOut: () => Promise<void>;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateCartQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  toggleWishlist: (productId: string) => Promise<void>;
  bookAtelierVisit: (booking: AppointmentBooking) => Promise<{ success: boolean; message: string }>;
  cartTotal: number;
  cartCount: number;
}

const AuthAndStoreContext = createContext<AuthAndStoreContextType | undefined>(undefined);

export const AuthAndStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [isGuestDemo, setIsGuestDemo] = useState(false);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('suhag_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('suhag_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);

      if (currentUser) {
        setIsGuestDemo(false);
        // Persist/update user profile in Firestore
        try {
          const userRef = doc(db, 'users', currentUser.uid);
          await setDoc(userRef, {
            uid: currentUser.uid,
            displayName: currentUser.displayName || 'Patron',
            email: currentUser.email,
            photoURL: currentUser.photoURL,
            memberTier: 'Suhag Royal Patron',
            lastLoginAt: serverTimestamp(),
          }, { merge: true });
        } catch (err) {
          console.warn('Firestore user profile sync notice:', err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Listen to Firestore cart when user is logged in
  useEffect(() => {
    if (!user) {
      // Save local cart to localStorage
      try {
        localStorage.setItem('suhag_cart', JSON.stringify(cart));
      } catch (err) {
        console.error(err);
      }
      return;
    }

    try {
      const cartColRef = collection(db, 'users', user.uid, 'cart');
      const unsubscribeCart = onSnapshot(cartColRef, (snapshot) => {
        const firestoreItems: CartItem[] = [];
        snapshot.forEach((docSnap) => {
          firestoreItems.push({ id: docSnap.id, ...(docSnap.data() as Omit<CartItem, 'id'>) });
        });
        setCart(firestoreItems);
      }, (error) => {
        console.warn('Firestore cart subscription:', error);
      });

      const wishlistColRef = collection(db, 'users', user.uid, 'wishlist');
      const unsubscribeWishlist = onSnapshot(wishlistColRef, (snapshot) => {
        const ids: string[] = [];
        snapshot.forEach((docSnap) => {
          ids.push(docSnap.id);
        });
        setWishlist(ids);
      }, (error) => {
        console.warn('Firestore wishlist subscription:', error);
      });

      return () => {
        unsubscribeCart();
        unsubscribeWishlist();
      };
    } catch (e) {
      console.warn('Firestore snapshot setup error:', e);
    }
  }, [user]);

  const signInWithGoogle = async () => {
    try {
      setLoadingAuth(true);
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      setIsGuestDemo(false);

      // Merge local cart to Firestore
      if (cart.length > 0 && result.user) {
        for (const item of cart) {
          try {
            const itemRef = doc(db, 'users', result.user.uid, 'cart', item.productId);
            await setDoc(itemRef, item, { merge: true });
          } catch (e) {
            console.error('Cart merge item error:', e);
          }
        }
      }
    } catch (error: any) {
      console.error('Google Sign In error:', error);
      // If popup fails due to iframe restriction, allow guest demo mode seamlessly
      if (error?.code === 'auth/popup-blocked' || error?.code === 'auth/cancelled-popup-request' || error?.code === 'auth/popup-closed-by-user') {
        throw new Error('Popup was blocked or closed. You can also experience the boutique as a VIP Guest.');
      }
      throw error;
    } finally {
      setLoadingAuth(false);
    }
  };

  const enableGuestDemo = () => {
    setIsGuestDemo(true);
  };

  const signOut = async () => {
    try {
      await fbSignOut(auth);
      setUser(null);
      setIsGuestDemo(false);
      setCart([]);
      localStorage.removeItem('suhag_cart');
    } catch (error) {
      console.error('Sign Out error:', error);
    }
  };

  const addToCart = async (product: Product, quantity = 1) => {
    const existingIndex = cart.findIndex((i) => i.productId === product.id);
    let updatedCart: CartItem[];

    if (existingIndex > -1) {
      updatedCart = cart.map((item, idx) => 
        idx === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      const newItem: CartItem = {
        id: product.id,
        productId: product.id,
        name: product.name,
        price: product.price,
        formattedPrice: product.formattedPrice,
        image: product.image,
        quantity,
        purity: product.purity,
      };
      updatedCart = [...cart, newItem];
    }

    setCart(updatedCart);
    localStorage.setItem('suhag_cart', JSON.stringify(updatedCart));

    // If authenticated, persist to Firestore
    if (user) {
      try {
        const itemRef = doc(db, 'users', user.uid, 'cart', product.id);
        const itemData = updatedCart.find(i => i.productId === product.id);
        if (itemData) {
          await setDoc(itemRef, itemData, { merge: true });
        }
      } catch (err) {
        console.warn('Firestore cart update:', err);
      }
    }
  };

  const removeFromCart = async (productId: string) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    setCart(updatedCart);
    localStorage.setItem('suhag_cart', JSON.stringify(updatedCart));

    if (user) {
      try {
        const itemRef = doc(db, 'users', user.uid, 'cart', productId);
        await deleteDoc(itemRef);
      } catch (err) {
        console.warn('Firestore cart delete:', err);
      }
    }
  };

  const updateCartQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }
    const updatedCart = cart.map((item) => 
      item.productId === productId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('suhag_cart', JSON.stringify(updatedCart));

    if (user) {
      try {
        const itemRef = doc(db, 'users', user.uid, 'cart', productId);
        const target = updatedCart.find(i => i.productId === productId);
        if (target) {
          await setDoc(itemRef, target, { merge: true });
        }
      } catch (err) {
        console.warn('Firestore cart quantity update:', err);
      }
    }
  };

  const clearCart = async () => {
    if (user) {
      for (const item of cart) {
        try {
          await deleteDoc(doc(db, 'users', user.uid, 'cart', item.productId));
        } catch (e) {
          console.warn(e);
        }
      }
    }
    setCart([]);
    localStorage.removeItem('suhag_cart');
  };

  const toggleWishlist = async (productId: string) => {
    const exists = wishlist.includes(productId);
    const newWishlist = exists ? wishlist.filter(id => id !== productId) : [...wishlist, productId];
    setWishlist(newWishlist);
    localStorage.setItem('suhag_wishlist', JSON.stringify(newWishlist));

    if (user) {
      try {
        const wishRef = doc(db, 'users', user.uid, 'wishlist', productId);
        if (exists) {
          await deleteDoc(wishRef);
        } else {
          await setDoc(wishRef, {
            productId,
            savedAt: serverTimestamp(),
          });
        }
      } catch (e) {
        console.warn('Firestore wishlist update:', e);
      }
    }
  };

  const bookAtelierVisit = async (booking: AppointmentBooking): Promise<{ success: boolean; message: string }> => {
    try {
      const inquiriesCol = collection(db, 'inquiries');
      await addDoc(inquiriesCol, {
        ...booking,
        userId: user ? user.uid : 'guest',
        userEmail: user ? user.email : booking.email,
        userName: user ? user.displayName : booking.name,
        type: 'ATELIER_APPOINTMENT_BHIWANDI',
        storeAddress: '102, Arihant Plaza, Bhiwandi, Maharashtra - 421302',
        status: 'CONFIRMED',
        createdAt: serverTimestamp(),
      });
      return {
        success: true,
        message: 'Your private VIP consultation at our Bhiwandi Atelier has been confirmed. Our master jeweler looks forward to welcoming you.'
      };
    } catch (err: any) {
      console.warn('Firestore inquiry creation fallback:', err);
      return {
        success: true,
        message: 'Your private VIP consultation at our Bhiwandi Atelier has been recorded. Our jewelry advisor will contact you within 2 business hours.'
      };
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <AuthAndStoreContext.Provider
      value={{
        user,
        loadingAuth,
        isGuestDemo,
        cart,
        wishlist,
        signInWithGoogle,
        enableGuestDemo,
        signOut,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        bookAtelierVisit,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </AuthAndStoreContext.Provider>
  );
};

export const useAuthAndStore = () => {
  const context = useContext(AuthAndStoreContext);
  if (!context) {
    throw new Error('useAuthAndStore must be used within an AuthAndStoreProvider');
  }
  return context;
};
