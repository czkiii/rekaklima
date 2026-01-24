
import React, { useEffect, useState } from 'react';

interface Props {
  className?: string;
  flip?: boolean;
  fill?: string;
  stretch?: boolean;
}

const WaveDivider: React.FC<Props> = ({ className = "", flip = false, stretch = false }) => {
  const [svgContent, setSvgContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/assets/divider.svg')
      .then(res => res.text())
      .then(content => {
        setSvgContent(content);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div className={`w-full ${className}`} style={{ aspectRatio: '4820.5 / 562.3' }} />;
  }

  return (
    <div 
      className={`w-full leading-[0] ${flip ? 'rotate-180 mb-[-1px]' : 'mt-[-1px]'} ${className}`}
      style={{ aspectRatio: '4820.5 / 562.3' }}
    >
      {svgContent && (
        <svg 
          viewBox="0 0 4820.5 562.3" 
          preserveAspectRatio={stretch ? "none" : "xMidYMid slice"}
          className="w-full h-full"
          style={{ display: 'block' }}
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      )}
    </div>
  );
};

export default WaveDivider;
