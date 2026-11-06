import React, { useState } from 'react';
import badgeLogoSrc from '../assets/images/badge_circulaire_logo.png';

interface DrinkDiscountLogoProps {
  className?: string;
  size?: number;
}

export const DrinkDiscountLogo: React.FC<DrinkDiscountLogoProps> = ({
  className = '',
  size = 130,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-full shadow-[0_12px_36px_rgba(242,101,34,0.30)] flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105 ${className}`}
    >
      {!imageError ? (
        <img
          src={badgeLogoSrc}
          alt="Drink Discount Official Logo"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== '/assets/badge_circulaire_logo.png') {
              target.src = '/assets/badge_circulaire_logo.png';
            } else {
              setImageError(true);
            }
          }}
          className="w-full h-full object-cover scale-[1.03] select-none pointer-events-none rounded-full"
        />
      ) : (
        /* High-fidelity Vector Fallback */
        <div className="w-full h-full rounded-full bg-[#181C2E] flex flex-col items-center justify-center p-3 text-white">
          <svg
            viewBox="0 0 100 120"
            className="w-12 h-12 select-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 57 32 L 57 14 Q 57 8 63 6 L 78 2"
              fill="none"
              stroke="#E61937"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="18"
              y="30"
              width="64"
              height="9"
              rx="3"
              fill="#FFFFFF"
            />
            <path
              d="M 21 40 L 29 104 Q 30 110 36 110 L 64 110 Q 70 110 71 104 L 79 40 Z"
              fill="#F26522"
            />
          </svg>
          <span className="text-[10px] font-black tracking-wider text-white mt-1">DRINK</span>
          <span className="text-[8px] font-extrabold tracking-wider text-[#F26522]">DISCOUNT</span>
        </div>
      )}
    </div>
  );
};
