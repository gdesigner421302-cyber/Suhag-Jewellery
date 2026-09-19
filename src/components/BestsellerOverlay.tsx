import React from 'react';
import { BESTSELLER_PRODUCTS, Product } from '../data/products';
import { ShoppingBag, ArrowRight, Eye, Heart } from 'lucide-react';
import { useAuthAndStore } from '../context/AuthAndStoreContext';

interface BestsellerOverlayProps {
  onSelectProduct: (product: Product) => void;
  onShopNow: (product: Product) => void;
}

export const BestsellerOverlay: React.FC<BestsellerOverlayProps> = ({
  onSelectProduct,
  onShopNow,
}) => {
  const { addToCart, wishlist, toggleWishlist } = useAuthAndStore();

  return (
    <div 
      id="bestsellers-overlay-container" 
      className="bg-white/95 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-[0_12px_40px_rgba(30,26,23,0.08)] border border-[#ECE4D5] max-w-2xl w-full"
    >
      {/* Container Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#F4EFE6]">
        <h2 
          id="bestseller-heading" 
          className="font-serif tracking-[0.2em] text-sm sm:text-base text-[#1E1A17] font-bold uppercase"
        >
          BESTSELLERS
        </h2>
        <span className="text-[11px] text-[#917E6B] tracking-wider uppercase font-medium">
          Heritage Editions
        </span>
      </div>

      {/* 3 Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
        {BESTSELLER_PRODUCTS.map((product) => {
          const isWishlisted = wishlist.includes(product.id);
          return (
            <div
              key={product.id}
              id={`bestseller-card-${product.id}`}
              className="group flex flex-col bg-[#FDFBF7] rounded-xl p-2.5 sm:p-3 border border-[#F0E8DC] hover:border-[#D4AF37] hover:shadow-md transition-all duration-300 relative"
            >
              {/* Product Image Stage */}
              <div 
                className="relative w-full aspect-square rounded-lg overflow-hidden bg-[#FAF7F2] cursor-pointer mb-2.5"
                onClick={() => onSelectProduct(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Numbered badge on bottom-left of image: 1. 2. 3. */}
                <div 
                  className="absolute bottom-1.5 left-1.5 bg-[#E6C687]/90 text-[#3D2F0A] text-[10px] font-bold px-1.5 py-0.5 rounded-sm shadow-xs backdrop-blur-xs"
                >
                  {product.number}.
                </div>

                {/* Wishlist toggle icon */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  aria-label={`Save ${product.name} to wishlist`}
                  className={`absolute top-1.5 right-1.5 p-1 rounded-full backdrop-blur-xs transition-colors ${
                    isWishlisted 
                      ? 'bg-rose-50 text-rose-600' 
                      : 'bg-white/80 text-[#5F5245] hover:text-[#B8860B] hover:bg-white'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current text-rose-600' : ''}`} />
                </button>
              </div>

              {/* Product Information */}
              <div className="flex flex-col flex-grow text-center">
                <h3 
                  className="font-serif text-sm text-[#1E1A17] font-semibold tracking-tight hover:text-[#B8860B] transition-colors cursor-pointer line-clamp-1"
                  onClick={() => onSelectProduct(product)}
                >
                  {product.name}
                </h3>
                <p className="text-xs text-[#7A6855] font-medium mt-0.5 font-sans">
                  {product.formattedPrice}
                </p>

                {/* Action: Shop Now Link */}
                <div className="mt-2 pt-1 border-t border-[#F2ECE0] flex items-center justify-center gap-2">
                  <button
                    id={`shop-now-btn-${product.id}`}
                    onClick={() => onShopNow(product)}
                    className="text-[11px] text-[#2C2523] font-semibold tracking-wider hover:text-[#B8860B] transition-colors underline underline-offset-4 decoration-[#D4AF37]/60 hover:decoration-[#B8860B] inline-flex items-center gap-1 group/link"
                  >
                    <span>Shop Now</span>
                    <ArrowRight className="w-2.5 h-2.5 transition-transform group-hover/link:translate-x-0.5" />
                  </button>

                  <button
                    onClick={() => addToCart(product, 1)}
                    className="p-1 text-[#8B7355] hover:text-[#1E1A17] hover:bg-[#EFE7D8] rounded transition-colors"
                    title="Quick add to bag"
                    aria-label="Quick add to bag"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
