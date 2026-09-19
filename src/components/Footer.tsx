import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, ShieldCheck, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenAtelier: () => void;
  onOpenCollections: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAtelier,
  onOpenCollections,
  onOpenContact,
}) => {
  return (
    <footer id="suhag-footer" className="bg-[#FAF7F2] border-t border-[#EAE1D3] pt-10 pb-8 text-[#2C2523] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper store info & quick links grid matching mockup */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-[#EAE1D3]">
          
          {/* Brand Signature */}
          <div className="space-y-1">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1A17] font-semibold tracking-wider">
              Suhag
            </h2>
            <p className="text-xs text-[#7A6855] tracking-wide">
              Bhiwandi Indian jewellery, Handcrafted
            </p>
          </div>

          {/* Quick Links & Socials */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#1E1A17] mb-2">
                Quick Links
              </p>
              <div className="flex items-center space-x-3 text-[#5A4E44]">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white rounded-full border border-[#E0D4C2] hover:border-[#B8860B] hover:text-[#B8860B] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white rounded-full border border-[#E0D4C2] hover:border-[#B8860B] hover:text-[#B8860B] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white rounded-full border border-[#E0D4C2] hover:border-[#B8860B] hover:text-[#B8860B] transition-colors"
                  aria-label="Twitter / X"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Store Info (Bottom-Right) */}
            <div id="store-location-info" className="text-xs text-[#5A4E44] space-y-1">
              <p className="font-semibold text-[#1E1A17] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#B8860B]" />
                Bhiwandi store:
              </p>
              <p className="leading-snug">
                102, Arihant Plaza, Bhiwandi,<br />
                Maharashtra - 421302
              </p>
              <p className="text-[#8C7A68] pt-0.5">
                Appointments & Inquiries: +91 98200 42130
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8C7A68] gap-3">
          <div className="flex items-center gap-2">
            <span>&copy; 2026 Suhag Jewellery</span>
            <span>&middot;</span>
            <span className="text-[#B8860B]">Hallmarked 22KT / 24KT Gold</span>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={onOpenAtelier} className="hover:text-[#1E1A17] transition-colors">
              Atelier Appointments
            </button>
            <span>&middot;</span>
            <button onClick={onOpenCollections} className="hover:text-[#1E1A17] transition-colors">
              Heirloom Catalog
            </button>
            <span>&middot;</span>
            <button onClick={onOpenContact} className="hover:text-[#1E1A17] transition-colors">
              Concierge
            </button>
          </div>

          <div>
            <span>Copyright &copy; Suhag All Rights Reserved</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
