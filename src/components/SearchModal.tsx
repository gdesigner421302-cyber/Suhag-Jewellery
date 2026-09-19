import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { BESTSELLER_PRODUCTS, Product } from '../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectProduct }) => {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const tags = ['All', 'Polki', 'Kundan', 'Temple Gold', 'Jhumkas', 'Rings'];

  const filtered = useMemo(() => {
    return BESTSELLER_PRODUCTS.filter((product) => {
      const matchesText = 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.purity.toLowerCase().includes(query.toLowerCase()) ||
        product.gemstone.toLowerCase().includes(query.toLowerCase());
      
      if (selectedTag === 'All') return matchesText;
      if (selectedTag === 'Polki') return matchesText && product.name.toLowerCase().includes('polki');
      if (selectedTag === 'Kundan') return matchesText && (product.name.toLowerCase().includes('kundan') || product.description.toLowerCase().includes('kundan'));
      if (selectedTag === 'Temple Gold') return matchesText && (product.category === 'Ring' || product.name.toLowerCase().includes('temple'));
      if (selectedTag === 'Jhumkas') return matchesText && product.category === 'Earrings';
      if (selectedTag === 'Rings') return matchesText && product.category === 'Ring';
      return matchesText;
    });
  }, [query, selectedTag]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-20 bg-black/50 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-[#FAF7F2] rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-[#E8DFD0] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="relative flex items-center border-b border-[#E0D4C2] pb-4">
          <Search className="w-5 h-5 text-[#8C7A68] mr-3" />
          <input
            type="text"
            autoFocus
            placeholder="Search Polki necklaces, gold jhumkas, temple rings..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base text-[#1E1A17] placeholder-[#9C8977] focus:outline-hidden"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-[#9C8977] hover:text-[#1E1A17] mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-[#9C8977] hover:text-[#1E1A17] hover:bg-[#F2ECE0] rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Filter Tags */}
        <div className="flex flex-wrap gap-2 pt-3 pb-4 border-b border-[#EFE8DC]">
          <span className="text-xs text-[#8C7A68] self-center mr-1">Filter:</span>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`text-xs px-3 py-1 rounded-full transition-colors ${
                selectedTag === tag 
                  ? 'bg-[#1E1A17] text-[#FAF7F2]' 
                  : 'bg-white text-[#5B4E44] border border-[#E0D4C2] hover:border-[#B8860B]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="pt-4 max-h-80 overflow-y-auto space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-[#8C7A68] text-xs">
              No jewels found matching &ldquo;{query}&rdquo;. Try searching for &ldquo;Polki&rdquo;, &ldquo;Gold&rdquo;, or &ldquo;Jhumkas&rdquo;.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectProduct(item);
                  onClose();
                }}
                className="bg-white p-3 rounded-xl border border-[#EDE4D6] hover:border-[#D4AF37] flex items-center justify-between gap-4 cursor-pointer transition-all hover:shadow-xs group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover bg-[#F7F2E8]"
                  />
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-[#1E1A17] group-hover:text-[#B8860B] transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-[#8C7A68]">
                      {item.purity} &middot; {item.gemstone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-semibold text-xs text-[#1E1A17]">
                    {item.formattedPrice}
                  </span>
                  <div className="p-1 rounded bg-[#FAF7F2] group-hover:bg-[#D4AF37] text-[#7A6855] group-hover:text-[#1E1A17] transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
