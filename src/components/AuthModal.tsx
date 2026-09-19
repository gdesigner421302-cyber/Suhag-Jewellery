import React, { useState } from 'react';
import { X, Shield, Crown, LogOut, CheckCircle, AlertCircle, Sparkles, User as UserIcon } from 'lucide-react';
import { useAuthAndStore } from '../context/AuthAndStoreContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { user, loadingAuth, isGuestDemo, signInWithGoogle, enableGuestDemo, signOut } = useAuthAndStore();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || 'Could not complete Google sign-in. You can also explore as a VIP Guest.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleGuestLogin = () => {
    enableGuestDemo();
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-[#FAF7F2] rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#E8DFD0] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#7A6855] hover:text-[#1E1A17] hover:bg-[#F2ECE0] rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {user ? (
          /* Signed In View */
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName || 'Patron'} 
                  className="w-20 h-20 rounded-full border-2 border-[#D4AF37] object-cover mx-auto shadow-md"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-[#EFE7D8] text-[#8C7A68] flex items-center justify-center mx-auto border-2 border-[#D4AF37]">
                  <UserIcon className="w-10 h-10" />
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 bg-[#D4AF37] text-[#1E1A17] p-1.5 rounded-full shadow-xs">
                <Crown className="w-4 h-4 fill-current" />
              </div>
            </div>

            <div>
              <span className="text-[11px] font-semibold tracking-[0.2em] text-[#B8860B] uppercase">
                Suhag Royal Patron
              </span>
              <h3 className="font-serif text-2xl text-[#1E1A17] font-semibold mt-0.5">
                {user.displayName || 'Distinguished Guest'}
              </h3>
              <p className="text-xs text-[#7A6855]">{user.email}</p>
            </div>

            {/* Account Perks Card */}
            <div className="bg-white/80 rounded-xl p-4 border border-[#ECE2D2] text-left text-xs space-y-2 text-[#5B4E44]">
              <div className="flex items-center gap-2 text-emerald-800 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Cloud Firestore synced (optical-tune-g0w9t)</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>Priority appointments at Bhiwandi Atelier</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#B8860B] flex-shrink-0" />
                <span>Complimentary annual jewelry cleaning & repolishing</span>
              </div>
            </div>

            <button
              onClick={async () => {
                await signOut();
                onClose();
              }}
              className="w-full mt-3 border border-[#D5C7B3] hover:border-rose-400 hover:text-rose-700 text-[#5B4E44] py-2.5 rounded-xl text-xs font-semibold tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        ) : (
          /* Sign In View */
          <div className="space-y-5">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#F2ECE0] text-[#B8860B] mb-1">
                <Crown className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-[#1E1A17] font-semibold">
                Welcome to Suhag
              </h3>
              <p className="text-xs text-[#7A6855] max-w-xs mx-auto">
                Sign in with Google to access your bespoke jewelry vault, saved heirlooms, and private atelier appointments.
              </p>
            </div>

            {errorMsg && (
              <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-3 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span>{errorMsg}</span>
                </div>
              </div>
            )}

            {/* Google Sign-in Button */}
            <button
              id="google-signin-btn"
              onClick={handleGoogleSignIn}
              disabled={isSigningIn || loadingAuth}
              className="w-full bg-white hover:bg-[#F7F3EB] border border-[#D8CCBA] text-[#1E1A17] py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-xs flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60"
            >
              {/* Google G Logo SVG */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{isSigningIn ? 'Connecting to Google...' : 'Continue with Google'}</span>
            </button>

            <div className="relative flex items-center justify-center my-3">
              <div className="border-t border-[#EAE1D3] w-full" />
              <span className="bg-[#FAF7F2] px-3 text-[11px] text-[#9C8977] uppercase tracking-wider">
                or
              </span>
            </div>

            {/* Guest Demo Option */}
            <button
              onClick={handleGuestLogin}
              className="w-full bg-[#EAE2D3]/60 hover:bg-[#EAE2D3] text-[#44382F] py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wider transition-colors"
            >
              Continue as VIP Guest (Quick Demo)
            </button>

            <div className="text-[11px] text-[#8C7A68] text-center space-y-1">
              <p>Protected by Firebase Authentication & 256-bit encryption.</p>
              <p>Your jewelry selections and bag items are securely persisted.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
