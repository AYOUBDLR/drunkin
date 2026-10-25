import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';
import { DunkinLogo } from './components/DunkinLogo';
import { InfoModal } from './components/InfoModal';
import { PeelCouponButton } from './components/PeelCouponButton';
import { playChime, playSuccessPop } from './utils/audio';

type ClaimState = 'idle' | 'generating' | 'ready';

export default function App() {
  const [claimState, setClaimState] = useState<ClaimState>('idle');
  const [generationStep, setGenerationStep] = useState<number>(1);
  const [infoModalType, setInfoModalType] = useState<'how-it-works' | 'faq' | 'verified' | null>(null);

  // Generation sequence when claim is clicked
  const startClaimFlow = () => {
    setClaimState('generating');
    setGenerationStep(1);

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

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-[#FFF5ED] via-[#FFF1EB] to-[#FCECE8] overflow-x-hidden flex flex-col justify-between selection:bg-orange-100 selection:text-orange-900 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Main Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-14 text-center">
        
        {/* Dunkin' Donuts Brand Logo */}
        <div className="mb-6 sm:mb-7 flex justify-center">
          <DunkinLogo size={112} />
        </div>

        {/* ======================================================== */}
        {/* STATE 1: IDLE VIEW (Pixel-perfect match to user image)    */}
        {/* ======================================================== */}
        {claimState === 'idle' && (
          <div className="w-full max-w-2xl mx-auto flex flex-col items-center animate-fade-in">
            
            {/* Orange Pill: LIMITED TIME OFFER */}
            <div className="mb-6 sm:mb-8">
              <span className="inline-block bg-[#F26522] text-white text-xs sm:text-sm font-black px-5 sm:px-6 py-2 rounded-full uppercase tracking-wider shadow-sm">
                LIMITED TIME OFFER
              </span>
            </div>

            {/* Brand Title: Dunkin' (Orange) Donuts (Dark Navy) */}
            <h1 className="text-5xl sm:text-6xl md:text-[76px] font-black tracking-tight leading-none">
              <span className="text-[#F26522]">Dunkin&apos;</span>{' '}
              <span className="text-[#191D34]">Donuts</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 sm:mt-6 text-base sm:text-xl text-[#334155] max-w-xl mx-auto leading-relaxed font-normal">
              Claim your exclusive discount today. America runs on Dunkin&apos;.
            </p>

            {/* Red CTA Button: Claim Discount */}
            <div className="mt-8 sm:mt-10">
              <button
                onClick={startClaimFlow}
                className="bg-[#E61937] hover:bg-[#D01430] active:scale-[0.98] text-white font-extrabold text-base sm:text-lg px-9 py-4 rounded-full shadow-[0_8px_25px_rgba(230,25,55,0.32)] hover:shadow-[0_10px_30px_rgba(230,25,55,0.42)] transition-all cursor-pointer"
              >
                Claim Discount
              </button>
            </div>

            {/* Bottom Fine Print */}
            <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-slate-400 font-medium">
              No purchase required. Limited time only.
            </p>

          </div>
        )}

        {/* ======================================================== */}
        {/* STATE 2: GENERATING ALLOCATION                           */}
        {/* ======================================================== */}
        {claimState === 'generating' && (
          <div className="w-full max-w-[500px] bg-white rounded-3xl border border-slate-100 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.08)] py-10 px-6 sm:px-8 flex flex-col items-center text-center space-y-6 animate-fade-in">
            
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

            {/* Checklist Container */}
            <div className="w-full max-w-sm bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-3.5 text-left text-xs sm:text-sm">
              
              {/* Checklist Item 1 */}
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

              {/* Checklist Item 2 */}
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

              {/* Checklist Item 3 */}
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
        {/* STATE 3: READY / VOUCHER UNLOCKED WITH PEELED BUTTON     */}
        {/* ======================================================== */}
        {claimState === 'ready' && (
          <div className="w-full max-w-[500px] bg-white rounded-3xl border border-slate-100 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.08)] py-8 px-6 sm:px-8 space-y-4 animate-fade-in">
            
            {/* Top Badge: Voucher Ready */}
            <div className="flex justify-center -mt-2">
              <div className="bg-[#D1FAE5] border border-[#A7F3D0] text-[#065F46] px-5 py-1.5 rounded-full shadow-sm flex items-center space-x-1.5 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Voucher Ready</span>
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-[28px] font-black text-[#0A2540] tracking-tight">
              Your Discount Voucher is Ready!
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
              Use code at checkout for your <strong className="text-slate-800">Dunkin&apos; Donuts</strong> orders — valid for all purchases today.
            </p>

            {/* Dashed Yellow Coupon Ticket Box with Left & Right Cutout Notches */}
            <div className="relative mt-4 mb-2 p-5 sm:p-6 rounded-2xl border-2 border-dashed border-[#FBBF24] bg-[#FFFDF0]/80">
              
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

              {/* Peel Coupon Button: Show Coupon Code */}
              <div className="flex items-center justify-center my-2">
                <PeelCouponButton href={REDIRECT_URL} />
              </div>

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
                  <span className="text-xs">🕒</span>
                  <span>Valid For 24 Hours</span>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* Footer Section */}
      <footer className="relative z-10 w-full py-6 px-4 text-center space-y-2 border-t border-orange-200/40 bg-white/30 backdrop-blur-xs">
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-slate-500 font-medium">
          <span>Made with love.</span>
          <span className="text-slate-300">•</span>
          
          <button 
            onClick={() => setInfoModalType('verified')}
            className="inline-flex items-center gap-1 text-[#E61937] hover:underline font-semibold cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#E61937]" />
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
