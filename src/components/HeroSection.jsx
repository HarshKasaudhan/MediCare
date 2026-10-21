import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  Truck, 
  ShieldCheck, 
  Award, 
  Search, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Camera,
  RefreshCw,
  Zap,
  Info,
  Mic,
  MicOff,
  Volume2
} from 'lucide-react';
import { OCR_SAMPLE_PRESETS } from '../data/medicinesData';

export default function HeroSection({ 
  onSearch, 
  onSelectMedicineById, 
  onOpenPrescriptionModal, 
  selectedMedicine 
}) {
  const [searchInput, setSearchInput] = useState('');
  const [activePreset, setActivePreset] = useState(OCR_SAMPLE_PRESETS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState(null);
  const recognitionRef = useRef(null);

  const POPULAR_CHIPS = [
    { label: 'Pan 40', query: 'Pan 40' },
    { label: 'Augmentin 625', query: 'Augmentin 625' },
    { label: 'Telma 40 (BP)', query: 'Telma 40' },
    { label: 'Glycomet 500', query: 'Glycomet 500' },
    { label: 'Rosuvas 10', query: 'Rosuvas 10' },
    { label: 'Dolo 650', query: 'Dolo 650' }
  ];

  // Initialize Speech Recognition if supported in browser
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-IN'; // Indian English tailored for medicine brands

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      recognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        if (spokenText) {
          setSearchInput(spokenText);
          setIsListening(false);
          onSearch(spokenText);
        }
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        if (event.error !== 'no-speech') {
          setSpeechError('Could not recognize voice. Please type name.');
          setTimeout(() => setSpeechError(null), 3000);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [onSearch]);

  const toggleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice search is not supported by your current browser. Please use Chrome, Edge, or type directly.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        setSpeechError(null);
        recognitionRef.current?.start();
      } catch (err) {
        recognitionRef.current?.stop();
        setTimeout(() => recognitionRef.current?.start(), 150);
      }
    }
  };

  // Keep search input synced when medicine is selected or scanned
  useEffect(() => {
    if (selectedMedicine?.brandName) {
      setSearchInput(selectedMedicine.brandName);
    }
  }, [selectedMedicine]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput);
    }
  };

  const handlePresetSelect = (preset) => {
    setActivePreset(preset);
    setIsScanning(true);
    setScanComplete(false);

    // Auto-populate search input with extracted medicine name
    const detectedTitle = preset.title.replace(' Gastro Strip', '').replace(' Strip', '').replace(' Blister', '').replace(' Green Pack', '');
    setSearchInput(detectedTitle);

    // Simulate OCR processing time
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      onSelectMedicineById(preset.targetMedicineId);
    }, 1200);
  };

  return (
    <section className="relative pt-6 pb-16 lg:py-16 overflow-hidden">
      {/* Decorative background radial glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Subtitle, Search, Trust Badges */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#A7F3D0] shadow-sm mb-5 text-xs font-semibold text-[#065F46]">
              <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Zero-Hallucination PMBJP & NPPA Drug Price Engine</span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span className="text-[#047857] hidden sm:inline">Save 50% to 90%</span>
            </div>

            {/* Main Heading: Musemind inspiration with #113222 large bold typography */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#113222] tracking-tight leading-[0.98] mb-5">
              Pharmacy
            </h1>

            {/* Subtitle text */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-700 font-normal max-w-2xl leading-relaxed mb-8">
              Compare doctor-prescribed medicine brands against official 
              <strong className="text-[#113222] font-semibold"> NPPA ceiling rates</strong> and 
              <strong className="text-[#059669] font-semibold"> PMBJP Jan Aushadhi generic substitutes</strong>. 
              Identical WHO-GMP efficacy, verified quality, zero marketing markup.
            </p>

            {/* Fuzzy Search Bar with Integrated Voice Search */}
            <div className="w-full max-w-xl mb-5">
              <form 
                onSubmit={handleSearchSubmit} 
                className={`w-full rounded-2xl bg-white border-2 shadow-lg shadow-emerald-900/5 transition-all p-1.5 sm:p-2 flex items-center gap-2 group ${
                  isListening ? 'border-rose-500 ring-4 ring-rose-500/20' : 'border-[#D5EFE3] focus-within:border-[#10B981] focus-within:ring-4 focus-within:ring-[#10B981]/15'
                }`}
              >
                <div className="pl-3 sm:pl-3.5 text-[#059669] shrink-0 group-focus-within:scale-110 transition-transform">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder={isListening ? "Listening... Speak medicine name now" : "Type brand, active molecule, or symptom..."}
                  className="flex-1 min-w-0 bg-transparent py-2.5 sm:py-3 px-1 text-slate-900 placeholder:text-slate-400 text-sm sm:text-base focus:outline-none border-none ring-0 font-medium"
                />

                {/* Voice Search Microphone Button */}
                <button
                  type="button"
                  onClick={toggleVoiceSearch}
                  title={isListening ? "Click to stop listening" : "Voice search medicine name"}
                  className={`p-2.5 rounded-xl transition-all cursor-pointer relative shrink-0 ${
                    isListening
                      ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/40'
                      : 'bg-emerald-50 text-[#059669] hover:bg-emerald-100 hover:text-[#047857]'
                  }`}
                >
                  {isListening ? (
                    <Mic className="w-4 h-4 animate-bounce" />
                  ) : (
                    <Mic className="w-4 h-4" />
                  )}
                  {isListening && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                  )}
                </button>

                {/* Compare Submit Button */}
                <button
                  type="submit"
                  className="shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#113222] hover:bg-[#184630] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Compare</span>
                  <ArrowRight className="w-4 h-4 text-[#34D399]" />
                </button>
              </form>

              {/* Listening feedback or speech error */}
              {isListening && (
                <div className="mt-2 text-xs font-bold text-rose-600 flex items-center gap-1.5 animate-in fade-in">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span>Listening... Speak clearly (e.g. "Pan 40" or "Augmentin")</span>
                </div>
              )}
              {speechError && (
                <div className="mt-2 text-xs font-semibold text-amber-600">
                  {speechError}
                </div>
              )}

              {/* Quick suggestion tags */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="text-xs text-slate-500 font-medium">Try searching:</span>
                {POPULAR_CHIPS.map((chip) => (
                  <button
                    key={chip.label}
                    onClick={() => {
                      setSearchInput(chip.query);
                      onSearch(chip.query);
                    }}
                    className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/70 hover:bg-[#113222] text-slate-700 hover:text-white border border-[#CBD5E1]/60 transition-all cursor-pointer shadow-2xs"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Trust Badges: split card items */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-xl pt-4 border-t border-[#D5EFE3]/80">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/60 border border-white">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4 text-[#059669]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Doorstep Delivery</div>
                  <div className="text-[10px] text-slate-500">Fast Lucknow shipping</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/60 border border-white">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#059669]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">100% Genuine</div>
                  <div className="text-[10px] text-slate-500">WHO-GMP batch tested</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/60 border border-white col-span-2 sm:col-span-1">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-[#059669]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">NPPA Regulated</div>
                  <div className="text-[10px] text-slate-500">Zero price inflation</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Distinct Dashed-Border Card "Upload prescription" */}
          <div className="lg:col-span-5">
            <div className="prescription-dropzone rounded-3xl p-6 sm:p-7 shadow-xl relative overflow-hidden backdrop-blur-sm">
              
              {/* Header of Upload Card */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#113222] flex items-center justify-center text-white shadow-sm">
                    <FileText className="w-5 h-5 text-[#34D399]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#113222] leading-tight">
                      Upload prescription
                    </h3>
                    <p className="text-xs text-slate-500">
                      OCR strip scanner & generic price matcher
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-[#047857]">
                  Instant OCR
                </span>
              </div>

              {/* Upload Drop Area */}
              <div 
                onClick={onOpenPrescriptionModal}
                className="w-full bg-white/90 rounded-2xl border-2 border-dashed border-[#10B981]/50 hover:border-[#059669] p-5 text-center cursor-pointer transition-all hover:bg-emerald-50/50 group mb-4"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 mx-auto flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 text-[#059669]" />
                </div>
                <div className="text-sm font-bold text-slate-800">
                  Drag & Drop strip image or browse
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Supports JPG, PNG, strip photos & doctor slips
                </div>
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#059669] group-hover:underline">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Click to open full-screen scanner</span>
                </div>
              </div>

              {/* 1-Click OCR Simulation Strip Presets */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>Quick Test with Medicine Strips:</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Click to scan</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {OCR_SAMPLE_PRESETS.map((preset) => {
                    const isSelected = activePreset.id === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => handlePresetSelect(preset)}
                        className={`text-left p-2.5 rounded-xl text-xs transition-all border cursor-pointer ${
                          isSelected
                            ? 'bg-[#113222] text-white border-[#113222] shadow-md'
                            : 'bg-white/80 hover:bg-white text-slate-700 border-slate-200 hover:border-[#10B981]'
                        }`}
                      >
                        <div className="font-bold truncate">{preset.title}</div>
                        <div className={`text-[10px] truncate ${isSelected ? 'text-emerald-200' : 'text-slate-400'}`}>
                          {preset.subtitle}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Strip Preview & Simulated Laser Scanner */}
              <div className="bg-slate-900 rounded-2xl p-3 text-white relative overflow-hidden mb-4 shadow-inner">
                {/* Laser scan line if scanning */}
                {isScanning && (
                  <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#34D399] to-transparent shadow-[0_0_12px_#34D399] z-20 animate-laser" />
                )}

                <div className="flex items-center justify-between text-[11px] text-slate-300 pb-2 mb-2 border-b border-slate-800">
                  <span className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${isScanning ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                    <span>{isScanning ? 'Scanning Strip via OCR...' : 'Strip Analyzed'}</span>
                  </span>
                  <span className="font-mono text-emerald-400 text-[10px]">
                    Confidence: {activePreset.detectedConfidence}%
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-white flex items-center justify-between">
                    <span>{activePreset.title}</span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                      Detected
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {activePreset.detectedKeywords.map((kw, i) => (
                      <span key={i} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Action Button requested: "Order Via Prescription" */}
              <button
                onClick={() => {
                  onSelectMedicineById(activePreset.targetMedicineId);
                  const pricingEl = document.getElementById('pricing-engine');
                  if (pricingEl) {
                    pricingEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#113222] hover:bg-[#184630] text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Order Via Prescription</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#34D399]" />
              </button>

              <div className="flex items-center justify-center gap-1.5 mt-2.5 text-[11px] text-slate-500">
                <Info className="w-3.5 h-3.5 text-slate-400" />
                <span>Zero-Hallucination: matched only to certified government catalog</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
