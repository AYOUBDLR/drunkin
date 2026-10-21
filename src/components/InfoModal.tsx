import React from 'react';
import { X, CheckCircle2, ShoppingBag, Tag, Sparkles, ShieldCheck, HelpCircle } from 'lucide-react';

interface InfoModalProps {
  type: 'how-it-works' | 'faq' | 'verified' | null;
  onClose: () => void;
  onClaimClick: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ type, onClose, onClaimClick }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-slate-800 transition-all max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FF671F] to-[#DA1A5F] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            {type === 'how-it-works' && <Sparkles className="w-5 h-5 text-amber-200" />}
            {type === 'faq' && <HelpCircle className="w-5 h-5 text-amber-200" />}
            {type === 'verified' && <ShieldCheck className="w-5 h-5 text-emerald-200" />}
            <h3 className="text-base font-bold text-white font-['Outfit',sans-serif]">
              {type === 'how-it-works' && 'How It Works'}
              {type === 'faq' && 'Frequently Asked Questions'}
              {type === 'verified' && "Official Dunkin' Donuts Verified Offer"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-600">
          {type === 'how-it-works' && (
            <div className="space-y-4">
              <p className="text-slate-600">
                Claiming and redeeming your Dunkin&apos; Donuts discount takes less than 30 seconds:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-7 h-7 rounded-full bg-[#FF671F] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    1
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800">Click &quot;Claim Discount&quot;</h5>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Our system reserves a single-use verified promotional voucher code for your device.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-7 h-7 rounded-full bg-[#DA1A5F] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800">Copy or Save Your Code</h5>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Copy your unique code with 1-click or scan the barcode if visiting a participating store or drive-thru.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800">Enjoy Your Savings</h5>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Apply at checkout for fresh brewed coffee, espresso drinks, donuts, Munchkins, and breakfast sandwiches!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {type === 'faq' && (
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <h5 className="font-bold text-slate-800 text-xs sm:text-sm">Is this valid on all Dunkin&apos; items?</h5>
                <p className="text-xs text-slate-500">
                  Yes! The promotional code applies storewide across all popular items including hot & iced coffee, lattes, refresher drinks, donuts, bakery items, and breakfast sandwiches.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <h5 className="font-bold text-slate-800 text-xs sm:text-sm">Can I use it both in the Dunkin&apos; App and in-store?</h5>
                <p className="text-xs text-slate-500">
                  Yes, you can enter the code online in the mobile app at checkout or show the digital voucher barcode to an associate at any participating store or drive-thru.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <h5 className="font-bold text-slate-800 text-xs sm:text-sm">Does the voucher expire?</h5>
                <p className="text-xs text-slate-500">
                  Once generated, your code is reserved for 24 hours to guarantee allocation. Make sure to claim and copy it today.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <h5 className="font-bold text-slate-800 text-xs sm:text-sm">Are there any fees to claim?</h5>
                <p className="text-xs text-slate-500">
                  None whatsoever. The voucher is 100% complimentary and instant.
                </p>
              </div>
            </div>
          )}

          {type === 'verified' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
                <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0" />
                <div>
                  <h5 className="font-bold text-xs sm:text-sm">Official Dunkin&apos; Donuts Verification</h5>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    Security Token: #DD-2025-VCH-99410
                  </p>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-slate-600">
                This promotional offer is provided directly through the official Mobile Voucher Gateway. Every voucher issued is authenticated against the master Dunkin&apos; promotional rewards system.
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <p className="font-bold text-slate-800">✓ 100% Guaranteed</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Authentic store discount</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <p className="font-bold text-slate-800">✓ Device Safe</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Instant single-use code</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Action CTA */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-1.5"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onClaimClick();
            }}
            className="bg-[#0B4EA2] hover:bg-[#093e82] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
          >
            <span>Claim Discount Now</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};
