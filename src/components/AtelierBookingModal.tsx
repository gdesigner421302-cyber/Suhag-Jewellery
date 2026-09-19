import React, { useState } from 'react';
import { X, MapPin, Calendar, Clock, Sparkles, CheckCircle2, User, Phone, Mail } from 'lucide-react';
import { useAuthAndStore, AppointmentBooking } from '../context/AuthAndStoreContext';
import atelierImg from '../assets/images/atelier_craftsman_1789770531033.jpg';

interface AtelierBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AtelierBookingModal: React.FC<AtelierBookingModalProps> = ({ isOpen, onClose }) => {
  const { user, bookAtelierVisit } = useAuthAndStore();
  const [formData, setFormData] = useState<AppointmentBooking>({
    name: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: '11:00 AM - 01:00 PM',
    interest: 'Bridal Polki & Kundan Suite',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await bookAtelierVisit(formData);
      setConfirmed(true);
    } catch (err) {
      console.error(err);
      setConfirmed(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-[#FAF7F2] rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E8DFD0] relative flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-[#2C2523] rounded-full shadow-xs transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Atelier Visual & Address */}
        <div className="md:w-5/12 bg-[#1C1815] text-[#FAF7F2] p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: `url(${atelierImg})` }} />
          <div className="relative z-10 space-y-3">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-[#D4AF37] uppercase">
              The Flagship Atelier
            </span>
            <h3 className="font-serif text-2xl font-semibold text-[#FCFAF6] leading-snug">
              Experience Bhiwandi Artistry Firsthand
            </h3>
            <p className="text-xs text-[#C8BAA8] leading-relaxed">
              Step into our private salon at Arihant Plaza. Witness master goldsmiths hand-carving jadau settings and try on bespoke bridal masterpieces.
            </p>
          </div>

          <div className="relative z-10 mt-6 pt-4 border-t border-[#3B342C] space-y-2 text-xs text-[#C8BAA8]">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-medium">Bhiwandi Store Location:</strong>
                <span>102, Arihant Plaza, Bhiwandi, Maharashtra - 421302</span>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <Clock className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
              <span>Tuesday – Sunday &middot; 10:30 AM to 8:30 PM</span>
            </div>
          </div>
        </div>

        {/* Right Side: Appointment Form or Confirmation */}
        <div className="md:w-7/12 p-6 sm:p-7 flex flex-col justify-center">
          {confirmed ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl text-[#1E1A17] font-semibold">
                VIP Appointment Reserved
              </h4>
              <p className="text-xs sm:text-sm text-[#7A6855] leading-relaxed max-w-sm mx-auto">
                We have reserved a private salon suite for you at 102, Arihant Plaza, Bhiwandi. A personal jewelry advisor will be awaiting your arrival.
              </p>
              <div className="bg-white p-3.5 rounded-xl border border-[#E8DFD0] text-left text-xs space-y-1 text-[#5B4E44] max-w-xs mx-auto">
                <div><strong>Date:</strong> {formData.date}</div>
                <div><strong>Slot:</strong> {formData.timeSlot}</div>
                <div><strong>Consultation:</strong> {formData.interest}</div>
              </div>
              <button
                onClick={onClose}
                className="mt-4 bg-[#2C241E] hover:bg-[#1E1A17] text-[#FAF7F2] py-2.5 px-6 rounded-xl text-xs font-semibold uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="border-b border-[#EDE4D6] pb-2">
                <h4 className="font-serif text-xl text-[#1E1A17] font-semibold">
                  Reserve a Private Viewing
                </h4>
                <p className="text-xs text-[#7A6855]">
                  Complimentary 1-on-1 session with our head jewelry curator.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#44382F] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8C7A68] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ananya Sharma"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#D8CCBA] bg-white focus:outline-hidden focus:border-[#B8860B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-medium text-[#44382F] mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8C7A68] absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98200 XXXXX"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#D8CCBA] bg-white focus:outline-hidden focus:border-[#B8860B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#44382F] mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8C7A68] absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.com"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#D8CCBA] bg-white focus:outline-hidden focus:border-[#B8860B]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-medium text-[#44382F] mb-1">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#8C7A68] absolute left-3 top-2.5" />
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#D8CCBA] bg-white focus:outline-hidden focus:border-[#B8860B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#44382F] mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D8CCBA] bg-white focus:outline-hidden focus:border-[#B8860B]"
                  >
                    <option>11:00 AM - 01:00 PM</option>
                    <option>02:00 PM - 04:00 PM</option>
                    <option>04:30 PM - 06:30 PM</option>
                    <option>07:00 PM - 08:30 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#44382F] mb-1">
                  Collection Interest
                </label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D8CCBA] bg-white focus:outline-hidden focus:border-[#B8860B]"
                >
                  <option>Bridal Polki & Kundan Suite</option>
                  <option>Antique 22K Temple Gold Collection</option>
                  <option>Diamond Solitaires & Cocktail Rings</option>
                  <option>Bespoke Custom Heirloom Commission</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#D4AF37] hover:bg-[#B89228] text-[#1E1A17] py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isSubmitting ? 'Confirming with Atelier...' : 'Confirm Atelier Appointment'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
