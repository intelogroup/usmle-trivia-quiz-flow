
import React from 'react';

interface CountryFlagProps {
  countryCode: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const CountryFlag: React.FC<CountryFlagProps> = ({ countryCode, size = 'sm', className = '' }) => {
  const flagStyles: { [key: string]: string } = {
    'US': 'bg-gradient-to-b from-red-500 via-white to-blue-600',
    'UK': 'bg-gradient-to-br from-blue-700 via-white to-red-500',
    'CA': 'bg-gradient-to-r from-red-500 via-white to-red-500',
    'AU': 'bg-blue-700',
    'IN': 'bg-gradient-to-b from-orange-500 via-white to-green-600',
    'DE': 'bg-gradient-to-b from-black via-red-600 to-yellow-400',
    'FR': 'bg-gradient-to-r from-blue-600 via-white to-red-500',
    'JP': 'bg-white',
    'BR': 'bg-green-600',
    'MX': 'bg-gradient-to-r from-green-600 via-white to-red-500',
    'NG': 'bg-gradient-to-r from-green-600 via-white to-green-600',
    'ZA': 'bg-green-600',
    'EG': 'bg-gradient-to-b from-red-500 via-white to-black',
    'KR': 'bg-white',
    'SG': 'bg-gradient-to-b from-red-500 to-white',
    'CN': 'bg-red-600',
    'RU': 'bg-gradient-to-b from-white via-blue-600 to-red-500',
    'IT': 'bg-gradient-to-r from-green-600 via-white to-red-500',
    'ES': 'bg-gradient-to-b from-red-500 via-yellow-400 to-red-500',
    'NL': 'bg-gradient-to-b from-red-500 via-white to-blue-600',
    'SE': 'bg-blue-600',
    'NO': 'bg-red-600',
    'DK': 'bg-red-600',
    'FI': 'bg-white',
    'CH': 'bg-red-600',
    'AT': 'bg-gradient-to-b from-red-500 via-white to-red-500',
    'BE': 'bg-gradient-to-r from-black via-yellow-400 to-red-500',
    'PT': 'bg-gradient-to-r from-green-600 to-red-500',
    'IE': 'bg-gradient-to-r from-green-600 via-white to-orange-500',
    'GR': 'bg-blue-600',
    'TR': 'bg-red-600',
    'IL': 'bg-white',
    'SA': 'bg-green-600',
    'AE': 'bg-gradient-to-b from-red-500 via-white to-black',
    'PH': 'bg-gradient-to-b from-blue-600 to-red-500',
    'TH': 'bg-gradient-to-b from-red-500 via-white to-blue-600',
    'VN': 'bg-red-600',
    'MY': 'bg-blue-600',
    'ID': 'bg-gradient-to-b from-red-500 to-white',
    'PK': 'bg-green-600',
    'BD': 'bg-green-600',
    'LK': 'bg-orange-500',
    'AR': 'bg-blue-400',
    'CL': 'bg-blue-600',
    'CO': 'bg-yellow-400',
    'PE': 'bg-red-500',
    'VE': 'bg-yellow-400',
    'UY': 'bg-blue-400',
    'EC': 'bg-yellow-400',
    'BO': 'bg-gradient-to-b from-red-500 via-yellow-400 to-green-600',
    'PY': 'bg-gradient-to-b from-red-500 via-white to-blue-600',
    'PL': 'bg-gradient-to-b from-white to-red-500',
    'CZ': 'bg-blue-600',
    'HU': 'bg-gradient-to-b from-red-500 via-white to-green-600',
    'RO': 'bg-blue-600',
    'HR': 'bg-gradient-to-b from-red-500 via-white to-blue-600',
    'BG': 'bg-white',
    'LT': 'bg-yellow-400',
    'LV': 'bg-red-500',
    'EE': 'bg-blue-600',
    'SK': 'bg-white',
    'SI': 'bg-white',
    'LU': 'bg-blue-400',
    'MT': 'bg-white',
    'CY': 'bg-white'
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
    'SG': 'Singapore',
    'CN': 'China',
    'RU': 'Russia',
    'IT': 'Italy',
    'ES': 'Spain',
    'NL': 'Netherlands',
    'SE': 'Sweden',
    'NO': 'Norway',
    'DK': 'Denmark',
    'FI': 'Finland',
    'CH': 'Switzerland',
    'AT': 'Austria',
    'BE': 'Belgium',
    'PT': 'Portugal',
    'IE': 'Ireland',
    'GR': 'Greece',
    'TR': 'Turkey',
    'IL': 'Israel',
    'SA': 'Saudi Arabia',
    'AE': 'United Arab Emirates',
    'PH': 'Philippines',
    'TH': 'Thailand',
    'VN': 'Vietnam',
    'MY': 'Malaysia',
    'ID': 'Indonesia',
    'PK': 'Pakistan',
    'BD': 'Bangladesh',
    'LK': 'Sri Lanka',
    'AR': 'Argentina',
    'CL': 'Chile',
    'CO': 'Colombia',
    'PE': 'Peru',
    'VE': 'Venezuela',
    'UY': 'Uruguay',
    'EC': 'Ecuador',
    'BO': 'Bolivia',
    'PY': 'Paraguay',
    'PL': 'Poland',
    'CZ': 'Czech Republic',
    'HU': 'Hungary',
    'RO': 'Romania',
    'HR': 'Croatia',
    'BG': 'Bulgaria',
    'LT': 'Lithuania',
    'LV': 'Latvia',
    'EE': 'Estonia',
    'SK': 'Slovakia',
    'SI': 'Slovenia',
    'LU': 'Luxembourg',
    'MT': 'Malta',
    'CY': 'Cyprus'
  };

  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-10 h-10'
  };

  // Get flag style, fallback to a bright color if country not found
  const flagStyle = flagStyles[countryCode] || 'bg-blue-500';

  // Special handling for flags that need borders or symbols
  const needsBorder = ['JP', 'KR', 'IL', 'FI', 'BG', 'SK', 'SI', 'MT', 'CY'].includes(countryCode);
  const borderClass = needsBorder ? 'border-2 border-slate-400' : '';

  return (
    <div 
      className={`inline-flex items-center justify-center rounded-full shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl hover:scale-105 ${sizeClasses[size]} ${flagStyle} ${borderClass} ${className}`}
      title={countryNames[countryCode] || countryCode}
    >
      {/* Special symbols for some flags */}
      {countryCode === 'JP' && (
        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
      )}
      {countryCode === 'CN' && (
        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-sm"></div>
      )}
      {countryCode === 'CH' && (
        <div className="text-white text-xs font-bold">+</div>
      )}
      {countryCode === 'TR' && (
        <div className="text-white text-xs">☪</div>
      )}
      {countryCode === 'BR' && (
        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
      )}
    </div>
  );
};

export default CountryFlag;
