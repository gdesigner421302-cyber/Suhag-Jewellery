import React, { useState } from 'react';
import { Search, User as UserIcon, ShoppingBag, Heart, Menu, X, Sparkles, MapPin } from 'lucide-react';
import { useAuthAndStore } from '../context/AuthAndStoreContext';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  onOpenCart: () => void;
  onOpenCollections: () => void;
  onOpenAtelier: () => void;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenAuth,
  onOpenCart,
  onOpenCollections,
  onOpenAtelier,
  onOpenContact,
}) => {
  const { user, isGuestDemo, cartCount, wishlist } = useAuthAndStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header id="suhag-main-header" className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD0]/80 transition-all duration-300">
      {/* Top micro announcement bar */}
      <div className="bg-[#1C1815] text-[#D8C7A5] text-[11px] font-medium tracking-[0.2em] uppercase py-1.5 px-4 text-center flex items-center justify-center gap-4">
        <span className="hidden sm:inline-flex items-center gap-1.5 text-[#C5A059]">
          <Sparkles className="w-3 h-3 animate-pulse text-[#D4AF37]" />
          100% BIS Hallmarked 22K/24K Gold & Certified Natural Polki
        </span>
        <span className="text-[#ECE3D2]/90">
          Complimentary Insured Delivery Across India &middot; Bhiwandi Atelier Open for Private Viewings
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Top-Left: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a 
              href="#" 
              id="brand-logo" 
              className="group flex flex-col leading-none"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span className="font-serif tracking-[0.28em] text-2xl sm:text-3xl text-[#1E1A17] font-semibold group-hover:text-[#B8860B] transition-colors">
                SUHAG
              </span>
              <span className="text-[9px] tracking-[0.45em] text-[#8C7A68] uppercase -mt-0.5 font-medium pl-0.5">
                JEWELLERY
              </span>
            </a>
          </div>

          {/* Centered: Navigation Links */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-7 lg:space-x-9">
            <button
              id="nav-collections-btn"
              onClick={onOpenCollections}
              className="text-[#2C2523] hover:text-[#B8860B] text-sm tracking-[0.08em] font-medium transition-colors relative py-1 group"
            >
              Collections
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#B8860B] transition-all duration-300 group-hover:w-full" />
            </button>

            <button
              id="nav-engagement-btn"
              onClick={onOpenCollections}
              className="text-[#2C2523] hover:text-[#B8860B] text-sm tracking-[0.08em] font-medium transition-colors relative py-1 group"
            >
              Engagement
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#B8860B] transition-all duration-300 group-hover:w-full" />
            </button>

            <button
              id="nav-heritage-btn"
              onClick={onOpenCollections}
              className="text-[#2C2523] hover:text-[#B8860B] text-sm tracking-[0.08em] font-medium transition-colors relative py-1 group"
            >
              Heritage
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#B8860B] transition-all duration-300 group-hover:w-full" />
            </button>

            <button
              id="nav-bhiwandi-atelier-btn"
              onClick={onOpenAtelier}
              className="text-[#2C2523] hover:text-[#B8860B] text-sm tracking-[0.08em] font-medium transition-colors relative py-1 group flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5 text-[#B8860B]" />
              Bhiwandi Atelier
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#B8860B] transition-all duration-300 group-hover:w-full" />
            </button>

            <button
              id="nav-contact-btn"
              onClick={onOpenContact}
              className="text-[#2C2523] hover:text-[#B8860B] text-sm tracking-[0.08em] font-medium transition-colors relative py-1 group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#B8860B] transition-all duration-300 group-hover:w-full" />
            </button>
          </nav>

          {/* Top-Right: Utility Icons */}
          <div className="flex items-center space-x-4 sm:space-x-5">
            {/* Search Icon */}
            <button
              id="header-search-btn"
              onClick={onOpenSearch}
              className="p-2 text-[#2C2523] hover:text-[#B8860B] hover:bg-[#F2ECE0] rounded-full transition-colors"
              aria-label="Search jewels"
              title="Search collection"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </button>

            {/* User Icon / Profile */}
            <button
              id="header-user-btn"
              onClick={onOpenAuth}
              className="p-2 text-[#2C2523] hover:text-[#B8860B] hover:bg-[#F2ECE0] rounded-full transition-colors relative flex items-center"
              aria-label="User account"
              title={user ? `Signed in as ${user.displayName || user.email}` : 'Sign in with Google'}
            >
              {user?.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName || 'User'} 
                  className="w-6 h-6 rounded-full border border-[#D4AF37] object-cover" 
                />
              ) : (
                <UserIcon className="w-5 h-5 stroke-[1.75]" />
              )}
              {user && (
                <span className="absolute bottom-1 right-1 w-2 h-2 bg-emerald-600 rounded-full border border-white" />
              )}
              {isGuestDemo && !user && (
                <span className="absolute bottom-1 right-1 w-2 h-2 bg-amber-500 rounded-full border border-white" />
              )}
            </button>

            {/* Cart Icon with quantity badge */}
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              className="p-2 text-[#2C2523] hover:text-[#B8860B] hover:bg-[#F2ECE0] rounded-full transition-colors relative"
              aria-label="Shopping bag"
              title="Open cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
              {cartCount > 0 && (
                <span 
                  id="cart-badge-count" 
                  className="absolute -top-0.5 -right-0.5 bg-[#C59B27] text-[#1E1A17] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs"
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#2C2523] hover:text-[#B8860B] rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div id="mobile-nav-panel" className="md:hidden bg-[#FAF7F2] border-b border-[#E5DAC8] px-6 py-5 space-y-4">
          <div className="flex flex-col space-y-3 font-medium text-base text-[#2C2523]">
            <button 
              onClick={() => { onOpenCollections(); setMobileMenuOpen(false); }} 
              className="text-left py-2 border-b border-[#EFE8DC] hover:text-[#B8860B]"
            >
              Collections
            </button>
            <button 
              onClick={() => { onOpenCollections(); setMobileMenuOpen(false); }} 
              className="text-left py-2 border-b border-[#EFE8DC] hover:text-[#B8860B]"
            >
              Engagement & Bridal
            </button>
            <button 
              onClick={() => { onOpenCollections(); setMobileMenuOpen(false); }} 
              className="text-left py-2 border-b border-[#EFE8DC] hover:text-[#B8860B]"
            >
              Heritage Polki
            </button>
            <button 
              onClick={() => { onOpenAtelier(); setMobileMenuOpen(false); }} 
              className="text-left py-2 border-b border-[#EFE8DC] hover:text-[#B8860B] flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-[#B8860B]" />
              Bhiwandi Atelier (Store Visit)
            </button>
            <button 
              onClick={() => { onOpenContact(); setMobileMenuOpen(false); }} 
              className="text-left py-2 hover:text-[#B8860B]"
            >
              Contact & VIP Concierge
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
