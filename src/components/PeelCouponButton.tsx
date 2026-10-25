import React, { useState } from 'react';

interface PeelCouponButtonProps {
  href: string;
  onClick?: () => void;
  className?: string;
}

export const PeelCouponButton: React.FC<PeelCouponButtonProps> = ({
  href,
  onClick,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative inline-block transition-transform active:scale-[0.98] select-none no-underline cursor-pointer ${className}`}
      title="Click to redirect and claim discount"
    >
      {/* Outer White Container with 2px Solid Black Border and Rounded Corners */}
      <div className="bg-white border-2 border-black rounded-lg p-1 sm:p-1.5 shadow-sm group-hover:shadow-md transition-shadow">
        
        {/* Inner Button Canvas matching the uploaded reference image */}
        <div className="relative w-[235px] sm:w-[265px] h-[52px] sm:h-[58px]">
          <svg
            viewBox="0 0 265 58"
            className="w-full h-full overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Main Blue Capsule Body with Peeled Top-Right Notch */}
            <path
              d="
                M 29,0
                L 205,0
                C 205,10 216,22 236,25
                L 236,29
                C 236,45 223,58 207,58
                L 29,58
                C 13,58 0,45 0,29
                C 0,13 13,0 29,0
                Z
              "
              fill="#2276F6"
              className="transition-colors group-hover:fill-[#1C68DC]"
            />

            {/* Peeled Corner Sticker Flap (Light Blue Underside) */}
            <g
              className="transition-transform duration-200"
              style={{
                transformOrigin: '220px 12px',
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              {/* Flap Body */}
              <path
                d="
                  M 205,0
                  C 205,11 216,22 236,25
                  L 236,12
                  C 230,5 218,1 205,0
                  Z
                "
                fill="#72D0FA"
              />

              {/* Fold highlight line */}
              <path
                d="M 205,0 C 205,11 216,22 236,25"
                fill="none"
                stroke="#4DB7F5"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </g>

            {/* White Bold Label: Show Coupon Code */}
            <text
              x="118"
              y="36"
              fill="#FFFFFF"
              fontSize="17.5"
              fontWeight="800"
              fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
              textAnchor="middle"
              className="select-none pointer-events-none tracking-tight"
            >
              Show Coupon Code
            </text>
          </svg>
        </div>

      </div>
    </a>
  );
};
