import React, { useState } from 'react';
import { Product } from '../data/products';
import { X, ShieldCheck, Truck, RefreshCw, Star, Heart, Check, Sparkles } from 'lucide-react';
import { useAuthAndStore } from '../context/AuthAndStoreContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenAtelier: () => void;
  onOpenCart: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenAtelier,
  onOpenCart,
}) => {
  const { addToCart, wishlist, toggleWishlist } = useAuthAndStore();
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  if (!product) return null;

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = async () => {
    await addToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2400);
  };

  const handleBuyNow = async () => {
    await addToCart(product, quantity);
    onClose();
    onOpenCart();
  };

  return (
    <div 
      id="product-detail-modal-backdrop" 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div 
        id="product-detail-modal-card" 
        className="bg-[#FAF7F2] rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E8DFD0] relative flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-product-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-[#2C2523] rounded-full shadow-xs transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Jewelry Image */}
        <div className="md:w-1/2 bg-[#F3EDE2] p-6 flex flex-col items-center justify-center relative">
          <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-inner bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-3 left-3 bg-[#1C1815] text-[#D8C7A5] text-[10px] font-semibold tracking-wider px-2 py-1 rounded-sm uppercase">
              {product.tag}
            </span>
          </div>

          <p className="text-[11px] text-[#8C7A68] mt-3 text-center italic">
            Photographed under studio lighting at Suhag Atelier, Bhiwandi
          </p>
        </div>

        {/* Right Column: Jewel Details */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* Category & Rating */}
            <div className="flex items-center justify-between">
              <span className="text-xs tracking-[0.2em] text-[#B8860B] font-semibold uppercase">
                {product.category} &middot; Suhag Signature
              </span>
              <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>4.9 (42 reviews)</span>
              </div>
            </div>

            {/* Title & Price */}
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1E1A17] font-semibold mt-1">
              {product.name}
            </h2>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="text-2xl font-serif text-[#1E1A17] font-bold">
                {product.formattedPrice}
              </span>
              <span className="text-xs text-[#7A6855] font-sans">
                (Inclusive of all taxes & BIS Hallmarking)
              </span>
            </div>

            {/* Description */}
            <p className="mt-3 text-xs sm:text-sm text-[#5B4E44] leading-relaxed">
              {product.description}
            </p>

            {/* Specifications Matrix */}
            <div className="mt-4 bg-white/70 rounded-xl p-3.5 border border-[#ECE2D2] space-y-1.5 text-xs text-[#44382F]">
              <div className="flex justify-between py-0.5 border-b border-[#F4EFE6]">
                <span className="text-[#8C7A68]">Gold Purity</span>
                <span className="font-medium text-[#1E1A17]">{product.purity}</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-[#F4EFE6]">
                <span className="text-[#8C7A68]">Approx. Weight</span>
                <span className="font-medium text-[#1E1A17]">{product.metalWeight}</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-[#F4EFE6]">
                <span className="text-[#8C7A68]">Gemstone / Cut</span>
                <span className="font-medium text-[#1E1A17]">{product.gemstone}</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-[#8C7A68]">Certification</span>
                <span className="font-medium text-[#1E1A17]">{product.certification}</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mt-4 flex items-center gap-4">
              <span className="text-xs font-medium text-[#5B4E44]">Quantity:</span>
              <div className="flex items-center border border-[#D5C7B3] rounded-lg bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-sm text-[#44382F] hover:bg-[#F2ECE0] transition-colors"
                >
                  -
                </button>
                <span className="px-3 py-1 text-sm font-semibold text-[#1E1A17]">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-sm text-[#44382F] hover:bg-[#F2ECE0] transition-colors"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`ml-auto p-2 rounded-lg border transition-colors flex items-center gap-1 text-xs font-medium ${
                  isWishlisted 
                    ? 'border-rose-300 bg-rose-50 text-rose-600' 
                    : 'border-[#D5C7B3] hover:border-[#B8860B] text-[#5B4E44]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-rose-600' : ''}`} />
                <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 space-y-2.5">
            <div className="flex gap-2.5">
              <button
                id="modal-add-to-cart-btn"
                onClick={handleAddToCart}
                className="flex-1 bg-[#2C241E] hover:bg-[#1E1A17] text-[#FAF7F2] py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                {addedNotice ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <span>Add to Bag</span>
                )}
              </button>

              <button
                id="modal-buy-now-btn"
                onClick={handleBuyNow}
                className="flex-1 bg-[#D4AF37] hover:bg-[#B89228] text-[#1E1A17] py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wider transition-colors shadow-xs"
              >
                Buy Now
              </button>
            </div>

            <button
              id="modal-book-atelier-btn"
              onClick={() => {
                onClose();
                onOpenAtelier();
              }}
              className="w-full text-center py-2 text-xs font-medium text-[#7A6855] hover:text-[#B8860B] transition-colors flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
              Book Private Viewing at Bhiwandi Atelier
            </button>

            {/* Trust Badges */}
            <div className="pt-3 border-t border-[#ECE2D2] grid grid-cols-3 gap-2 text-[10px] text-[#7A6855] text-center">
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#B8860B]" />
                <span>100% Certified</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-[#B8860B]" />
                <span>Insured Transit</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="w-4 h-4 text-[#B8860B]" />
                <span>Lifetime Buyback</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
