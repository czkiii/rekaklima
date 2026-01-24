
import React from 'react';

interface Props {
  className?: string;
}

const LeafIllustration: React.FC<Props> = ({ className = "" }) => {
  return (
    <svg 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Hand-drawn style leaf branch based on the provided reference image */}
      <g fill="currentColor">
        {/* Main Stem */}
        <path d="M10 100 C 40 90, 80 80, 110 70" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        
        {/* Top Leaf */}
        <path d="M105 68 C 115 65, 125 75, 110 85 C 100 85, 95 75, 105 68 Z" />
        
        {/* Right Middle Leaf */}
        <path d="M85 75 C 95 72, 105 82, 90 92 C 80 92, 75 82, 85 75 Z" />
        
        {/* Right Bottom Leaf */}
        <path d="M65 82 C 75 79, 85 89, 70 99 C 60 99, 55 89, 65 82 Z" />
        
        {/* Left Top Leaf */}
        <path d="M90 65 C 85 50, 100 45, 105 60 C 105 70, 95 75, 90 65 Z" />
        
        {/* Left Middle Leaf */}
        <path d="M65 72 C 60 57, 75 52, 80 67 C 80 77, 70 82, 65 72 Z" />
        
        {/* Left Bottom Leaf */}
        <path d="M40 80 C 35 65, 50 60, 55 75 C 55 85, 45 90, 40 80 Z" />
        
        {/* Far Bottom Leaf */}
        <path d="M15 92 C 10 77, 25 72, 30 87 C 30 97, 20 102, 15 92 Z" />
      </g>
    </svg>
  );
};

export default LeafIllustration;
