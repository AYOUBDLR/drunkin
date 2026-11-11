import React from 'react';

interface RewardStepsProps {
  className?: string;
  compact?: boolean;
}

export const RewardSteps: React.FC<RewardStepsProps> = ({
  className = '',
  compact = false,
}) => {
  const steps = [
    {
      num: '01',
      title: 'Tap "Start promotion" below',
      desc: 'Takes less than 1 minute to begin your experience.',
    },
    {
      num: '02',
      title: 'Select Preference & Confirm Email',
      desc: 'Align your voucher code to your favorite store items.',
    },
    {
      num: '03',
      title: 'Complete 3-4 deals',
      desc: 'Complete 3-4 deals to claim your Target coupon.',
    },
    {
      num: '04',
      title: 'Get Your Unique Code',
      desc: 'Instant unlock with a visual claim voucher barcode.',
    },
  ];

  return (
    <div
      className={`w-full max-w-md mx-auto text-left ${className}`}
      aria-label="Steps to claim your promotion"
    >
      <div className={compact ? 'space-y-3.5' : 'space-y-4 sm:space-y-5'}>
        {steps.map((step) => (
          <div key={step.num} className="flex items-start gap-3.5 sm:gap-4">
            {/* Soft rose circular badge with 01, 02, etc. in Target Red */}
            <div
              className={`${
                compact ? 'w-8 h-8 text-xs' : 'w-9 h-9 sm:w-10 sm:h-10 text-xs sm:text-sm'
              } rounded-full bg-[#FEE2E2] text-[#CC0000] font-black flex items-center justify-center shrink-0 mt-0.5 shadow-2xs select-none`}
            >
              {step.num}
            </div>

            {/* Title & Description */}
            <div className="flex-1 min-w-0">
              <h4
                className={`${
                  compact ? 'text-sm' : 'text-[15px] sm:text-base'
                } font-bold text-[#0F172A] leading-snug tracking-tight`}
              >
                {step.title}
              </h4>
              <p
                className={`${
                  compact ? 'text-[11px]' : 'text-xs sm:text-[13px]'
                } text-[#64748B] mt-0.5 leading-relaxed font-normal`}
              >
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
