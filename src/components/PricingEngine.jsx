import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ShieldCheck, 
  TrendingDown, 
  ArrowRight, 
  MapPin, 
  ShoppingCart, 
  HelpCircle,
  FileCheck,
  Building2,
  Calendar,
  Layers,
  Percent,
  Search
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PricingEngine({ 
  selectedMedicine, 
  onSelectMedicine, 
  onAddToCart, 
  onLocateKendra,
  allMedicines,
  onSearchInput
}) {
  const [supplyMonths, setSupplyMonths] = useState(1);
  const [activeTab, setActiveTab] = useState('comparison'); // 'comparison' | 'calculator' | 'bioequivalence'
  const [internalQuery, setInternalQuery] = useState('');

  if (!selectedMedicine) {
    return null;
  }

  // Calculate prices based on monthly supply (assuming 1 strip of 10 tabs per month or customized)
  const stripsCount = supplyMonths;
  const prescribedTotal = (selectedMedicine.prescribedBrand.mrpForTen || selectedMedicine.prescribedBrand.mrp) * stripsCount;
  const brandedGenericTotal = (selectedMedicine.brandedGeneric.mrp) * stripsCount;
  const janAushadhiTotal = (selectedMedicine.janAushadhi.mrp) * stripsCount;
  const totalSavings = prescribedTotal - janAushadhiTotal;
  const savingPercent = Math.round((totalSavings / prescribedTotal) * 100);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10B981', '#34D399', '#113222', '#6EE7B7']
    });
  };

  const handleSwitchToGeneric = () => {
    triggerConfetti();
    onAddToCart({
      id: selectedMedicine.id + '-jan-aushadhi',
      name: selectedMedicine.janAushadhi.name,
      variant: 'PMBJP Jan Aushadhi Generic',
      brandEquivalent: selectedMedicine.brandName,
      code: selectedMedicine.janAushadhi.code,
      mrp: selectedMedicine.janAushadhi.mrp,
      quantity: stripsCount,
      savings: totalSavings
    });
  };

  return (
    <section id="pricing-engine" className="py-12 lg:py-16 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#047857] text-xs font-bold mb-3 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-[#059669]" />
            <span>Zero-Hallucination Tiered Pricing Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#113222] tracking-tight">
            Prescription Price Transparency Breakdown
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Direct comparison between Prescribed Brand MRP, NPPA Ceiling Regulated Generics, and Pradhan Mantri Jan Aushadhi Kendras.
          </p>
        </div>

        {/* Quick Switcher Bar for Available Medicines */}
        <div className="mb-8 bg-white/70 backdrop-blur-md rounded-2xl p-3 border border-[#D5EFE3] shadow-sm">
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 text-xs">
            <span className="font-bold text-slate-400 uppercase tracking-wider shrink-0 px-2 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-[#059669]" />
              <span>Select Drug:</span>
            </span>
            <div className="flex items-center gap-2 shrink-0">
              {allMedicines.map((med) => {
                const isActive = med.id === selectedMedicine.id;
                return (
                  <button
                    key={med.id}
                    onClick={() => onSelectMedicine(med)}
                    className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#113222] text-white shadow-sm'
                        : 'bg-white hover:bg-[#E6F4F1] text-slate-700 border border-slate-200'
                    }`}
                  >
                    {med.brandName}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Highlight Banner: Saving Headline */}
        <div className="bg-gradient-to-r from-[#113222] via-[#164e32] to-[#113222] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden mb-8">
          <div className="absolute right-0 top-0 bottom-0 w-96 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-400/20 via-transparent to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left: Saving Headline & Active Molecule */}
            <div className="lg:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-[#34D399] text-[#113222] text-xs font-black uppercase tracking-wider">
                  Saving Headline
                </span>
                <span className="text-xs text-emerald-200 bg-white/10 px-2.5 py-1 rounded-md font-mono">
                  Code: {selectedMedicine.janAushadhi.code}
                </span>
                <span className="text-xs text-emerald-200 bg-white/10 px-2.5 py-1 rounded-md">
                  {selectedMedicine.category}
                </span>
              </div>

              {/* The big price drop headline */}
              <div className="flex flex-wrap items-baseline gap-3">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
                  ₹{selectedMedicine.prescribedBrand.mrpForTen || selectedMedicine.prescribedBrand.mrp} 
                  <span className="text-emerald-400 mx-2">→</span> 
                  ₹{selectedMedicine.janAushadhi.mrp}
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/30 border border-emerald-400/50 text-[#34D399] text-sm sm:text-base font-extrabold flex items-center gap-1">
                  <TrendingDown className="w-4 h-4" />
                  <span>{selectedMedicine.savingPercentage}% Saved</span>
                </div>
              </div>

              {/* Molecule description */}
              <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
                <strong>Active Molecule:</strong> {selectedMedicine.salt}
              </p>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-emerald-200/80">
                <span><strong>Dosage Form:</strong> {selectedMedicine.dosageForm}</span>
                <span>•</span>
                <span><strong>Schedule:</strong> {selectedMedicine.schedule}</span>
                <span>•</span>
                <span><strong>Standard:</strong> WHO-GMP Certified</span>
              </div>
            </div>

            {/* Right: Switch CTA & Quick Add */}
            <div className="lg:col-span-4 flex flex-col gap-3 justify-center bg-white/10 p-5 rounded-2xl border border-white/15 backdrop-blur-sm">
              <div className="text-xs text-emerald-200 uppercase tracking-wider font-semibold">
                Instant Monthly Switch
              </div>
              <div className="text-2xl font-black text-white">
                Save ₹{(selectedMedicine.savingAmount * supplyMonths).toFixed(1)} 
                <span className="text-xs font-normal text-emerald-200 ml-1">/ {supplyMonths} mo supply</span>
              </div>
              <button
                onClick={handleSwitchToGeneric}
                className="w-full py-3 px-4 rounded-xl bg-[#34D399] hover:bg-[#10B981] text-[#113222] font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-[#113222]" />
                <span>Switch to Jan Aushadhi</span>
              </button>
              <button
                onClick={() => onLocateKendra(selectedMedicine)}
                className="w-full py-2 px-3 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#34D399]" />
                <span>Find in Nearest Lucknow Kendra</span>
              </button>
            </div>

          </div>
        </div>

        {/* 3-TIER COMPARISON CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* TIER 1: Jan Aushadhi Generic (Cheapest) */}
          <div className="relative rounded-3xl bg-white border-2 border-[#10B981] shadow-xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#10B981] text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-bl-2xl shadow-sm">
              Tier 1 • Cheapest (PMBJP)
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-[#047857] font-bold">
                  1
                </span>
                <div>
                  <div className="text-xs font-bold text-[#059669]">Govt. Subsidized Generic</div>
                  <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
                    Jan Aushadhi PMBJP
                  </h3>
                </div>
              </div>

              {/* Exact Generic Name */}
              <div className="p-3 rounded-xl bg-[#E6F4F1] border border-[#D5EFE3] mb-4">
                <div className="text-xs font-bold text-[#113222]">
                  {selectedMedicine.janAushadhi.name}
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                  PMBJP Item Code: {selectedMedicine.janAushadhi.code}
                </div>
              </div>

              {/* Price & Unit */}
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-[#059669]">
                    ₹{selectedMedicine.janAushadhi.mrp}
                  </span>
                  <span className="text-xs text-slate-500">
                    / {selectedMedicine.janAushadhi.packaging}
                  </span>
                </div>
                <div className="text-xs font-semibold text-emerald-700 mt-1">
                  ₹{selectedMedicine.janAushadhi.pricePerUnit.toFixed(2)} per tablet
                </div>
              </div>

              {/* Specs & Quality verification */}
              <div className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span><strong>Manufacturer:</strong> {selectedMedicine.janAushadhi.manufacturer}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span><strong>Quality Standard:</strong> Tested at NABL Labs & WHO-GMP Certified</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span><strong>Bioequivalence:</strong> 100% active chemical identity</span>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={handleSwitchToGeneric}
                className="w-full py-3 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add Generic (₹{selectedMedicine.janAushadhi.mrp})</span>
              </button>
            </div>
          </div>

          {/* TIER 2: Trusted Branded Generic (Mid-Range) */}
          <div className="relative rounded-3xl bg-white border border-slate-200 shadow-md p-6 sm:p-7 flex flex-col justify-between">
            <div className="absolute top-0 right-0 bg-slate-100 text-slate-600 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-2xl">
              Tier 2 • Mid-Range
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                  2
                </span>
                <div>
                  <div className="text-xs font-bold text-blue-700">NPPA Ceiling Regulated</div>
                  <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
                    Branded Generic
                  </h3>
                </div>
              </div>

              {/* Exact Brand Generic Name */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 mb-4">
                <div className="text-xs font-bold text-slate-800">
                  {selectedMedicine.brandedGeneric.name}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Mfr: {selectedMedicine.brandedGeneric.manufacturer}
                </div>
              </div>

              {/* Price & Unit */}
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-slate-800">
                    ₹{selectedMedicine.brandedGeneric.mrp}
                  </span>
                  <span className="text-xs text-slate-500">
                    / {selectedMedicine.brandedGeneric.packaging}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  ₹{selectedMedicine.brandedGeneric.pricePerUnit.toFixed(2)} per tablet
                </div>
              </div>

              {/* Specs */}
              <div className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>NPPA Ceiling Cap:</strong> ₹{selectedMedicine.brandedGeneric.nppaCeilingPrice} max permitted</span>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Availability:</strong> All local private chemist shops</span>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Markup:</strong> Modest marketing & retail margin</span>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  onAddToCart({
                    id: selectedMedicine.id + '-branded-generic',
                    name: selectedMedicine.brandedGeneric.name,
                    variant: 'NPPA Branded Generic',
                    brandEquivalent: selectedMedicine.brandName,
                    mrp: selectedMedicine.brandedGeneric.mrp,
                    quantity: 1,
                    savings: 0
                  });
                }}
                className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4 text-slate-600" />
                <span>Add Branded Generic (₹{selectedMedicine.brandedGeneric.mrp})</span>
              </button>
            </div>
          </div>

          {/* TIER 3: Original Prescribed Brand (Baseline) */}
          <div className="relative rounded-3xl bg-white border border-rose-200/80 shadow-md p-6 sm:p-7 flex flex-col justify-between">
            <div className="absolute top-0 right-0 bg-rose-100 text-rose-700 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-2xl">
              Tier 3 • Prescribed Brand (Costly)
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 font-bold">
                  3
                </span>
                <div>
                  <div className="text-xs font-bold text-rose-700">Innovator / Prescribed MRP</div>
                  <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
                    {selectedMedicine.prescribedBrand.name}
                  </h3>
                </div>
              </div>

              {/* Exact Brand Name */}
              <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-100 mb-4">
                <div className="text-xs font-bold text-slate-900">
                  {selectedMedicine.prescribedBrand.name}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Mfr: {selectedMedicine.prescribedBrand.manufacturer}
                </div>
              </div>

              {/* Price & Unit */}
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-slate-900 line-through text-slate-400">
                    ₹{selectedMedicine.prescribedBrand.mrpForTen || selectedMedicine.prescribedBrand.mrp}
                  </span>
                  <span className="text-xs text-rose-600 font-bold">
                    High Brand Premium
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  ₹{selectedMedicine.prescribedBrand.pricePerUnit.toFixed(2)} per tablet
                </div>
              </div>

              {/* Specs */}
              <div className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>Heavy Branding:</strong> 60-80% of price is sales promotion</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>Identical Active Ingredient:</strong> No chemical superiority</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span><strong>Prescription Baseline:</strong> What doctor wrote on prescription</span>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  onAddToCart({
                    id: selectedMedicine.id + '-prescribed-brand',
                    name: selectedMedicine.prescribedBrand.name,
                    variant: 'Original Prescribed Brand',
                    brandEquivalent: selectedMedicine.brandName,
                    mrp: selectedMedicine.prescribedBrand.mrpForTen || selectedMedicine.prescribedBrand.mrp,
                    quantity: 1,
                    savings: 0
                  });
                }}
                className="w-full py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs sm:text-sm border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Add Prescribed Brand (Baseline)</span>
              </button>
            </div>
          </div>

        </div>

        {/* INTERACTIVE CHRONIC ILLNESS SAVINGS CALCULATOR */}
        <div className="rounded-3xl bg-white border border-[#D5EFE3] p-6 sm:p-8 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#059669] mb-1">
                <Calendar className="w-4 h-4" />
                <span>Chronic Maintenance Therapy Calculator</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#113222]">
                How Much Will You Save Over Time?
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Calculate total household expense reduction for lifelong conditions like BP, diabetes, or acid reflux.
              </p>
            </div>

            {/* Duration Selector Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-2xl self-start md:self-center">
              {[
                { months: 1, label: '1 Month' },
                { months: 3, label: '3 Months' },
                { months: 6, label: '6 Months' },
                { months: 12, label: '1 Year (Best)' },
              ].map((item) => (
                <button
                  key={item.months}
                  onClick={() => setSupplyMonths(item.months)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    supplyMonths === item.months
                      ? 'bg-[#113222] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Calculator Visual Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100">
              <div className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-1">
                Prescribed Brand Expense
              </div>
              <div className="text-2xl sm:text-3xl font-black text-rose-950">
                ₹{prescribedTotal.toFixed(0)}
              </div>
              <div className="text-xs text-rose-600 mt-1">
                For {supplyMonths * 10} tablets ({selectedMedicine.brandName})
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
              <div className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
                NPPA Branded Generic
              </div>
              <div className="text-2xl sm:text-3xl font-black text-blue-950">
                ₹{brandedGenericTotal.toFixed(0)}
              </div>
              <div className="text-xs text-blue-600 mt-1">
                Saves ₹{(prescribedTotal - brandedGenericTotal).toFixed(0)}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-[#10B981] relative overflow-hidden">
              <div className="text-xs font-black text-[#047857] uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Jan Aushadhi Expense</span>
                <span className="text-[10px] bg-[#10B981] text-white px-2 py-0.5 rounded-full font-bold">
                  {savingPercent}% Saved
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-[#047857]">
                ₹{janAushadhiTotal.toFixed(0)}
              </div>
              <div className="text-xs font-bold text-emerald-800 mt-1 flex items-center gap-1">
                <span>You pocket ₹{totalSavings.toFixed(0)} cash savings!</span>
              </div>
            </div>

          </div>

          {/* Bioequivalence & Quality Assurance Note */}
          <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex items-start gap-3">
            <FileCheck className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">Quality & Bioequivalence Mandate: </span>
              {selectedMedicine.bioequivalenceQuality} Under the Ministry of Chemicals and Fertilizers, every Jan Aushadhi batch is pre-tested at NABL accredited labs before dispatch to Kendras.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
