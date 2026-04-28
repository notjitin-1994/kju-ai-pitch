import React, { useState, useEffect, useRef } from 'react';

interface ScalingContainerProps {
  children: React.ReactNode;
}

export const ScalingContainer: React.FC<ScalingContainerProps> = ({ children }) => {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Target resolution: 1920x1080 (16:9)
      // We subtract some space for the header/footer (20px each ~ 40px total height reduction if we want perfect fit)
      // But actually, we want the slide AREA to scale. 
      // Let's assume the slides are designed for 1920x1080.
      
      const availableWidth = width * 0.95; // 5% padding
      const availableHeight = height * 0.75; // Account for header/footer/padding
      
      const scaleX = availableWidth / 1920;
      const scaleY = availableHeight / 1080;
      
      setScale(Math.min(scaleX, scaleY, 1.5)); // Max scale 1.5 to prevent blurriness
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <div 
        ref={containerRef}
        style={{
          width: '1920px',
          height: '1080px',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.2s ease-out',
        }}
        className="shrink-0 flex items-center justify-center"
      >
        {children}
      </div>
    </div>
  );
};
