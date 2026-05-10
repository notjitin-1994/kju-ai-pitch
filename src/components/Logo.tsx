import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <motion.div 
      className={`flex items-center \${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img 
        src="/logo.png" 
        alt="Smartslate" 
        className="h-9 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(167,218,219,0.4)]" 
      />
    </motion.div>
  );
};
