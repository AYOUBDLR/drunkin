import React from 'react';

interface DoodleUnderlineProps {
  className?: string;
  color?: string;
}

export const DoodleUnderline: React.FC<DoodleUnderlineProps> = ({
  className = '',
  color = '#F59E0B',
}) => {
  return (
    <svg
      viewBox="0 0 280 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full overflow-visible ${className}`}
      preserveAspectRatio="none"
    >
      <path
        d="M3 12C45 4 140 3 277 10C210 13 85 15 15 14"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
