
import React from 'react';

interface Props {
  className?: string;
}

const LeafIllustration: React.FC<Props> = ({ className = "" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <path 
        d="M50 90C50 90 40 70 40 50C40 30 50 10 50 10C50 10 60 30 60 50C60 70 50 90 50 90Z" 
        fill="currentColor" 
        fillOpacity="0.8"
      />
      <path 
        d="M40 70C25 70 15 55 15 40C15 25 25 10 40 10C40 10 30 25 30 40C30 55 40 70 40 70Z" 
        fill="currentColor" 
        fillOpacity="0.5"
      />
      <path 
        d="M60 70C75 70 85 55 85 40C85 25 75 10 60 10C60 10 70 25 70 40C70 55 60 70 60 70Z" 
        fill="currentColor" 
        fillOpacity="0.5"
      />
      <circle cx="50" cy="50" r="2" fill="currentColor" />
    </svg>
  );
};

export default LeafIllustration;
