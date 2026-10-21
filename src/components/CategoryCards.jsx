import React from 'react';
import { 
  Baby, 
  Zap, 
  ThermometerSnowflake, 
  Flame, 
  HeartPulse, 
  Activity, 
  ShieldAlert, 
  ShieldCheck,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { PHARMACY_CATEGORIES } from '../data/categoriesData';

// Icon map helper
const ICON_MAP = {
  Baby: Baby,
  Zap: Zap,
  ThermometerSnowflake: ThermometerSnowflake,
  Flame: Flame,
  HeartPulse: HeartPulse,
  Activity: Activity,
  ShieldAlert: ShieldAlert,
  ShieldCheck: ShieldCheck
};

export default function CategoryCards({ selectedCategory, onSelectCategory }) {
  return (
    <section id="healthcare-categories" className="py-12 bg-white/40 border-y border-[#D5EFE3]/60 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#059669] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Healthcare Essentials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#113222] tracking-tight">
              Curated Generic Categories
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Browse soft pastel category aisles with verified PMBJP generic substitutes.
            </p>
          </div>

          {selectedCategory && (
            <button
              onClick={() => onSelectCategory(null)}
              className="text-xs font-bold text-[#059669] hover:underline self-start sm:self-auto cursor-pointer"
            >
              Clear Category Filter (Show All)
            </button>
          )}
        </div>

        {/* Pastel Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {PHARMACY_CATEGORIES.map((cat) => {
            const IconComponent = ICON_MAP[cat.iconName] || Activity;
            const isSelected = selectedCategory === cat.filterCategory;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(isSelected ? null : cat.filterCategory)}
                style={{
                  backgroundColor: cat.bgColor,
                  borderColor: isSelected ? '#113222' : cat.borderColor,
                }}
                className={`group relative rounded-3xl p-5 sm:p-6 border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:shadow-xl hover:-translate-y-1.5 ${
                  isSelected ? 'ring-4 ring-[#113222]/20 shadow-lg scale-[1.02]' : 'shadow-xs'
                }`}
              >
                {/* Top: Icon & Counter */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="w-12 h-12 rounded-2xl bg-white/90 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform"
                      style={{ color: cat.textColor }}
                    >
                      <IconComponent className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span 
                      className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/70"
                      style={{ color: cat.textColor }}
                    >
                      {cat.itemCount}
                    </span>
                  </div>

                  <h3 
                    className="text-lg font-extrabold leading-tight tracking-tight mb-1"
                    style={{ color: cat.textColor }}
                  >
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-600/90 leading-snug line-clamp-2 mb-3">
                    {cat.subtitle}
                  </p>
                </div>

                {/* Bottom: Popular pills */}
                <div className="pt-3 border-t border-black/5">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {cat.popularMedicines.slice(0, 2).map((med, idx) => (
                      <span 
                        key={idx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/60 text-slate-700"
                      >
                        {med}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold" style={{ color: cat.textColor }}>
                    <span>{isSelected ? 'Active Filter' : 'Explore Aisle'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
