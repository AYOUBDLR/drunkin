import React from 'react';

interface TargetLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const TargetLogo: React.FC<TargetLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const iconSize = size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-10 h-10 sm:w-11 sm:h-11' : 'w-8 h-8 sm:w-9 sm:h-9';
  const textSize = size === 'sm' ? 'text-2xl' : size === 'lg' ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl';

  return (
    <div className={`inline-flex items-center justify-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Official Target Bullseye Symbol */}
      <svg
        viewBox="0 0 100 100"
        className={`${iconSize} shrink-0 drop-shadow-xs`}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Target Bullseye"
      >
        <circle cx="50" cy="50" r="50" fill="#CC0000" />
        <circle cx="50" cy="50" r="33.33" fill="#FFFFFF" />
        <circle cx="50" cy="50" r="16.67" fill="#CC0000" />
      </svg>

      {/* Target Wordmark */}
      <span
        className={`text-[#CC0000] font-black tracking-tight lowercase font-['Plus_Jakarta_Sans',sans-serif] leading-none ${textSize}`}
      >
        target
      </span>
    </div>
  );
};
