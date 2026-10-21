import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  ShieldCheck, 
  CheckCircle, 
  KeyRound, 
  ArrowRight,
  Sparkles,
  Lock
} from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' | 'otp' | 'success'
  const [otp, setOtp] = useState(['', '', '', '']);

  if (!isOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      setStep('otp');
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Auto-advance
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setStep('success');
    setTimeout(() => {
      onClose();
      setStep('phone');
      setPhoneNumber('');
    }, 1500);
  };

  const handleDemoLogin = () => {
    setPhoneNumber('9876543210');
    setStep('otp');
    setOtp(['4', '2', '0', '8']);
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onClose();
        setStep('phone');
      }, 1200);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-[#E6F4F1]/60">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#113222] text-[#34D399] flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#113222]">
                Patient & Ayushman Login
              </h3>
              <p className="text-xs text-slate-500">
                Access chronic prescription refills & ABHA records
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {step === 'phone' && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                    +91
                  </div>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full pl-14 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#10B981] text-sm font-semibold"
                  />
                  <Smartphone className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                disabled={phoneNumber.length < 10}
                className={`w-full py-3.5 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  phoneNumber.length >= 10
                    ? 'bg-[#113222] hover:bg-[#184630] text-white shadow-md'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Get Verification OTP</span>
                <ArrowRight className="w-4 h-4 text-[#34D399]" />
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-3 text-xs text-slate-400">or</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-[#065F46] border border-emerald-200 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#059669]" />
                <span>1-Click Quick Demo Sign-In</span>
              </button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center">
                <div className="text-xs text-slate-500">
                  Enter 4-digit code sent to <strong>+91 {phoneNumber}</strong>
                </div>
              </div>

              <div className="flex justify-center gap-3 py-2">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-input-${i}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    className="w-12 h-14 rounded-2xl border-2 border-slate-200 text-center text-xl font-bold text-slate-900 focus:outline-none focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#113222] hover:bg-[#184630] text-white font-black text-xs transition-all shadow-md cursor-pointer"
              >
                Verify & Continue
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-xs text-[#059669] hover:underline font-semibold"
                >
                  Change phone number
                </button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center py-6 space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#059669] flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black text-[#113222]">Welcome Back!</h4>
              <p className="text-xs text-slate-500">
                Logged in successfully. ABHA Health ID linked.
              </p>
            </div>
          )}

          <div className="mt-5 pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#059669]" />
            <span>256-bit encrypted Ayushman Bharat digital compliance</span>
          </div>
        </div>

      </div>
    </div>
  );
}
