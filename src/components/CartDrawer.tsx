import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShieldCheck, ArrowRight, ShoppingBag, Sparkles, CheckCircle } from 'lucide-react';
import { useAuthAndStore } from '../context/AuthAndStoreContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuth: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onOpenAuth }) => {
  const { cart, removeFromCart, updateCartQuantity, clearCart, cartTotal, cartCount, user } = useAuthAndStore();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutSuccess(true);
      clearCart();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity" 
        onClick={() => {
          if (!isProcessing) {
            setCheckoutSuccess(false);
            onClose();
          }
        }} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl border-l border-[#E8DFD0] flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#EAE1D3] flex items-center justify-between bg-white/70">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#B8860B]" />
              <h2 className="font-serif text-lg text-[#1E1A17] font-semibold tracking-wide">
                Your Shopping Bag
              </h2>
              <span className="text-xs bg-[#F2ECE0] text-[#7A6855] px-2 py-0.5 rounded-full font-medium">
                {cartCount} {cartCount === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={() => {
                setCheckoutSuccess(false);
                onClose();
              }}
              className="p-1.5 text-[#7A6855] hover:text-[#1E1A17] hover:bg-[#F2ECE0] rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Checkout Success Screen */}
          {checkoutSuccess ? (
            <div className="p-8 text-center flex-1 flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mb-2">
                <CheckCircle className="w-9 h-9" />
              </div>
              <h3 className="font-serif text-2xl text-[#1E1A17] font-semibold">
                Order Placed Successfully
              </h3>
              <p className="text-xs sm:text-sm text-[#7A6855] leading-relaxed max-w-xs">
                Thank you for choosing Suhag Jewellery. Your luxury pieces are being prepared in our Bhiwandi Atelier with complimentary transit insurance.
              </p>
              <div className="bg-white p-4 rounded-xl border border-[#E8DFD0] text-left text-xs space-y-1.5 w-full max-w-xs text-[#5B4E44]">
                <div className="flex justify-between">
                  <span>Order Ref:</span>
                  <span className="font-semibold text-[#1E1A17]">SHG-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Atelier Dispatch:</span>
                  <span className="font-semibold text-[#1E1A17]">Bhiwandi Central Facility</span>
                </div>
                <div className="flex justify-between">
                  <span>Customer Support:</span>
                  <span className="font-semibold text-[#1E1A17]">+91 98200 42130</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setCheckoutSuccess(false);
                  onClose();
                }}
                className="mt-4 bg-[#2C241E] hover:bg-[#1E1A17] text-[#FAF7F2] py-2.5 px-6 rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                Continue Exploring
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              <div className="p-6 overflow-y-auto flex-1 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16 text-[#7A6855] space-y-3">
                    <div className="w-16 h-16 rounded-full bg-[#F2ECE0] flex items-center justify-center text-[#B8860B]">
                      <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                    </div>
                    <p className="font-serif text-lg text-[#1E1A17]">Your bag is currently empty</p>
                    <p className="text-xs text-[#8C7A68] max-w-xs">
                      Discover our exquisite Polki necklaces, gold jhumkas, and antique temple rings handcrafted in Bhiwandi.
                    </p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.productId}
                      className="bg-white p-3.5 rounded-xl border border-[#EDE4D6] flex gap-3.5 items-center relative group"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-18 h-18 rounded-lg object-cover bg-[#F7F2E8] border border-[#EFE8DC]"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm font-semibold text-[#1E1A17] truncate">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-[#8C7A68] truncate">
                          {item.purity}
                        </p>
                        <p className="text-xs font-bold text-[#2C2523] mt-1">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center border border-[#D5C7B3] rounded bg-[#FAF7F2]">
                            <button
                              onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                              className="px-2 py-0.5 text-xs text-[#5B4E44] hover:bg-[#EAE1D3]"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-semibold text-[#1E1A17]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                              className="px-2 py-0.5 text-xs text-[#5B4E44] hover:bg-[#EAE1D3]"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.productId)}
                            className="text-[#9C8977] hover:text-rose-600 p-1 transition-colors ml-auto"
                            aria-label={`Remove ${item.name} from bag`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer & Checkout Summary */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-[#EAE1D3] bg-white/90 space-y-3">
                  {/* Free Delivery Banner */}
                  <div className="bg-[#FAF7F2] p-2.5 rounded-lg border border-[#EDE4D6] flex items-center gap-2 text-[11px] text-[#5B4E44]">
                    <Sparkles className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    <span>Complimentary insured air transit & handcrafted velvet box included.</span>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 text-xs text-[#5B4E44]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-[#1E1A17]">
                        ₹{cartTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Insured Shipping (Bhiwandi to Doorstep)</span>
                      <span className="text-emerald-700 font-medium">FREE</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-[#1E1A17] pt-2 border-t border-[#EDE4D6]">
                      <span>Estimated Total</span>
                      <span className="font-serif text-base">
                        ₹{cartTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Auth reminder if guest */}
                  {!user && (
                    <p className="text-[11px] text-[#8C7A68] text-center">
                      Tip: <button onClick={onOpenAuth} className="underline text-[#B8860B] font-medium">Sign in with Google</button> to save your bag across devices via Firebase.
                    </p>
                  )}

                  {/* Checkout Button */}
                  <button
                    id="cart-checkout-btn"
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    className="w-full bg-[#D4AF37] hover:bg-[#B89228] text-[#1E1A17] py-3 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span>Securing Order...</span>
                    ) : (
                      <>
                        <span>Proceed to Checkout</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1 text-[10px] text-[#8C7A68]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>256-Bit Encrypted & 100% Insured Delivery</span>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};
