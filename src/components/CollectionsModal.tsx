import React from 'react';
import { X, Sparkles, ArrowRight, Check } from 'lucide-react';
import { ALL_COLLECTIONS, BESTSELLER_PRODUCTS, Product } from '../data/products';

interface CollectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onOpenAtelier: () => void;
}

export const CollectionsModal: React.FC<CollectionsModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onOpenAtelier,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-[#FAF7F2] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-[#E8DFD0] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#7A6855] hover:text-[#1E1A17] hover:bg-[#F2ECE0] rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[11px] font-semibold tracking-[0.25em] text-[#B8860B] uppercase">
            Suhag Haute Joaillerie
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1A17] font-semibold mt-1">
            Curated High Jewelry Collections
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6855] mt-2">
            Handcrafted with generational mastery in our Bhiwandi Atelier using 22KT certified gold, unheated gemstones, and imperial Polki diamonds.
          </p>
        </div>

        {/* Categories Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {ALL_COLLECTIONS.map((col) => (
            <div
              key={col.id}
              className="bg-white p-5 rounded-xl border border-[#ECE2D2] hover:border-[#D4AF37] hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#B8860B] font-semibold uppercase tracking-wider">
                    {col.count}
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#1E1A17] mt-1 group-hover:text-[#B8860B] transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs text-[#7A6855] mt-1.5 leading-relaxed">
                  {col.tagline}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F4EFE6] flex items-center justify-between">
                <span className="text-xs font-medium text-[#2C2523]">22K BIS Hallmarked</span>
                <span className="text-xs text-[#B8860B] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore Suite <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Signature Masterpieces */}
        <div className="border-t border-[#EDE4D6] pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg text-[#1E1A17] font-semibold">
              Signature Creations on Exhibition
            </h3>
            <span className="text-xs text-[#8C7A68]">Ready for immediate insured dispatch</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {BESTSELLER_PRODUCTS.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectProduct(item);
                  onClose();
                }}
                className="bg-white p-3.5 rounded-xl border border-[#ECE2D2] hover:border-[#D4AF37] cursor-pointer transition-all hover:shadow-xs group"
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-[#F7F2E8] mb-2.5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h4 className="font-serif text-sm font-semibold text-[#1E1A17] group-hover:text-[#B8860B] transition-colors">
                  {item.name}
                </h4>
                <p className="text-xs font-bold text-[#2C2523] mt-0.5">
                  {item.formattedPrice}
                </p>
                <p className="text-[11px] text-[#8C7A68] mt-1 line-clamp-1">
                  {item.shortDesc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Atelier CTA banner */}
        <div className="mt-8 bg-[#1C1815] rounded-xl p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-serif text-lg text-[#FAF7F2]">
              Looking for a custom bridal ensemble or heirloom reset?
            </h4>
            <p className="text-xs text-[#D8C7A5]">
              Consult directly with our master karigars at 102, Arihant Plaza, Bhiwandi.
            </p>
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenAtelier();
            }}
            className="bg-[#D4AF37] hover:bg-[#B89228] text-[#1E1A17] text-xs font-semibold px-5 py-2.5 rounded-lg tracking-wider uppercase whitespace-nowrap transition-colors"
          >
            Book Atelier Consultation
          </button>
        </div>
      </div>
    </div>
  );
};
