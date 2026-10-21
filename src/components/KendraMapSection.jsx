import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Navigation, 
  CheckCircle, 
  ExternalLink, 
  Building, 
  Store,
  Sparkles,
  Search,
  Filter
} from 'lucide-react';
import { LUCKNOW_KENDRAS } from '../data/kendrasData';

export default function KendraMapSection({ selectedLocation }) {
  const [activeKendra, setActiveKendra] = useState(LUCKNOW_KENDRAS[0]);
  const [filterType, setFilterType] = useState('all'); // 'all' | '24h' | 'hospital'

  const filteredKendras = LUCKNOW_KENDRAS.filter((k) => {
    if (filterType === '24h') return k.timings.includes('24 Hours');
    if (filterType === 'hospital') return k.isHospitalAdjacent;
    return true;
  });

  return (
    <section id="lucknow-kendras" className="py-12 lg:py-16 bg-[#E6F4F1]/60 border-t border-[#D5EFE3] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#059669] uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Verified Government Store Locator</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#113222] tracking-tight">
              Lucknow Jan Aushadhi Kendras
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Find verified Pradhan Mantri Bharatiya Jan Aushadhi Pariyojana (PMBJP) stores across Lucknow.
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 bg-white/80 p-1.5 rounded-2xl border border-slate-200 self-start sm:self-auto text-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                filterType === 'all' ? 'bg-[#113222] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All 6 Kendras
            </button>
            <button
              onClick={() => setFilterType('hospital')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                filterType === 'hospital' ? 'bg-[#113222] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hospital Adjacent
            </button>
            <button
              onClick={() => setFilterType('24h')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                filterType === '24h' ? 'bg-[#113222] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              24-Hour Counters
            </button>
          </div>
        </div>

        {/* Split Grid: Interactive Visual Map + Kendra Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive Vector Map View */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#D5EFE3] shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-[#059669]" />
                <span className="text-sm font-bold text-[#113222]">Lucknow Metro Area Map</span>
              </div>
              <span className="text-xs bg-emerald-50 text-[#047857] px-2.5 py-1 rounded-full font-bold border border-emerald-200">
                Live GPS Active
              </span>
            </div>

            {/* Stylized Lucknow Map Visual Canvas */}
            <div className="relative w-full h-[380px] sm:h-[420px] rounded-2xl bg-gradient-to-br from-[#EBF5F0] via-[#E6F4F1] to-[#D8F0E4] border border-[#A7F3D0]/60 p-4 overflow-hidden select-none">
              
              {/* Gomti River stylized curve */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M -20,180 C 120,120 200,240 380,180 C 500,140 650,220 800,160" 
                  fill="none" 
                  stroke="#38BDF8" 
                  strokeWidth="18" 
                  strokeLinecap="round"
                />
                <text x="260" y="195" fill="#0284C7" fontSize="11" fontWeight="bold" transform="rotate(-5 260 195)">
                  Gomti River
                </text>
              </svg>

              {/* Major Roads / Ring Road layout */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" xmlns="http://www.w3.org/2000/svg">
                <circle cx="280" cy="220" r="140" fill="none" stroke="#94A3B8" strokeWidth="3" strokeDasharray="6 4" />
                <line x1="80" y1="20" x2="480" y2="400" stroke="#94A3B8" strokeWidth="2" />
                <line x1="480" y1="20" x2="80" y2="400" stroke="#94A3B8" strokeWidth="2" />
              </svg>

              {/* Locality labels */}
              <div className="absolute top-8 left-12 text-[11px] font-black tracking-wider text-slate-400">CHOWK / OLD CITY</div>
              <div className="absolute top-16 left-1/3 text-[11px] font-black tracking-wider text-slate-400">ALIGANJ</div>
              <div className="absolute top-1/2 left-1/3 -translate-y-1/2 text-[11px] font-black tracking-wider text-[#059669]">HAZRATGANJ CENTER</div>
              <div className="absolute top-10 right-14 text-[11px] font-black tracking-wider text-slate-400">INDIRA NAGAR</div>
              <div className="absolute bottom-16 right-10 text-[11px] font-black tracking-wider text-slate-400">GOMTI NAGAR</div>
              <div className="absolute bottom-10 left-12 text-[11px] font-black tracking-wider text-slate-400">ALAMBAGH / CHARBAGH</div>

              {/* Interactive Kendra Map Pins */}
              {LUCKNOW_KENDRAS.map((kendra) => {
                const isSelected = activeKendra.id === kendra.id;
                const pinCoordinates = {
                  'kendra-civil-hospital': { top: '48%', left: '46%' }, // Hazratganj
                  'kendra-aliganj': { top: '26%', left: '42%' },        // Aliganj
                  'kendra-gomti-nagar': { top: '68%', left: '74%' },    // Gomti Nagar
                  'kendra-kgmu-chowk': { top: '20%', left: '22%' },     // KGMU Chowk
                  'kendra-alambagh': { top: '78%', left: '28%' },       // Alambagh
                  'kendra-indira-nagar': { top: '24%', left: '72%' },   // Indira Nagar
                  'kendra-aminabad': { top: '56%', left: '38%' },       // Aminabad
                };
                const pos = pinCoordinates[kendra.id] || { top: '50%', left: '50%' };

                return (
                  <button
                    key={kendra.id}
                    onClick={() => setActiveKendra(kendra)}
                    style={{ top: pos.top, left: pos.left }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-transform duration-300 ${
                      isSelected ? 'scale-125 z-30' : 'hover:scale-115 z-20'
                    }`}
                  >
                    {/* Pulsing beacon if selected */}
                    {isSelected && (
                      <span className="absolute -inset-2 rounded-full bg-[#10B981]/40 animate-ping pointer-events-none" />
                    )}

                    <div className={`p-2 rounded-2xl shadow-lg border-2 flex items-center gap-1.5 transition-all ${
                      isSelected
                        ? 'bg-[#113222] text-white border-[#34D399]'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-[#10B981]'
                    }`}>
                      <MapPin className={`w-4 h-4 ${isSelected ? 'text-[#34D399]' : 'text-[#059669]'}`} />
                      <span className="text-[10px] font-bold max-w-[80px] sm:max-w-[100px] truncate">
                        {kendra.name.replace('Jan Aushadhi Kendra - ', '')}
                      </span>
                    </div>
                  </button>
                );
              })}

              {/* Map Footer Helper */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md rounded-xl p-2.5 border border-white flex items-center justify-between text-xs text-slate-700">
                <span className="font-semibold text-[11px] truncate">
                  Pin Selected: <strong className="text-[#113222]">{activeKendra.name}</strong>
                </span>
                <span className="text-[10px] font-bold text-[#059669] shrink-0">
                  {activeKendra.inStockCount}
                </span>
              </div>
            </div>

            {/* Quick Map Legend */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  <span>Verified PMBJP Kendra</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]" />
                  <span>River Gomti</span>
                </span>
              </div>
              <span className="text-[11px] text-slate-400">All coordinates verified with UP Health Mission</span>
            </div>
          </div>

          {/* Right: Kendra List & Detailed Selected Card */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Detailed Selected Kendra Card */}
            <div className="rounded-3xl bg-white border-2 border-[#10B981] p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-[#047857]">
                    {activeKendra.storeCode}
                  </span>
                  <h3 className="text-xl font-black text-[#113222] mt-1.5 leading-tight">
                    {activeKendra.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black px-2 py-1 rounded-md bg-amber-100 text-amber-800">
                    ★ {activeKendra.rating} ({activeKendra.reviewsCount})
                  </span>
                </div>
              </div>

              {/* Address */}
              <div className="text-xs text-slate-600 mb-4 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                <span>{activeKendra.address}</span>
              </div>

              {/* Meta information tags */}
              <div className="space-y-2 text-xs text-slate-700 bg-slate-50 rounded-2xl p-3.5 mb-5 border border-slate-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span><strong>Timings:</strong> {activeKendra.timings}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#059669]" />
                  <span><strong>Pharmacist:</strong> {activeKendra.pharmacist}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#10B981]" />
                  <span><strong>Stock Inventory:</strong> {activeKendra.inStockCount}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={`tel:${activeKendra.phone}`}
                  className="py-2.5 px-3 rounded-xl bg-[#113222] hover:bg-[#184630] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>Call Store</span>
                </a>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeKendra.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#065F46] border border-emerald-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#059669]" />
                  <span>Directions</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>

            {/* Scrollable list of other kendras */}
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
                Other Verified Lucknow Stores:
              </div>
              {filteredKendras.map((k) => (
                <button
                  key={k.id}
                  onClick={() => setActiveKendra(k)}
                  className={`w-full text-left p-3 rounded-2xl border text-xs transition-all flex items-center justify-between cursor-pointer ${
                    activeKendra.id === k.id
                      ? 'bg-white border-[#10B981] shadow-sm ring-2 ring-[#10B981]/20'
                      : 'bg-white/60 hover:bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-bold text-slate-900">{k.name}</div>
                    <div className="text-[11px] text-slate-500 truncate max-w-[240px]">{k.address}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-bold text-[#059669] block">
                      {k.distanceFromCenterKm} km
                    </span>
                    <span className="text-[9px] text-slate-400">from center</span>
                  </div>
                </button>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
