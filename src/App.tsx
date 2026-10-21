import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Clock, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  Tag, 
  Star, 
  ArrowRight, 
  Gift, 
  CheckCircle2, 
  RotateCw, 
  Check
} from 'lucide-react';
import { DunkinLogo } from './components/DunkinLogo';
import { DoodleUnderline } from './components/DoodleUnderline';
import { InfoModal } from './components/InfoModal';
import { playChime, playSuccessPop } from './utils/audio';

type ClaimState = 'idle' | 'generating' | 'ready';

export default function App() {
  // Real-time ticking countdown timer starting at 10:23 (623 seconds) as in reference screenshot
  const [secondsLeft, setSecondsLeft] = useState(623);
  const [claimState, setClaimState] = useState<ClaimState>('idle');
  const [generationStep, setGenerationStep] = useState<number>(1);
  const [claimedCount, setClaimedCount] = useState(3106);
  const [infoModalType, setInfoModalType] = useState<'how-it-works' | 'faq' | 'verified' | null>(null);
  const [codeCopied, setCodeCopied] = useState(false);
  const discountCode = 'DUNKIN60';

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 600));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Live increment of claimed count every ~15 seconds to enhance authentic social proof
  useEffect(() => {
    const counterTimer = setInterval(() => {
      setClaimedCount((prev) => prev + 1);
    }, 14000);
    return () => clearInterval(counterTimer);
  }, []);

  // Generation sequence when claim is clicked (matching user's uploaded Image 1 & 2)
  const startClaimFlow = () => {
    setClaimState('generating');
    setGenerationStep(1);
    setCodeCopied(false);

    playSuccessPop();

    // Step 1: Checking promotional availability
    const t1 = setTimeout(() => {
      setGenerationStep(2); // Generating secure barcode & token
    }, 700);

    // Step 2: Validating store discount voucher
    const t2 = setTimeout(() => {
      setGenerationStep(3);
    }, 1500);

    // Step 3: Complete & Transition to "Your Discount Voucher is Ready!"
    const t3 = setTimeout(() => {
      setClaimState('ready');
      playChime();
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF671F', '#DA1A5F', '#38BDF8', '#FCD34D', '#10B981'],
      });
    }, 2300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  };

  const REDIRECT_URL = 'https://apptrck.net/cl/i/m5ndnm';

  const handleCopyCode = () => {
    try {
      navigator.clipboard.writeText(discountCode);
    } catch {
      // ignore
    }
    setCodeCopied(true);
    playSuccessPop();
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#FF671F', '#DA1A5F', '#10B981'],
    });
    setTimeout(() => setCodeCopied(false), 3000);
  };

  const handleResetClaim = () => {
    setClaimState('idle');
    setGenerationStep(1);
    setCodeCopied(false);
  };

  const formatCountdown = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen relative bg-white overflow-x-hidden flex flex-col justify-between selection:bg-pink-100 selection:text-pink-900">
      
      {/* Main Hero & Claim Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12">
        
        {/* Top Dunkin' Donuts Brand Badge */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <DunkinLogo size={114} />
          </div>

          {/* Social Proof Claim Count & Initials Avatars */}
          <div className="mt-4 flex items-center space-x-2 text-sm text-slate-700 font-semibold select-none">
            {/* Overlapping Initials Avatars */}
            <div className="flex -space-x-1.5 overflow-hidden p-0.5">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#EA580C] text-[10px] font-black text-white ring-2 ring-white shadow-xs">
                WL
              </span>
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#F59E0B] text-[10px] font-black text-white ring-2 ring-white shadow-xs">
                NC
              </span>
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#D97706] text-[10px] font-black text-white ring-2 ring-white shadow-xs">
                FG
              </span>
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#EAB308] text-[10px] font-black text-white ring-2 ring-white shadow-xs">
                HJ
              </span>
            </div>

            {/* Claimed Today Counter */}
            <div className="text-slate-600 text-xs sm:text-sm">
              <strong className="text-slate-900 font-extrabold font-mono tracking-tight">
                {claimedCount.toLocaleString()}
              </strong>{' '}
              claimed today
            </div>
          </div>
        </div>

        {/* Central Voucher Claim Card Container */}
        <div className="relative w-full max-w-[540px] mt-6">
          
          {/* Top Pill Tab: Claim Discount (Hidden when generating or ready) */}
          {claimState === 'idle' && (
            <div className="flex justify-center -mb-5 relative z-20">
              <button
                onClick={startClaimFlow}
                className="bg-[#0B4EA2] hover:bg-[#093E82] text-white px-6 py-2.5 rounded-full shadow-[0_6px_20px_rgba(11,78,162,0.35)] flex items-center space-x-2 text-sm font-bold tracking-wide transition-all duration-200 active:scale-95 cursor-pointer hover:shadow-[0_8px_25px_rgba(11,78,162,0.45)]"
              >
                <Gift className="w-4 h-4 text-amber-300" />
                <span>Claim Discount</span>
              </button>
            </div>
          )}

          {/* Top Pill Tab when Ready: ✨ Voucher Ready */}
          {claimState === 'ready' && (
            <div className="flex justify-center -mb-4 relative z-20">
              <div className="bg-[#D1FAE5] border border-[#A7F3D0] text-[#065F46] px-5 py-1.5 rounded-full shadow-sm flex items-center space-x-1.5 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Voucher Ready</span>
              </div>
            </div>
          )}

          {/* Main White Card with Dynamic State Rendering */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100/90 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.08)] pt-10 pb-8 px-6 sm:px-10 text-center relative overflow-hidden transition-all duration-300">
            
            {/* ======================================================== */}
            {/* STATE 1: IDLE / INITIAL VIEW (From first user screenshots) */}
            {/* ======================================================== */}
            {claimState === 'idle' && (
              <div className="animate-fade-in">
                {/* Exclusive Offer Pill */}
                <div className="inline-block mb-4">
                  <span className="bg-[#EA580C] text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-wide uppercase shadow-xs">
                    Exclusive Offer
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className="text-2xl sm:text-3xl md:text-[32px] font-extrabold text-[#0A2540] tracking-tight leading-tight">
                  You&apos;ve been selected for the
                  <div className="relative inline-block mt-1 sm:mt-1.5 ml-1">
                    <span className="text-[#0A2540] relative z-10 font-black">
                      Dunkin&apos; Donuts Discount
                    </span>
                    {/* Hand-drawn curved underline matching reference image */}
                    <div className="absolute -bottom-2.5 left-0 right-0 w-full pointer-events-none">
                      <DoodleUnderline color="#FF671F" className="h-3 sm:h-3.5" />
                    </div>
                  </div>
                </h1>

                {/* Subtitle */}
                <p className="mt-5 text-sm sm:text-base text-slate-500 max-w-md mx-auto leading-relaxed">
                  Claim your instant promotional discount code directly to your device — valid for all orders today.
                </p>

                {/* Countdown Badge: 10:23 left to claim */}
                <div className="mt-5 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-slate-200 bg-slate-50/80 text-slate-700 text-xs sm:text-sm font-medium shadow-xs">
                  <Clock className="w-4 h-4 text-slate-600 animate-pulse" />
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    {formatCountdown(secondsLeft)}
                  </span>
                  <span className="text-slate-500">left to claim</span>
                </div>

                {/* Primary CTA Button: Claim Discount -> */}
                <div className="mt-6">
                  <button
                    onClick={startClaimFlow}
                    className="w-full bg-[#1853db] hover:bg-[#1242b5] active:scale-[0.98] text-white py-4 px-8 rounded-full font-bold text-base sm:text-lg shadow-[0_8px_25px_rgba(24,83,219,0.35)] hover:shadow-[0_10px_30px_rgba(24,83,219,0.45)] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Claim Discount</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>

                {/* Trust Badges Row (Shield, Zap, Sparkles) */}
                <div className="mt-5 pt-3 flex items-center justify-center gap-4 sm:gap-6 text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5 text-blue-700">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span className="text-slate-600 font-semibold">Secure</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-600">
                    <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-slate-600 font-semibold">Instant Code</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-indigo-600">
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                    <span className="text-slate-600 font-semibold">Instant Access</span>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* STATE 2: GENERATING (Pixel-perfect match to Image 1)       */}
            {/* ======================================================== */}
            {claimState === 'generating' && (
              <div className="py-4 sm:py-6 flex flex-col items-center text-center space-y-6 animate-fade-in">
                
                {/* Circular soft blue spinner */}
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-blue-50/70 border-4 border-blue-100 flex items-center justify-center" />
                  {/* Rotating Arc */}
                  <svg 
                    className="absolute inset-0 w-20 h-20 animate-spin text-[#3B82F6]" 
                    viewBox="0 0 50 50"
                  >
                    <circle
                      className="opacity-25"
                      cx="25"
                      cy="25"
                      r="20"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 25a21 21 0 0121-21v4a17 17 0 00-17 17H4z"
                    />
                  </svg>
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-[26px] font-black text-[#0B2545] tracking-tight">
                    Generating Single-Use Allocation
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Allocating instant discount code to your browser session...
                  </p>
                </div>

                {/* Checklist Container matching Image 1 */}
                <div className="w-full max-w-sm bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-3.5 text-left text-xs sm:text-sm">
                  
                  {/* Checklist Item 1: Checking promotional availability */}
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-emerald-600 transition-colors">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" stroke="#059669" />
                        <path d="m9 12 2 2 4-4" stroke="#059669" />
                      </svg>
                    </div>
                    <span className="font-semibold text-emerald-900/90">
                      Checking promotional availability
                    </span>
                  </div>

                  {/* Checklist Item 2: Generating secure barcode & token */}
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center transition-colors">
                      {generationStep >= 2 ? (
                        <svg className="w-5 h-5 animate-scale-in" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" stroke="#059669" />
                          <path d="m9 12 2 2 4-4" stroke="#059669" />
                        </svg>
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-slate-300 border-t-[#0B4EA2] animate-spin" />
                      )}
                    </div>
                    <span className={generationStep >= 2 ? 'font-semibold text-emerald-900/90' : 'text-slate-400 font-medium'}>
                      Generating secure barcode & token
                    </span>
                  </div>

                  {/* Checklist Item 3: Validating store discount voucher */}
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center transition-colors">
                      {generationStep >= 3 ? (
                        <svg className="w-5 h-5 animate-scale-in" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" stroke="#059669" />
                          <path d="m9 12 2 2 4-4" stroke="#059669" />
                        </svg>
                      ) : (
                        <div className="w-4.5 h-4.5 rounded-full border-2 border-slate-300" />
                      )}
                    </div>
                    <span className={generationStep >= 3 ? 'font-semibold text-emerald-900/90' : 'text-slate-400 font-medium'}>
                      Validating store discount voucher
                    </span>
                  </div>

                </div>

              </div>
            )}

            {/* ======================================================== */}
            {/* STATE 3: READY / VOUCHER UNLOCKED (Matching Image 2)      */}
            {/* ======================================================== */}
            {claimState === 'ready' && (
              <div className="pt-2 pb-2 space-y-4 animate-fade-in">
                
                {/* Heading */}
                <h2 className="text-2xl sm:text-[30px] font-black text-[#0A2540] tracking-tight">
                  Your Discount Voucher is Ready!
                </h2>

                {/* Subtitle with Dunkin' Donuts customization */}
                <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Use code at checkout for your <strong className="text-slate-800">Dunkin&apos; Donuts</strong> orders — valid for all purchases today.
                </p>

                {/* Dashed Yellow Coupon Ticket Box with Left & Right Cutout Notches */}
                <div className="relative mt-5 mb-4 p-5 sm:p-7 rounded-2xl sm:rounded-3xl border-2 border-dashed border-[#FBBF24] bg-[#FFFDF0]/80">
                  
                  {/* Left Ticket Notch */}
                  <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full border-r-2 border-dashed border-[#FBBF24]" />
                  
                  {/* Right Ticket Notch */}
                  <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full border-l-2 border-dashed border-[#FBBF24]" />

                  {/* Top Ticket Pill: SINGLE-USE VERIFIED PROMOTIONAL CODE */}
                  <div className="inline-block mb-4">
                    <span className="bg-[#FEF3C7] text-[#B45309] text-[10px] sm:text-[11px] font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-2xs">
                      Single-Use Verified Promotional Code
                    </span>
                  </div>

                  {/* Coupon Split Button: [ 🎁 Claim Discount | 60 ] */}
                  <div className="flex items-center justify-center">
                    <a 
                      href={REDIRECT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleCopyCode}
                      className="inline-flex rounded-xl shadow-[0_4px_16px_rgba(29,78,216,0.25)] hover:shadow-[0_6px_22px_rgba(29,78,216,0.35)] transition-all transform active:scale-98 cursor-pointer group no-underline"
                    >
                      {/* Left Blue Part: 🎁 Claim Discount / Copied feedback */}
                      <div 
                        className="bg-[#1D4ED8] group-hover:bg-[#1E40AF] text-white font-bold text-sm sm:text-base px-5 sm:px-6 py-3.5 rounded-l-xl flex items-center gap-2 transition-colors"
                      >
                        {codeCopied ? (
                          <>
                            <Check className="w-4 h-4 stroke-[3] text-emerald-300" />
                            <span>Code Copied!</span>
                          </>
                        ) : (
                          <>
                            <Gift className="w-4 h-4 text-amber-300" />
                            <span>Claim Discount</span>
                          </>
                        )}
                      </div>

                      {/* Right Dashed Blue Part: 60 */}
                      <div className="bg-[#EFF6FF] border-2 border-dashed border-[#2563EB] text-[#1D4ED8] font-black text-base sm:text-lg px-4 py-3.5 rounded-r-xl border-l-0 flex items-center justify-center min-w-[58px] select-all group-hover:bg-blue-100/70 transition-colors">
                        <span>{codeCopied ? '✓' : '60'}</span>
                      </div>
                    </a>
                  </div>

                  {/* Copy Alert Banner when clicked */}
                  {codeCopied && (
                    <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100/90 text-emerald-800 text-xs font-bold rounded-lg animate-bounce">
                      <span>✓ Copied promo code &quot;{discountCode}&quot; to clipboard!</span>
                    </div>
                  )}

                  {/* Trust Footer inside ticket */}
                  <div className="mt-5 flex items-center justify-center gap-3 text-xs font-semibold">
                    <div className="flex items-center gap-1 text-[#047857]">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" stroke="#047857" />
                        <path d="m9 12 2 2 4-4" stroke="#047857" />
                      </svg>
                      <span>100% Authentic Voucher</span>
                    </div>
                    <span className="text-slate-300">•</span>
                    <div className="flex items-center gap-1 text-[#B45309]">
                      <Clock className="w-3.5 h-3.5 text-[#B45309]" />
                      <span>Valid For 24 Hours</span>
                    </div>
                  </div>

                </div>

                {/* Secondary Actions */}
                <div className="pt-2 flex flex-col items-center">
                  {/* Reset: Claim Another Discount Voucher (from Image 2) */}
                  <button
                    onClick={handleResetClaim}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-semibold transition-colors cursor-pointer"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-slate-400" />
                    <span>Claim Another Discount Voucher</span>
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>

        {/* 3 Golden Feature Cards (Instant Savings, Storewide Valid, Free Shipping) */}
        <div className="w-full max-w-[540px] mt-8 grid grid-cols-3 gap-3 sm:gap-4 select-none">
          
          {/* Card 1: Instant Savings */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-[#FBBF24] shadow-[0_6px_20px_rgba(251,191,36,0.35)] flex items-center justify-center text-slate-900">
              <Tag className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2.2] -rotate-12" />
            </div>
            <span className="mt-3 text-xs sm:text-sm font-bold text-slate-800 tracking-tight">
              Instant Savings
            </span>
          </div>

          {/* Card 2: Storewide Valid */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-[#FBBF24] shadow-[0_6px_20px_rgba(251,191,36,0.35)] flex items-center justify-center text-slate-900">
              <Star className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2.2] fill-transparent" />
            </div>
            <span className="mt-3 text-xs sm:text-sm font-bold text-slate-800 tracking-tight">
              Storewide Valid
            </span>
          </div>

          {/* Card 3: Free Shipping */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-[#FBBF24] shadow-[0_6px_20px_rgba(251,191,36,0.35)] flex items-center justify-center text-slate-900">
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2.2]" />
            </div>
            <span className="mt-3 text-xs sm:text-sm font-bold text-slate-800 tracking-tight">
              Free Shipping
            </span>
          </div>

        </div>

      </main>

      <footer className="relative z-10 w-full py-6 px-4 text-center space-y-2 border-t border-slate-100 mt-8 bg-white">
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-slate-500 font-medium">
          <span>Made with love.</span>
          <span className="text-slate-300">•</span>
          
          <button 
            onClick={() => setInfoModalType('verified')}
            className="inline-flex items-center gap-1 text-[#0B4EA2] hover:underline font-semibold cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Verified Offer</span>
          </button>
          
          <span className="text-slate-300">•</span>
          
          <button 
            onClick={() => setInfoModalType('how-it-works')}
            className="text-slate-600 hover:text-slate-900 hover:underline cursor-pointer"
          >
            How It Works
          </button>
          
          <span className="text-slate-300">•</span>
          
          <button 
            onClick={() => setInfoModalType('faq')}
            className="text-slate-600 hover:text-slate-900 hover:underline cursor-pointer"
          >
            FAQ
          </button>
        </div>

        <p className="text-[11px] text-slate-400">
          © Dunkin&apos; Donuts 2025 • Mobile Voucher Portal
        </p>
      </footer>

      {/* Informational Modals (How it works, FAQ, Verified offer) */}
      <InfoModal 
        type={infoModalType} 
        onClose={() => setInfoModalType(null)} 
        onClaimClick={() => {
          setInfoModalType(null);
          startClaimFlow();
        }}
      />
    </div>
  );
}
