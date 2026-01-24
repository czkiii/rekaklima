
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <img 
      src="/assets/logos/rekaklima_logo.svg" 
      alt="Klima Design Logo" 
      className={className}
    />
  );
};

export default Logo;
