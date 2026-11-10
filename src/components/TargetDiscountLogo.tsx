import React from 'react';

interface TargetDiscountLogoProps {
  className?: string;
  size?: number;
}

export const TargetDiscountLogo: React.FC<TargetDiscountLogoProps> = ({
  className = '',
  size = 120,
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-full bg-white shadow-[0_14px_38px_rgba(204,0,0,0.22)] p-2.5 flex items-center justify-center border-2 border-red-100 transition-transform duration-300 hover:scale-105 ${className}`}
      title="Target Discount"
    >
      {/* Target Official Proportions Bullseye */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full select-none drop-shadow-[0_2px_6px_rgba(204,0,0,0.15)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Red Ring */}
        <circle cx="50" cy="50" r="50" fill="#CC0000" />
        {/* Inner White Ring */}
        <circle cx="50" cy="50" r="33.33" fill="#FFFFFF" />
        {/* Center Red Bullseye */}
        <circle cx="50" cy="50" r="16.67" fill="#CC0000" />
      </svg>
    </div>
  );
};
