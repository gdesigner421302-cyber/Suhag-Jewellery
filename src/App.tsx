/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { BestsellerOverlay } from './components/BestsellerOverlay';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';
import { AtelierBookingModal } from './components/AtelierBookingModal';
import { CollectionsModal } from './components/CollectionsModal';
import { Footer } from './components/Footer';
import { AuthAndStoreProvider, useAuthAndStore } from './context/AuthAndStoreContext';
import { Product, BESTSELLER_PRODUCTS } from './data/products';
import { Sparkles, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import brideImg from './assets/images/indian_bride_jewelry_1789770485288.jpg';

function LandingPageContent() {
  // Modal states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [atelierModalOpen, setAtelierModalOpen] = useState(false);
  const [collectionsModalOpen, setCollectionsModalOpen] = useState(false);

  const handleShopNow = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#231F20] flex flex-col font-sans selection:bg-[#D4AF37]/20 selection:text-[#5B4314]">
      {/* Top Header */}
      <Header
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenCollections={() => setCollectionsModalOpen(true)}
        onOpenAtelier={() => setAtelierModalOpen(true)}
        onOpenContact={() => setAtelierModalOpen(true)}
      />

      {/* Main Hero Section with Split Layout & Bestseller Overlay */}
      <main className="flex-1 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          
          {/* Main Hero Container */}
          <div 
            id="hero-main-frame" 
            className="relative bg-gradient-to-br from-[#FBF8F3] via-[#F6EFE3] to-[#EDE3CF] rounded-3xl border border-[#E9DFC8] shadow-[0_15px_50px_rgba(40,32,24,0.06)] overflow-hidden min-h-[640px] lg:min-h-[720px] flex flex-col justify-between"
          >
            {/* Subtle background luxury pattern & gold ambient glow */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#FAF0DA]/50 rounded-full blur-3xl pointer-events-none -translate-x-20 -translate-y-20" />
            <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-[#E6CFA0]/30 rounded-full blur-3xl pointer-events-none" />

            {/* Split Grid: Left Text & Right Portrait */}
            <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10 flex-1">
              
              {/* Left Side Content */}
              <div 
                id="hero-left-content" 
                className="lg:col-span-7 p-6 sm:p-10 lg:p-14 flex flex-col justify-start z-10"
              >
                {/* Headline Section */}
                <div className="space-y-3 max-w-xl">
                  {/* Brand Title */}
                  <h1 
                    id="hero-main-title" 
                    className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-[#1E1A17] font-bold tracking-tight leading-[1.12]"
                  >
                    SUHAG JEWELLERY
                  </h1>

                  {/* Subhead Bracket */}
                  <p 
                    id="hero-brand-philosophy" 
                    className="font-serif text-lg sm:text-xl md:text-2xl text-[#3A302A] font-normal tracking-wide italic"
                  >
                    (Elegance. Heritage. Craftsmanship.)
                  </p>

                  {/* Subheading location tribute */}
                  <h2 
                    id="hero-subheading" 
                    className="text-base sm:text-lg text-[#2C241E] font-medium pt-1 tracking-normal"
                  >
                    Timeless Indian Jewellery, Handcrafted in Bhiwandi
                  </h2>

                  {/* Additional evocative description */}
                  <p 
                    id="hero-description" 
                    className="text-xs sm:text-sm text-[#705E4D] leading-relaxed max-w-md pt-0.5"
                  >
                    Explore Our Exclusive Collections of Kundan, Polki, and Gold Masterpieces.
                  </p>

                  {/* Solid Gold CTA Button */}
                  <div className="pt-4 pb-6 sm:pb-8">
                    <button
                      id="hero-discover-cta"
                      onClick={() => setCollectionsModalOpen(true)}
                      className="bg-[#C59B27] hover:bg-[#B3871B] active:bg-[#9E7314] text-[#FAF7F2] font-serif text-xs sm:text-sm tracking-[0.18em] font-semibold px-7 py-3.5 rounded-lg uppercase transition-all duration-300 shadow-[0_6px_20px_rgba(197,155,39,0.35)] hover:shadow-[0_8px_25px_rgba(197,155,39,0.45)] hover:-translate-y-0.5 inline-flex items-center gap-2.5 cursor-pointer"
                    >
                      <span>DISCOVER COLLECTIONS</span>
                      <ArrowRight className="w-4 h-4 stroke-[2]" />
                    </button>
                  </div>
                </div>

                {/* Bottom Left Card Overlay Container (BESTSELLERS) */}
                <div className="mt-auto pt-4 lg:pt-0">
                  <BestsellerOverlay
                    onSelectProduct={(product) => setSelectedProduct(product)}
                    onShopNow={handleShopNow}
                  />
                </div>

              </div>

              {/* Right Side Portrait */}
              <div 
                id="hero-right-portrait" 
                className="lg:col-span-5 relative h-80 sm:h-96 lg:h-auto min-h-[400px] overflow-hidden flex items-end justify-center"
              >
                {/* Organic curved transition mask on desktop for aesthetic Indian luxury flow */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={brideImg}
                    alt="Radiant Indian woman wearing emerald-green silk saree and handcrafted royal Polki gold jewelry"
                    className="w-full h-full object-cover object-center lg:object-top"
                  />
                  {/* Subtle warm lighting vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1815]/30 via-transparent to-transparent lg:hidden" />
                  <div className="hidden lg:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F6EFE3] via-[#F6EFE3]/40 to-transparent pointer-events-none" />
                </div>

                {/* Micro badge indicator */}
                <div className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/60 shadow-xs text-[11px] font-medium text-[#2C241E] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Haute Polki Suite 2026</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* Footer / Store Info */}
      <Footer
        onOpenAtelier={() => setAtelierModalOpen(true)}
        onOpenCollections={() => setCollectionsModalOpen(true)}
        onOpenContact={() => setAtelierModalOpen(true)}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenAtelier={() => setAtelierModalOpen(true)}
        onOpenCart={() => setCartDrawerOpen(true)}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Live Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectProduct={(product) => setSelectedProduct(product)}
      />

      {/* Firebase Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* Atelier Appointment & Contact Modal */}
      <AtelierBookingModal
        isOpen={atelierModalOpen}
        onClose={() => setAtelierModalOpen(false)}
      />

      {/* Collections Modal */}
      <CollectionsModal
        isOpen={collectionsModalOpen}
        onClose={() => setCollectionsModalOpen(false)}
        onSelectProduct={(product) => setSelectedProduct(product)}
        onOpenAtelier={() => setAtelierModalOpen(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthAndStoreProvider>
      <LandingPageContent />
    </AuthAndStoreProvider>
  );
}
