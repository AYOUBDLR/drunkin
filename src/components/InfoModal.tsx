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
        {/* Header */}
        <div className="bg-gradient-to-r from-[#CC0000] to-[#B30000] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            {type === 'how-it-works' && <Sparkles className="w-5 h-5 text-amber-200" />}
            {type === 'faq' && <HelpCircle className="w-5 h-5 text-amber-200" />}
            {type === 'verified' && <ShieldCheck className="w-5 h-5 text-emerald-200" />}
            <h3 className="text-base font-bold text-white font-['Outfit',sans-serif]">
              {type === 'how-it-works' && 'How It Works'}
              {type === 'faq' && 'Frequently Asked Questions'}
              {type === 'verified' && 'Official Target Promo Verification'}
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
                Claiming and redeeming your Target $500 Promo Code takes less than 1 minute:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-7 h-7 rounded-full bg-[#CC0000] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    1
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800">Tap &quot;Start promotion&quot; below</h5>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Takes less than 1 minute to begin your experience.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-7 h-7 rounded-full bg-[#CC0000] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800">Select Preference & Confirm Email</h5>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Align your voucher code to your favorite store items.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-7 h-7 rounded-full bg-[#0B1E3F] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800">Complete 3-4 deals</h5>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Complete 3-4 deals to claim your Target coupon.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    4
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800">Get Your Unique Code</h5>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Instant unlock with a visual claim voucher barcode.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {type === 'faq' && (
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <h5 className="font-bold text-slate-800 text-xs sm:text-sm">What can I use this code for?</h5>
                <p className="text-xs text-slate-500">
                  The promo code applies storewide across all Target items including groceries, apparel, home essentials, electronics, beauty, and daily necessities.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <h5 className="font-bold text-slate-800 text-xs sm:text-sm">Can I use it online and in-store?</h5>
                <p className="text-xs text-slate-500">
                  Yes, you can enter the code online at Target.com checkout or scan the digital barcode voucher in-store at any Target register.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <h5 className="font-bold text-slate-800 text-xs sm:text-sm">Does the promo code expire?</h5>
                <p className="text-xs text-slate-500">
                  Once issued, your code is reserved for 24 hours to guarantee allocation. Make sure to claim and use it today.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <h5 className="font-bold text-slate-800 text-xs sm:text-sm">Are there any fees to claim?</h5>
                <p className="text-xs text-slate-500">
                  None whatsoever. Participating in the promotion is 100% complimentary.
                </p>
              </div>
            </div>
          )}

          {type === 'verified' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
                <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0" />
                <div>
                  <h5 className="font-bold text-xs sm:text-sm">Official Target Verification</h5>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    Security Token: #TGT-2025-PRM-500
                  </p>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-slate-600">
                This promotional offer is provided directly through the official Mobile Voucher Gateway. Every voucher issued is authenticated against the master promotional rewards network.
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
            className="bg-[#CC0000] hover:bg-[#B30000] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <span>Start Promotion Now</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};
