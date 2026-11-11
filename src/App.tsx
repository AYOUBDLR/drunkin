import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { TargetLogo } from './components/TargetLogo';
import { RewardSteps } from './components/RewardSteps';
import { InfoModal } from './components/InfoModal';
import { PeelCouponButton } from './components/PeelCouponButton';
import { playChime, playSuccessPop } from './utils/audio';

type ClaimState = 'idle' | 'generating' | 'ready';

export default function App() {
  const [claimState, setClaimState] = useState<ClaimState>('idle');
  const [generationStep, setGenerationStep] = useState<number>(1);
  const [infoModalType, setInfoModalType] = useState<'how-it-works' | 'faq' | 'verified' | null>(null);

  const REDIRECT_URL = 'https://linkthem.net/?offer_id=317&aff_id=144361';

  // Interactive generation sequence if user triggers preview flow
  const startClaimFlow = () => {
    setClaimState('generating');
    setGenerationStep(1);
    playSuccessPop();

    // Step 1: Checking promotional availability
    const t1 = setTimeout(() => {
      setGenerationStep(2);
    }, 700);

    // Step 2: Validating Target promo code
    const t2 = setTimeout(() => {
      setGenerationStep(3);
    }, 1500);

    // Step 3: Complete & Transition to "Your Promo Code is Ready!"
    const t3 = setTimeout(() => {
      setClaimState('ready');
      playChime();
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#CC0000', '#FF3B30', '#38BDF8', '#FCD34D', '#10B981'],
      });
    }, 2300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-[#FFF7F7] via-[#FFF1F1] to-[#FDECEC] overflow-x-hidden flex flex-col justify-between selection:bg-red-100 selection:text-red-900 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Main Container */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-14 text-center">
        
        {/* Top: Official Target Brand Logotype (matching reference position) */}
        <div className="mb-7 sm:mb-9 flex justify-center">
          <TargetLogo size="lg" />
        </div>

        {/* ======================================================== */}
        {/* STATE 1: EXACT MATCH TO USER REFERENCE FOR TARGET        */}
        {/* ======================================================== */}
        {claimState === 'idle' && (
          <div className="w-full max-w-[490px] mx-auto bg-[#FFF5F5] rounded-[32px] sm:rounded-[36px] p-6 sm:p-9 border border-red-100 shadow-[0_20px_50px_rgba(204,0,0,0.06)] flex flex-col items-center animate-fade-in">
            
            {/* Top Pill: 634+ Users Claimed Today with Green Active Dot */}
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 sm:px-5 py-1.5 sm:py-2 shadow-[0_2px_8px_rgba(204,0,0,0.06)] border border-red-100/80">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-xs sm:text-sm font-bold text-[#0F172A] tracking-tight">
                634+ Users Claimed Today
              </span>
            </div>

            {/* Headline Section */}
            <div className="mt-5 sm:mt-6 text-center">
              <p className="text-base sm:text-lg font-bold text-[#334155] tracking-tight">
                Get up to a
              </p>
              <h1 className="mt-1 text-4xl sm:text-[46px] font-black tracking-tight leading-none text-[#0F172A]">
                <span className="text-[#CC0000] italic font-black mr-2 sm:mr-2.5">$500</span>
                <span className="text-[#0B1E3F]">Promo Code</span>
              </h1>
            </div>

            {/* 4 Steps Section matching reference */}
            <div className="mt-7 sm:mt-8 w-full">
              <RewardSteps />
            </div>

            {/* CTA Button: Start promotion → */}
            <div className="mt-7 sm:mt-8 w-full">
              <a
                href={REDIRECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playSuccessPop}
                className="w-full bg-[#CC0000] hover:bg-[#B30000] active:scale-[0.98] text-white font-bold text-base sm:text-lg py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(204,0,0,0.32)] hover:shadow-[0_10px_28px_rgba(204,0,0,0.42)] transition-all no-underline cursor-pointer"
                title="Start promotion and claim your Target code"
              >
                <span>Start promotion</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </a>
            </div>

            {/* Interactive Simulation Option for testing full flow */}
            <div className="mt-4">
              <button
                onClick={startClaimFlow}
                className="text-xs font-semibold text-[#CC0000] hover:text-[#B30000] hover:underline cursor-pointer transition-colors"
              >
                Preview verification sequence
              </button>
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* STATE 2: GENERATING ALLOCATION                           */}
        {/* ======================================================== */}
        {claimState === 'generating' && (
          <div className="w-full max-w-[490px] mx-auto bg-white rounded-[32px] sm:rounded-[36px] border border-red-100 shadow-[0_20px_60px_-15px_rgba(204,0,0,0.10)] py-10 px-6 sm:px-8 flex flex-col items-center text-center space-y-6 animate-fade-in">
            
            {/* Circular soft red spinner */}
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-red-50/80 border-4 border-red-100 flex items-center justify-center" />
              <svg 
                className="absolute inset-0 w-20 h-20 animate-spin text-[#CC0000]" 
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
              <h2 className="text-2xl sm:text-[26px] font-black text-[#0B1E3F] tracking-tight">
                Generating Target Promo Code
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Allocating verified $500 promotion to your browser session...
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
                  Checking promotional eligibility
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
                    <div className="w-4 h-4 rounded-full border-2 border-slate-300 border-t-[#CC0000] animate-spin" />
                  )}
                </div>
                <span className={generationStep >= 2 ? 'font-semibold text-emerald-900/90' : 'text-slate-400 font-medium'}>
                  Generating secure Target barcode
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
                  Validating $500 Target voucher
                </span>
              </div>

            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* STATE 3: READY / VOUCHER UNLOCKED WITH PEELED BUTTON     */}
        {/* ======================================================== */}
        {claimState === 'ready' && (
          <div className="w-full max-w-[490px] mx-auto bg-white rounded-[32px] sm:rounded-[36px] border border-red-100 shadow-[0_20px_60px_-15px_rgba(204,0,0,0.10)] py-8 px-6 sm:px-8 space-y-4 animate-fade-in">
            
            {/* Top Badge: Voucher Ready */}
            <div className="flex justify-center -mt-2">
              <div className="bg-[#D1FAE5] border border-[#A7F3D0] text-[#065F46] px-5 py-1.5 rounded-full shadow-sm flex items-center space-x-1.5 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>$500 Voucher Ready</span>
              </div>
            </div>

            {/* Heading */}
            <div className="flex flex-col items-center justify-center gap-1">
              <h2 className="text-2xl sm:text-[28px] font-black text-[#0B1E3F] tracking-tight">
                Your Promo Code is Ready!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                Use code at checkout for your <strong className="text-slate-800">Target</strong> orders — valid in-store & online today.
              </p>
            </div>

            {/* Dashed Yellow Coupon Ticket Box with Left & Right Cutout Notches */}
            <div className="relative mt-4 mb-2 p-5 sm:p-6 rounded-2xl border-2 border-dashed border-[#FBBF24] bg-[#FFFDF0]/80">
              
              {/* Left Ticket Notch */}
              <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full border-r-2 border-dashed border-[#FBBF24]" />
              
              {/* Right Ticket Notch */}
              <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full border-l-2 border-dashed border-[#FBBF24]" />

              {/* Top Ticket Pill: SINGLE-USE VERIFIED PROMOTIONAL CODE */}
              <div className="inline-block mb-3">
                <span className="bg-[#FEF3C7] text-[#B45309] text-[10px] sm:text-[11px] font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-2xs">
                  Single-Use Verified Promotional Code
                </span>
              </div>

              {/* 4-Step Instructions inside ticket */}
              <div className="mb-4 bg-white/95 rounded-xl p-3.5 border border-amber-200/60 shadow-2xs">
                <RewardSteps compact={true} />
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

            {/* Back button */}
            <div className="pt-2">
              <button
                onClick={() => setClaimState('idle')}
                className="text-xs text-slate-400 hover:text-slate-600 font-semibold cursor-pointer"
              >
                ← Back to promotion overview
              </button>
            </div>

          </div>
        )}

      </main>

      {/* Footer Section */}
      <footer className="relative z-10 w-full py-6 px-4 text-center space-y-2 border-t border-red-200/40 bg-white/40 backdrop-blur-xs">
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-slate-500 font-medium">
          <span>Made with love.</span>
          <span className="text-slate-300">•</span>
          
          <button 
            onClick={() => setInfoModalType('verified')}
            className="inline-flex items-center gap-1 text-[#CC0000] hover:underline font-semibold cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#CC0000]" />
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
          © Target 2025 • Mobile Promotion Portal
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
