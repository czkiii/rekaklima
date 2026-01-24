
import React from 'react';

interface Props {
  className?: string;
  fill?: string;
  flip?: boolean;
}

const WaveDivider: React.FC<Props> = ({ className = "", fill = "#C87941", flip = false }) => {
  return (
    <div className={`w-full leading-[0] ${flip ? 'rotate-180 mb-[-1px]' : 'mt-[-1px]'} ${className}`}>
      <svg 
        viewBox="0 0 1440 120" 
        preserveAspectRatio="none" 
        className="w-full h-[50px] md:h-[100px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Layer 1 - Very faint */}
        <path 
          d="M0,32L60,42.7C120,53,240,75,360,80C480,85,600,75,720,58.7C840,43,960,21,1080,21.3C1200,21,1320,43,1380,53.3L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" 
          fill={fill}
          fillOpacity="0.1"
        />
        {/* Layer 2 - Medium */}
        <path 
          d="M0,64L48,64C96,64,192,64,288,74.7C384,85,480,107,576,106.7C672,107,768,85,864,80C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" 
          fill={fill}
          fillOpacity="0.2"
        />
        {/* Layer 3 - Strongest (base) */}
        <path 
          d="M0,96L80,85.3C160,75,320,53,480,53.3C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" 
          fill={fill}
          fillOpacity="0.3"
        />
      </svg>
    </div>
  );
};

export default WaveDivider;
