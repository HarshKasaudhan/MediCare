import React from 'react';
import { 
  Sparkles, 
  TrendingDown, 
  Check, 
  Layers, 
  ShoppingCart, 
  ArrowRight,
  ShieldCheck,
  Tag
} from 'lucide-react';

export default function ProductCards({ 
  medicines, 
  selectedCategory, 
  onSelectMedicine, 
  onAddToCart 
}) {
  const filteredMedicines = selectedCategory
    ? medicines.filter(m => m.category.toLowerCase().includes(selectedCategory.toLowerCase()) || m.tags.includes(selectedCategory.toLowerCase()))
    : medicines;

  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#059669] uppercase tracking-wider mb-2">
              <Tag className="w-3.5 h-3.5" />
              <span>Verified Generic Recommendations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#113222] tracking-tight">
              {selectedCategory ? `${selectedCategory} Medicines` : 'Most Prescribed Drugs & Generic Equivalents'}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Compare innovator brand MRP with official Jan Aushadhi generic pricing.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-semibold bg-white/80 px-3 py-1.5 rounded-full border border-slate-200 self-start sm:self-auto">
            Showing {filteredMedicines.length} verified medicines
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedicines.map((med) => {
            const prescribedPrice = med.prescribedBrand.mrpForTen || med.prescribedBrand.mrp;
            const genericPrice = med.janAushadhi.mrp;
            const savingAmount = prescribedPrice - genericPrice;

            return (
              <div
                key={med.id}
                className="group rounded-3xl bg-white border border-[#D5EFE3] hover:border-[#10B981] p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Category & Discount Tag */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      {med.category}
                    </span>
                    <span className="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-100 text-[#047857] flex items-center gap-1">
                      <TrendingDown className="w-3.5 h-3.5" />
                      <span>{med.savingPercentage}% OFF</span>
                    </span>
                  </div>

                  {/* Brand Prescribed Name */}
                  <div className="text-xs text-slate-400 font-medium">Prescribed Brand:</div>
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-[#059669] transition-colors">
                    {med.brandName}
                  </h3>
                  <div className="text-xs text-slate-500 mb-3">
                    by {med.prescribedBrand.manufacturer}
                  </div>

                  {/* Salt Info */}
                  <div className="p-3 rounded-2xl bg-[#E6F4F1]/60 border border-[#D5EFE3] mb-4">
                    <div className="text-[11px] font-bold text-[#113222] uppercase tracking-wider mb-0.5">
                      Jan Aushadhi Generic Substitute
                    </div>
                    <div className="text-xs font-semibold text-slate-800 line-clamp-1">
                      {med.janAushadhi.name}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono mt-1">
                      Active: {med.salt}
                    </div>
                  </div>

                  {/* Pricing Display */}
                  <div className="flex items-baseline justify-between mb-4 pb-4 border-b border-slate-100">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Jan Aushadhi Rate</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-[#059669]">
                          ₹{genericPrice}
                        </span>
                        <span className="text-sm line-through text-slate-400">
                          ₹{prescribedPrice}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-slate-400">Net Strip Saving</div>
                      <div className="text-sm font-extrabold text-[#047857]">
                        Save ₹{savingAmount.toFixed(1)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button
                    onClick={() => {
                      onSelectMedicine(med);
                      const pricingEl = document.getElementById('pricing-engine');
                      if (pricingEl) {
                        pricingEl.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-[#113222] text-slate-700 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Compare 3 Tiers</span>
                  </button>

                  <button
                    onClick={() => {
                      onAddToCart({
                        id: med.id + '-jan-aushadhi',
                        name: med.janAushadhi.name,
                        variant: 'PMBJP Generic',
                        brandEquivalent: med.brandName,
                        mrp: genericPrice,
                        quantity: 1,
                        savings: savingAmount
                      });
                    }}
                    className="py-2.5 px-3 rounded-xl bg-[#113222] hover:bg-[#184630] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 text-[#34D399]" />
                    <span>Add Generic</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
