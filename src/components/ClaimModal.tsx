import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Check, 
  Copy, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink, 
  X, 
  Clock, 
  Gift, 
  Send, 
  Download, 
  QrCode, 
  CheckCircle2, 
  ShoppingBag,
  Heart
} from 'lucide-react';
import { playChime, playSuccessPop } from '../utils/audio';

interface ClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClaimModal: React.FC<ClaimModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'verifying' | 'claimed'>('verifying');
  const [progress, setProgress] = useState(15);
  const [progressText, setProgressText] = useState('Verifying eligibility for your device...');
  const [copied, setCopied] = useState(false);
  const [promoCode] = useState(() => {
    const codes = ['JELLY30-MAGIC', 'JELLY30-BUNNY', 'JELLY30-AMUSE', 'JELLY30-LONDON'];
    return codes[Math.floor(Math.random() * codes.length)];
  });
  const [emailInput, setEmailInput] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [remainingTime, setRemainingTime] = useState(899); // 14 mins 59 secs

  useEffect(() => {
    if (!isOpen) {
      setStep('verifying');
      setProgress(15);
      setEmailSent(false);
      return;
    }

    // Step 1: Verification progress sequence
    const t1 = setTimeout(() => {
      setProgress(45);
      setProgressText('Connecting to Jellycat London VIP Allocation Gateway...');
    }, 600);

    const t2 = setTimeout(() => {
      setProgress(80);
      setProgressText('Applying 30% Storewide Discount + Free Shipping Voucher...');
    }, 1200);

    const t3 = setTimeout(() => {
      setProgress(100);
      setProgressText('Voucher successfully generated!');
      setTimeout(() => {
        setStep('claimed');
        playChime();
        // Trigger rich confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0B4EA2', '#F59E0B', '#38BDF8', '#FCD34D', '#EC4899'],
        });
      }, 400);
    }, 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isOpen]);

  // Reservation hold countdown timer
  useEffect(() => {
    if (step !== 'claimed') return;
    const interval = setInterval(() => {
      setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    playSuccessPop();
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setEmailSent(true);
    playSuccessPop();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-slate-800 transition-all max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-[#0B4EA2] via-[#0A4590] to-[#083A7A] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-amber-300 font-bold">Exclusive Voucher Portal</p>
              <h3 className="text-base font-bold text-white">Jellycat London VIP Reward</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {step === 'verifying' ? (
            <div className="py-12 flex flex-col items-center text-center space-y-5">
              <div className="relative">
                <div className="w-20 h-20 rounded-full border-4 border-slate-100 border-t-[#0B4EA2] animate-spin flex items-center justify-center" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Gift className="w-8 h-8 text-[#0B4EA2] animate-pulse" />
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">Claiming Your Voucher</h4>
                <p className="text-sm text-slate-500 mt-1 max-w-xs">{progressText}</p>
              </div>

              {/* Progress bar */}
              <div className="w-full max-w-xs bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-[#0B4EA2] to-amber-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${progress}%` }} 
                />
              </div>

              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>100% Guaranteed Official Jellycat Code</span>
              </div>
            </div>
          ) : (
            <div className="space-y-5 animate-fade-in">
              {/* Congratulatory Banner */}
              <div className="text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Code Allocated & Verified
                </div>
                <h4 className="text-2xl font-black text-slate-900 tracking-tight">
                  🎉 30% OFF Jellycat Unlocked!
                </h4>
                <p className="text-xs sm:text-sm text-slate-500">
                  Your exclusive promotional voucher is ready to use today storewide.
                </p>
              </div>

              {/* Unique Voucher Code Card */}
              <div className="relative bg-gradient-to-br from-amber-50/80 via-white to-blue-50/60 p-5 rounded-2xl border-2 border-dashed border-[#0B4EA2]/30 shadow-inner">
                <div className="text-center space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    Single-Use Promo Code
                  </span>
                  
                  <div className="flex items-center justify-center gap-2">
                    <div className="bg-white border-2 border-[#0B4EA2] px-5 py-3 rounded-xl shadow-sm">
                      <span className="font-mono text-2xl sm:text-3xl font-black tracking-wider text-[#0B4EA2]">
                        {promoCode}
                      </span>
                    </div>
                    <button
                      onClick={handleCopy}
                      className={`px-4 py-3 rounded-xl font-bold flex items-center gap-1.5 transition-all text-sm ${
                        copied
                          ? 'bg-emerald-600 text-white shadow-md scale-105'
                          : 'bg-[#0B4EA2] text-white hover:bg-[#093e82] active:scale-95 shadow-md'
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 stroke-[3]" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Barcode & In-Store Redemption Simulation */}
                <div className="mt-4 pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-8 h-8 text-slate-700 p-1 bg-white rounded border border-slate-200" />
                    <div className="text-left">
                      <p className="font-semibold text-slate-700">In-Store Barcode</p>
                      <p className="text-[10px] text-slate-400">Scan at Covent Garden, Selfridges, or Harrods</p>
                    </div>
                  </div>
                  {/* Simulated barcode graphic */}
                  <div className="flex items-center space-x-0.5 h-7 px-2 py-1 bg-white rounded border border-slate-200">
                    <div className="w-1 h-full bg-slate-900" />
                    <div className="w-0.5 h-full bg-slate-400" />
                    <div className="w-1.5 h-full bg-slate-900" />
                    <div className="w-0.5 h-full bg-white" />
                    <div className="w-1 h-full bg-slate-900" />
                    <div className="w-2 h-full bg-slate-900" />
                    <div className="w-0.5 h-full bg-slate-400" />
                    <div className="w-1 h-full bg-slate-900" />
                    <div className="w-0.5 h-full bg-white" />
                    <div className="w-2 h-full bg-slate-900" />
                    <div className="w-1 h-full bg-slate-900" />
                  </div>
                </div>

                {/* Timer ribbon */}
                <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-100/90 py-1.5 px-3 rounded-lg">
                  <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" style={{ animationDuration: '4s' }} />
                  <span>Held for you for: <strong className="font-mono text-amber-900">{formatTimer(remainingTime)}</strong></span>
                </div>
              </div>

              {/* What this voucher includes */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/70 space-y-2">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">Included with your claim:</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-100">
                    <div className="w-6 h-6 rounded-md bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                      30%
                    </div>
                    <span className="font-medium text-slate-700">Off Any Plush Item</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-100">
                    <div className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                      FREE
                    </div>
                    <span className="font-medium text-slate-700">Express Shipping</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-100">
                    <div className="w-6 h-6 rounded-md bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                      GIFT
                    </div>
                    <span className="font-medium text-slate-700">Velvet Dust Bag</span>
                  </div>
                </div>
              </div>

              {/* Direct Link CTA */}
              <div className="space-y-2">
                <a
                  href="https://www.jellycat.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleCopy}
                  className="w-full bg-[#0B4EA2] hover:bg-[#083E82] text-white py-3.5 px-6 rounded-2xl font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 active:scale-[0.99] transition-all text-base"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Shop Official Jellycat Store</span>
                  <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
                </a>

                {/* Email or SMS me this code */}
                {!emailSent ? (
                  <form onSubmit={handleSendEmail} className="flex gap-2 pt-1">
                    <input
                      type="email"
                      placeholder="Enter email to save code for later..."
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="flex-1 px-3.5 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B4EA2]"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs flex items-center gap-1 transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Save</span>
                    </button>
                  </form>
                ) : (
                  <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl text-xs text-center font-medium border border-emerald-200">
                    ✓ Voucher details sent to {emailInput}! Check your inbox.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer info in modal */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Official Jellycat Portal</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 font-semibold text-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
