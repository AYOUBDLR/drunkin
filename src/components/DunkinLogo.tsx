import React from 'react';

interface DunkinLogoProps {
  className?: string;
  size?: number;
}

export const DunkinLogo: React.FC<DunkinLogoProps> = ({
  className = '',
  size = 114,
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-full bg-white shadow-[0_8px_25px_rgba(255,103,31,0.22)] p-1.5 flex items-center justify-center border-4 border-[#FF671F] ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Top text path */}
          <path
            id="dunkinTopPath"
            d="M 16,50 A 34,34 0 0,1 84,50"
            fill="none"
          />
          {/* Bottom text path */}
          <path
            id="dunkinBottomPath"
            d="M 84,50 A 34,34 0 0,1 16,50"
            fill="none"
          />
        </defs>

        {/* Outer concentric subtle ring */}
        <circle cx="50" cy="50" r="47" fill="none" stroke="#DA1A5F" strokeWidth="1.8" />
        <circle cx="50" cy="50" r="37.5" fill="none" stroke="#FED7AA" strokeWidth="0.8" strokeDasharray="2 2" />

        {/* Top Arc: DUNKIN' DONUTS */}
        <text fill="#FF671F" fontSize="8.2" fontWeight="900" letterSpacing="1.8" textAnchor="middle" fontFamily="'Outfit', sans-serif">
          <textPath href="#dunkinTopPath" startOffset="50%">
            DUNKIN&apos; DONUTS
          </textPath>
        </text>

        {/* Bottom Arc: EST. 1950 */}
        <text fill="#DA1A5F" fontSize="6.8" fontWeight="800" letterSpacing="1.5" textAnchor="middle" fontFamily="'Outfit', sans-serif">
          <textPath href="#dunkinBottomPath" startOffset="50%">
            ★ EST. 1950 ★
          </textPath>
        </text>

        {/* Side Coffee Beans */}
        {/* Left Coffee Bean */}
        <g transform="translate(18, 48) rotate(-20) scale(0.6)">
          <ellipse cx="4" cy="4" rx="4.5" ry="3.5" fill="#6B3A19" />
          <path d="M 1 4 Q 4 1 7 4" fill="none" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" />
        </g>

        {/* Right Coffee Bean */}
        <g transform="translate(76, 48) rotate(20) scale(0.6)">
          <ellipse cx="4" cy="4" rx="4.5" ry="3.5" fill="#6B3A19" />
          <path d="M 1 4 Q 4 1 7 4" fill="none" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" />
        </g>

        {/* Center Circular Disc */}
        <circle cx="50" cy="50" r="23" fill="#FFF7ED" stroke="#FF671F" strokeWidth="1.2" />

        {/* Steaming Coffee Cup with DD branding */}
        {/* Steam Wiggles */}
        <path d="M46 32 Q45 28 47 26" fill="none" stroke="#DA1A5F" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
        <path d="M51 31 Q52 27 50 25" fill="none" stroke="#FF671F" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
        <path d="M56 32 Q55 28 57 26" fill="none" stroke="#DA1A5F" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />

        {/* Cup Lid */}
        <rect x="41" y="34" width="18" height="2.5" rx="1" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.6" />

        {/* Cup Body (Tapered) */}
        <path d="M 42 36.5 L 44.5 59.5 C 44.5 61.5 46.5 63 50 63 C 53.5 63 55.5 61.5 55.5 59.5 L 58 36.5 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />

        {/* Coffee Cup Orange/Pink Sleeve Band */}
        <path d="M 42.8 42 L 57.2 42 L 56.4 53 L 43.6 53 Z" fill="#FF671F" />

        {/* Signature 'DD' letters on cup */}
        {/* Orange D */}
        <text x="46" y="50" fill="#FFFFFF" fontSize="7.5" fontWeight="900" textAnchor="middle" fontFamily="'Outfit', sans-serif">
          D
        </text>
        {/* Pink D */}
        <text x="54" y="50" fill="#DA1A5F" fontSize="7.5" fontWeight="900" textAnchor="middle" fontFamily="'Outfit', sans-serif">
          D
        </text>

        {/* Mini Donut peeking behind cup */}
        <g transform="translate(62, 53) scale(0.7)">
          <circle cx="0" cy="0" r="9" fill="#FBBF24" />
          <circle cx="0" cy="0" r="8" fill="#DA1A5F" />
          <circle cx="0" cy="0" r="3" fill="#FFF7ED" />
          {/* Sprinkles */}
          <line x1="-4" y1="-4" x2="-2" y2="-4" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
          <line x1="3" y1="-3" x2="4" y2="-1" stroke="#FF671F" strokeWidth="1" strokeLinecap="round" />
          <line x1="-3" y1="3" x2="-1" y2="4" stroke="#60A5FA" strokeWidth="1" strokeLinecap="round" />
          <line x1="3" y1="3" x2="4" y2="2" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};
