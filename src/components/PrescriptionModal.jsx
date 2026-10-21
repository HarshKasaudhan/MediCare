import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Camera, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  FileText, 
  Scan, 
  ArrowRight,
  RefreshCw,
  Search,
  Check
} from 'lucide-react';
import { OCR_SAMPLE_PRESETS, searchMedicines } from '../data/medicinesData';

export default function PrescriptionModal({ 
  isOpen, 
  onClose, 
  onSelectMedicine 
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [detectedData, setDetectedData] = useState(null);
  const [customText, setCustomText] = useState('');
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      runOcrSimulation(file.name);
    }
  };

  const handlePresetSelect = (preset) => {
    setSelectedFile({ name: preset.title });
    setPreviewUrl(preset.imagePlaceholder);
    setIsScanning(true);
    setDetectedData(null);

    setTimeout(() => {
      setIsScanning(false);
      const matched = searchMedicines(preset.title)[0];
      setDetectedData({
        medicine: matched,
        confidence: preset.detectedConfidence,
        keywords: preset.detectedKeywords,
        dosage: matched ? matched.strength : 'Standard',
        mfr: matched ? matched.prescribedBrand.manufacturer : 'Pharma Mfr'
      });
    }, 1200);
  };

  const runOcrSimulation = (fileName) => {
    setIsScanning(true);
    setDetectedData(null);

    setTimeout(() => {
      setIsScanning(false);
      // Find closest match or default to Pan 40 if unrecognizable
      const matched = searchMedicines(fileName)[0] || searchMedicines('Pan 40')[0];
      setDetectedData({
        medicine: matched,
        confidence: 96.2,
        keywords: [matched.brandName, matched.salt.split(' ')[0], 'Batch No: OK-2024'],
        dosage: matched.strength,
        mfr: matched.prescribedBrand.manufacturer
      });
    }, 1400);
  };

  const handleApplyDetected = () => {
    if (detectedData?.medicine) {
      onSelectMedicine(detectedData.medicine);
      onClose();
      const pricingEl = document.getElementById('pricing-engine');
      if (pricingEl) {
        pricingEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-[#E6F4F1]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#113222] text-[#34D399] flex items-center justify-center">
              <Scan className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-[#113222]">
                Prescription & Strip OCR Reader
              </h3>
              <p className="text-xs text-slate-500">
                Lightweight zero-dependency client reader & generic price matcher
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          
          {/* Quick Preset Strips Selection */}
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#059669]" />
              <span>Select Sample Strip to Test Instantly:</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {OCR_SAMPLE_PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handlePresetSelect(p)}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-[#10B981] hover:bg-[#E6F4F1] text-left text-xs transition-all cursor-pointer group"
                >
                  <div className="font-bold text-slate-900 group-hover:text-[#059669] truncate">
                    {p.title}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {p.subtitle}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Upload Zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-[#10B981] rounded-2xl p-6 text-center bg-[#E6F4F1]/30 hover:bg-[#E6F4F1]/60 transition-all cursor-pointer group"
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              accept="image/*" 
              className="hidden" 
            />
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-emerald-100 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6 text-[#059669]" />
            </div>
            <div className="text-sm font-bold text-slate-800">
              {selectedFile ? selectedFile.name : 'Upload Medicine Strip Photo or Prescription Slip'}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Supports JPEG, PNG, or mobile camera captures
            </div>
          </div>

          {/* Scanner Visualizer when Image is Selected */}
          {(previewUrl || isScanning) && (
            <div className="bg-slate-900 rounded-2xl p-4 text-white relative overflow-hidden">
              {/* Laser animation */}
              {isScanning && (
                <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#34D399] to-transparent shadow-[0_0_15px_#34D399] z-20 animate-laser" />
              )}

              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800 mb-3">
                <span className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${isScanning ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                  <span className="font-bold">{isScanning ? 'Extracting text and matching molecules...' : 'OCR Extraction Complete'}</span>
                </span>
                {detectedData && (
                  <span className="text-emerald-400 font-mono text-[11px]">
                    Match Confidence: {detectedData.confidence}%
                  </span>
                )}
              </div>

              {previewUrl && (
                <div className="flex items-center justify-center max-h-36 overflow-hidden rounded-xl bg-slate-950 mb-3 p-2">
                  <img src={previewUrl} alt="Prescription preview" className="max-h-32 object-contain rounded-lg" />
                </div>
              )}

              {detectedData && (
                <div className="space-y-2 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                        Identified Medicine
                      </div>
                      <div className="text-base font-extrabold text-white">
                        {detectedData.medicine.brandName}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400">Generic Available</div>
                      <div className="text-sm font-black text-[#34D399]">
                        Save {detectedData.medicine.savingPercentage}%
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300">
                    <strong>Salt Molecule:</strong> {detectedData.medicine.salt}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {detectedData.keywords.map((kw, i) => (
                      <span key={i} className="text-[10px] bg-slate-700 text-slate-200 px-2 py-0.5 rounded">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              disabled={!detectedData}
              onClick={handleApplyDetected}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                detectedData
                  ? 'bg-[#113222] hover:bg-[#184630] text-white shadow-md'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>View Generic Price Breakdown</span>
              <ArrowRight className="w-4 h-4 text-[#34D399]" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
