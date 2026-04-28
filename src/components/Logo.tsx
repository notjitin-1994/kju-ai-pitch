import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center \${className}`}>
      <img src="/logo.png" alt="Smartslate" className="h-8 w-auto" />
    </div>
  );
};
