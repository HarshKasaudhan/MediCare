import React from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  FileCheck, 
  Stethoscope, 
  HelpCircle, 
  CheckCircle2, 
  Scale, 
  Lock
} from 'lucide-react';

export default function MedicalSafetyDisclaimer() {
  return (
    <section className="py-12 bg-white/70 border-t border-[#D5EFE3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Prominent Statutory Medical Disclaimer Box */}
        <div className="rounded-3xl bg-amber-50/80 border-2 border-amber-300/80 p-6 sm:p-8 shadow-sm mb-10">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <AlertTriangle className="w-6 h-6 stroke-[2.5]" />
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-amber-200 text-amber-900">
                  Official Medical Safety Notice
                </span>
                <span className="text-xs text-amber-800 font-semibold">
                  Rule 65, Drugs and Cosmetics Act, 1940
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-amber-950">
                Important Disclaimer: Price Transparency Tool, Not Medical Advice
              </h3>

              <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed font-medium">
                This platform is an independent drug pricing transparency, education, and generic substitution comparison engine powered by public catalogs from the 
                <strong> National Pharmaceutical Pricing Authority (NPPA)</strong> and the 
                <strong> Pradhan Mantri Bharatiya Jan Aushadhi Pariyojana (PMBJP)</strong>. 
                Information displayed does NOT constitute clinical prescription advice, medical diagnosis, or treatment recommendations.
              </p>

              <div className="p-3.5 rounded-2xl bg-white/80 border border-amber-200 text-xs text-amber-950 font-semibold flex items-center gap-2.5">
                <Stethoscope className="w-5 h-5 text-amber-700 shrink-0" />
                <span>
                  Always consult your treating physician or a registered pharmacist before altering, substituting, or discontinuing any prescribed drug formulation or dosage schedule.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars of PMBJP Quality Assurance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-3xl bg-white border border-[#D5EFE3] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#047857] flex items-center justify-center mb-4">
                <FileCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-extrabold text-[#113222] mb-1">
                NABL Accredited Lab Testing
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every single pharmaceutical batch procured under PMBJP is tested at laboratories accredited by the National Accreditation Board for Testing and Calibration Laboratories (NABL) before distribution.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-[#059669] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Double-Blind Quality Verification</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#D5EFE3] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#047857] flex items-center justify-center mb-4">
                <Scale className="w-5 h-5" />
              </div>
              <h4 className="text-base font-extrabold text-[#113222] mb-1">
                NPPA DPCO Price Ceiling
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ceiling prices are enforced under the Drugs (Prices Control) Order, 2013 (DPCO). Pharmaceutical manufacturers cannot charge above the statutory ceiling price fixed by the Government of India.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-[#059669] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Zero Artificial Inflation</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#D5EFE3] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#047857] flex items-center justify-center mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-extrabold text-[#113222] mb-1">
                WHO-GMP Certified Facilities
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Only manufacturers holding valid World Health Organization Good Manufacturing Practices (WHO-GMP) licenses are eligible to supply medicines to the Central Jan Aushadhi Warehouses.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-[#059669] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Global Purity & Potency Standards</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
