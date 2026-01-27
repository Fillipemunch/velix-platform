
import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  textColor?: string;
  variant?: 'light' | 'dark';
}

const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  showText = true, 
  size = 'md', 
  textColor = 'text-white',
  variant = 'light' 
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-5xl',
  };

  const iconPrimary = '#D6825C';
  const iconSecondary = variant === 'light' ? '#FFFFFF' : '#1a2e26';

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={iconSizes[size]}
      >
        {/* Velix "V" Growth Vector */}
        <path d="M20 20L50 80L80 20" stroke={iconSecondary} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M45 45L50 55L55 45" stroke={iconPrimary} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="50" cy="80" r="6" fill={iconPrimary} />
      </svg>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`${textSizes[size]} font-black tracking-tighter ${textColor} uppercase`}>VELIX</span>
          <span className={`text-[7px] md:text-[9px] uppercase tracking-[0.3em] font-extrabold ${variant === 'light' ? 'text-[#D6825C]' : 'text-gray-500'}`}>Based in Copenhagen</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
