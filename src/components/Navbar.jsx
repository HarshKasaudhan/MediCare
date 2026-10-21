import React, { useState } from 'react';
import { 
  Check, 
  MapPin, 
  ShoppingBag, 
  User, 
  Sparkles, 
  ChevronDown, 
  Menu, 
  X
} from 'lucide-react';

export default function Navbar({ 
  selectedLocation, 
  onLocationChange, 
  cartItems, 
  setIsCartOpen, 
  setIsAuthOpen, 
  setIsPrescriptionModalOpen,
  onNavigateSection
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);

  const LUCKNOW_LOCATIONS = [
    { id: 'hazratganj', name: 'Hazratganj, Lucknow', pincode: '226001', landmark: 'Near SPM Civil Hospital' },
    { id: 'gomti-nagar', name: 'Gomti Nagar, Lucknow', pincode: '226010', landmark: 'Patrakarpuram' },
    { id: 'chowk', name: 'Chowk / KGMU, Lucknow', pincode: '226003', landmark: 'Opp. Gate 2 KGMU' },
    { id: 'alambagh', name: 'Alambagh, Lucknow', pincode: '226005', landmark: 'Near Metro Station' },
    { id: 'indira-nagar', name: 'Indira Nagar, Lucknow', pincode: '226016', landmark: 'Sector 14 Ring Road' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#E6F4F1]/90 backdrop-blur-md border-b border-[#D5EFE3]/80 transition-all duration-200">
      {/* Top announcement bar */}
      <div className="bg-[#113222] text-[#D5EFE3] text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#34D399]" />
        <span>Pradhan Mantri Bharatiya Jan Aushadhi (PMBJP) Price Transparency Engine • Save up to 90%</span>
        <button 
          onClick={() => onNavigateSection('kendras')}
          className="underline hover:text-white ml-2 text-xs font-semibold cursor-pointer hidden sm:inline"
        >
          Find 6+ Lucknow Kendras →
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo with Checkmark & Location Selector */}
          <div className="flex items-center gap-4 shrink-0">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-11 h-11 rounded-2xl bg-[#113222] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
                <div className="w-7 h-7 rounded-xl bg-[#34D399] flex items-center justify-center">
                  <Check className="w-4 h-4 text-[#113222] stroke-[3]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-[#113222] leading-none">
                  Medi<span className="text-[#059669]">care</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#059669]/90 mt-0.5">
                  PMBJP & NPPA Verified
                </span>
              </div>
            </a>

            {/* Location selector dropdown */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-[#CBD5E1]/70 text-xs font-semibold text-slate-700 hover:bg-white hover:border-[#10B981] transition-all cursor-pointer shadow-2xs"
              >
                <MapPin className="w-3.5 h-3.5 text-[#059669]" />
                <span className="font-bold text-slate-900 truncate max-w-[130px]">
                  {selectedLocation?.name || 'Lucknow, UP'}
                </span>
                <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${locationDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {locationDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-white shadow-xl border border-slate-200/80 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    Select Your Lucknow Locality
                  </div>
                  <div className="mt-1 space-y-1">
                    {LUCKNOW_LOCATIONS.map((loc) => (
                      <button
                        key={loc.id}
                        onClick={() => {
                          onLocationChange(loc);
                          setLocationDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                          selectedLocation?.id === loc.id
                            ? 'bg-[#E6F4F1] text-[#113222] font-bold'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <div>
                          <div className="font-semibold">{loc.name}</div>
                          <div className="text-[10px] text-slate-400">{loc.landmark} • {loc.pincode}</div>
                        </div>
                        {selectedLocation?.id === loc.id && (
                          <Check className="w-3.5 h-3.5 text-[#059669]" />
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="p-2 border-t border-slate-100 mt-1">
                    <span className="text-[10px] text-slate-500 block text-center">
                      Auto-connects to closest Jan Aushadhi Kendra
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links and User Actions */}
          <nav className="flex items-center gap-3 sm:gap-6">
            <button
              onClick={() => onNavigateSection('pricing')}
              className="text-xs sm:text-sm font-bold text-[#113222] hover:text-[#059669] transition-colors hidden md:inline cursor-pointer"
            >
              Price Transparency
            </button>
            <button
              onClick={() => onNavigateSection('categories')}
              className="text-xs sm:text-sm font-bold text-[#113222] hover:text-[#059669] transition-colors hidden lg:inline cursor-pointer"
            >
              Healthcare Categories
            </button>
            <button
              onClick={() => onNavigateSection('kendras')}
              className="text-xs sm:text-sm font-bold text-[#113222] hover:text-[#059669] transition-colors hidden sm:inline cursor-pointer"
            >
              Lucknow Kendras
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-2xl bg-white/80 border border-[#D5EFE3] hover:border-[#10B981] hover:bg-white text-[#113222] transition-all cursor-pointer shadow-sm group"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform text-[#113222]" />
              {cartItems?.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#10B981] text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>

            {/* Login / Profile Button */}
            <button
              onClick={() => setIsAuthOpen(true)}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-2xl bg-[#113222] hover:bg-[#184630] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <User className="w-4 h-4 text-[#34D399]" />
              <span>Login</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-2xl bg-white/80 border border-[#D5EFE3] text-[#113222] md:hidden cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#D5EFE3] space-y-2 bg-[#E6F4F1]/95 animate-in fade-in">
            <button
              onClick={() => { onNavigateSection('pricing'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-[#113222] hover:bg-white/60"
            >
              Price Transparency
            </button>
            <button
              onClick={() => { onNavigateSection('categories'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-[#113222] hover:bg-white/60"
            >
              Healthcare Categories
            </button>
            <button
              onClick={() => { onNavigateSection('kendras'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-[#113222] hover:bg-white/60"
            >
              Lucknow Kendras
            </button>
            <button
              onClick={() => { setIsPrescriptionModalOpen(true); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-[#059669] hover:bg-white/60"
            >
              Upload Prescription (OCR)
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
