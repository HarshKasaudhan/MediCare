import React from 'react';
import { 
  Check, 
  Phone, 
  MapPin, 
  Mail, 
  ShieldCheck, 
  ExternalLink, 
  Heart,
  Sparkles,
  ArrowUp
} from 'lucide-react';

export default function Footer({ onNavigateSection }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#113222] text-[#D5EFE3] pt-16 pb-12 border-t border-[#164e32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1 & 2: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#34D399] flex items-center justify-center shadow-md">
                <Check className="w-5 h-5 text-[#113222] stroke-[3]" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Medi<span className="text-[#34D399]">care</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/70 max-w-sm leading-relaxed">
              India's transparent generic medicine matching platform. Built with NPPA ceiling data and official Pradhan Mantri Bharatiya Jan Aushadhi Pariyojana catalogs.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs text-[#34D399]">
              <span className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>WHO-GMP Verified</span>
              </span>
              <span className="flex items-center gap-1.5 font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Zero Pricing Markup</span>
              </span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Explore Portal
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-100/70 font-medium">
              <li>
                <button 
                  onClick={() => onNavigateSection('pricing')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  3-Tier Pricing Engine
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('categories')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pastel Category Aisles
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('kendras')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Lucknow Kendra Directory
                </button>
              </li>
              <li>
                <a 
                  href="https://janaushadhi.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Official PMBJP Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://nppa.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>NPPA DPCO Drug Orders</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Top Chronic Categories */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Generic Equivalents
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-100/70 font-medium">
              <li>Pan 40 (Pantoprazole) — ₹14.50</li>
              <li>Augmentin 625 (Amoxyclav) — ₹45.00</li>
              <li>Telma 40 (Telmisartan) — ₹12.00</li>
              <li>Glycomet 500 (Metformin) — ₹5.50</li>
              <li>Rosuvas 10 (Rosuvastatin) — ₹22.00</li>
              <li>Dolo 650 (Paracetamol) — ₹7.00</li>
            </ul>
          </div>

          {/* Col 5: Government Contact & Helplines */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Support & Helplines
            </h4>
            <div className="space-y-3 text-xs text-emerald-100/70">
              <div>
                <div className="text-[10px] text-emerald-300/60 uppercase font-bold">PMBJP National Toll Free</div>
                <div className="text-white font-bold text-sm">1800-180-8080</div>
              </div>
              <div>
                <div className="text-[10px] text-emerald-300/60 uppercase font-bold">Lucknow Civil Hospital Counter</div>
                <div className="text-white font-bold">+91 94521 88201</div>
              </div>
              <div>
                <div className="text-[10px] text-emerald-300/60 uppercase font-bold">Email Inquiries</div>
                <div className="text-emerald-200">contact@medicare.gov.in</div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-100/60">
          <div>
            © {new Date().getFullYear()} Medicare. Developed with Public Health Data under NPPA & PMBJP guidelines.
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              <span>for affordable healthcare</span>
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
