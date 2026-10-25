import React, { useState } from 'react';

interface DunkinLogoProps {
  className?: string;
  size?: number;
}

export const DunkinLogo: React.FC<DunkinLogoProps> = ({
  className = '',
  size = 114,
}) => {
  const [hasError, setHasError] = useState(false);
  const logoUrl = 'https://i.postimg.cc/g0P3YYtX/d56d1de5c1ce1482ac191e0bc8c78303.jpg';

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-full bg-white shadow-[0_8px_25px_rgba(255,103,31,0.22)] p-1 flex items-center justify-center border-4 border-[#FF671F] overflow-hidden ${className}`}
    >
      {!hasError ? (
        <img
          src={logoUrl}
          alt="Dunkin' Donuts Logo"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover rounded-full select-none pointer-events-none"
        />
      ) : (
        <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center p-2 text-center">
          <span className="font-extrabold text-[#FF671F] text-sm leading-tight tracking-tight">DUNKIN&apos;</span>
          <span className="font-extrabold text-[#DA1A5F] text-xs leading-tight">DONUTS</span>
        </div>
      )}
    </div>
  );
};
