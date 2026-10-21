import React from 'react';

interface DunkinDonutIconProps {
  className?: string;
  color?: 'pink' | 'orange';
  size?: number;
  rotation?: number;
  opacity?: number;
}

export const DunkinDonutIcon: React.FC<DunkinDonutIconProps> = ({
  className = '',
  color = 'pink',
  size = 32,
  rotation = 0,
  opacity = 0.8,
}) => {
  const frostingColor = color === 'pink' ? '#F472B6' : '#FB923C';
  const doughColor = '#FDE68A';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      style={{
        transform: `rotate(${rotation}deg)`,
        opacity,
      }}
      className={`select-none pointer-events-none transition-transform duration-700 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Golden Dough Base */}
      <circle cx="20" cy="20" r="17" fill={doughColor} stroke="#F59E0B" strokeWidth="1" />
      {/* Glaze Frosting */}
      <path
        d="M20 5 C28 5 35 11 35 20 C35 24 33 26 31 25 C29 24 28 27 26 28 C23 30 22 34 20 35 C14 35 5 28 5 20 C5 12 12 5 20 5 Z"
        fill={frostingColor}
      />
      {/* Center Donut Hole */}
      <circle cx="20" cy="20" r="6.5" fill="#F8FAFC" stroke="#F59E0B" strokeWidth="0.8" />
      {/* Colorful Sprinkles */}
      <line x1="12" y1="12" x2="15" y2="10" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="25" y1="11" x2="28" y2="13" stroke="#FF671F" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="27" y1="26" x2="30" y2="24" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10" y1="23" x2="13" y2="24" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};
