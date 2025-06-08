
import React from 'react';

interface CountryFlagProps {
  countryCode: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const CountryFlag: React.FC<CountryFlagProps> = ({ countryCode, size = 'sm', className = '' }) => {
  const flagEmojis: { [key: string]: string } = {
    'US': '🇺🇸',
    'UK': '🇬🇧',
    'CA': '🇨🇦',
    'AU': '🇦🇺',
    'IN': '🇮🇳',
    'DE': '🇩🇪',
    'FR': '🇫🇷',
    'JP': '🇯🇵',
    'BR': '🇧🇷',
    'MX': '🇲🇽',
    'NG': '🇳🇬',
    'ZA': '🇿🇦',
    'EG': '🇪🇬',
    'KR': '🇰🇷',
    'SG': '🇸🇬'
  };

  const countryNames: { [key: string]: string } = {
    'US': 'United States',
    'UK': 'United Kingdom',
    'CA': 'Canada',
    'AU': 'Australia',
    'IN': 'India',
    'DE': 'Germany',
    'FR': 'France',
    'JP': 'Japan',
    'BR': 'Brazil',
    'MX': 'Mexico',
    'NG': 'Nigeria',
    'ZA': 'South Africa',
    'EG': 'Egypt',
    'KR': 'South Korea',
    'SG': 'Singapore'
  };

  const sizeClasses = {
    sm: 'text-xs w-4 h-4',
    md: 'text-sm w-5 h-5',
    lg: 'text-base w-6 h-6'
  };

  return (
    <div 
      className={`inline-flex items-center justify-center rounded-full bg-slate-700 ${sizeClasses[size]} ${className}`}
      title={countryNames[countryCode] || countryCode}
    >
      <span className="leading-none">{flagEmojis[countryCode] || '🌍'}</span>
    </div>
  );
};

export default CountryFlag;
