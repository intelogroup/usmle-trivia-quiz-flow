
import React from 'react';

interface CountryFlagProps {
  countryCode: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const CountryFlag: React.FC<CountryFlagProps> = ({ countryCode, size = 'sm', className = '' }) => {
  const flagStyles: { [key: string]: string } = {
    'US': 'bg-gradient-to-b from-red-600 via-white to-blue-600',
    'UK': 'bg-gradient-to-br from-blue-800 via-white to-red-600',
    'CA': 'bg-gradient-to-r from-red-600 via-white to-red-600',
    'AU': 'bg-gradient-to-br from-blue-800 via-red-600 to-blue-800',
    'IN': 'bg-gradient-to-b from-orange-500 via-white to-green-600',
    'DE': 'bg-gradient-to-b from-black via-red-600 to-yellow-400',
    'FR': 'bg-gradient-to-r from-blue-600 via-white to-red-600',
    'JP': 'bg-white border-red-600',
    'BR': 'bg-gradient-to-br from-green-600 via-yellow-400 to-blue-600',
    'MX': 'bg-gradient-to-r from-green-600 via-white to-red-600',
    'NG': 'bg-gradient-to-r from-green-600 via-white to-green-600',
    'ZA': 'bg-gradient-to-br from-green-600 via-yellow-400 to-blue-600',
    'EG': 'bg-gradient-to-b from-red-600 via-white to-black',
    'KR': 'bg-gradient-to-br from-white via-red-600 to-blue-600',
    'SG': 'bg-gradient-to-b from-red-600 to-white',
    'CN': 'bg-red-600',
    'RU': 'bg-gradient-to-b from-white via-blue-600 to-red-600',
    'IT': 'bg-gradient-to-r from-green-600 via-white to-red-600',
    'ES': 'bg-gradient-to-b from-red-600 via-yellow-400 to-red-600',
    'NL': 'bg-gradient-to-b from-red-600 via-white to-blue-600',
    'SE': 'bg-gradient-to-br from-blue-600 via-yellow-400 to-blue-600',
    'NO': 'bg-gradient-to-br from-red-600 via-white to-blue-600',
    'DK': 'bg-gradient-to-br from-red-600 via-white to-red-600',
    'FI': 'bg-gradient-to-br from-white via-blue-600 to-white',
    'CH': 'bg-red-600',
    'AT': 'bg-gradient-to-b from-red-600 via-white to-red-600',
    'BE': 'bg-gradient-to-r from-black via-yellow-400 to-red-600',
    'PT': 'bg-gradient-to-r from-green-600 to-red-600',
    'IE': 'bg-gradient-to-r from-green-600 via-white to-orange-500',
    'GR': 'bg-gradient-to-b from-blue-600 via-white to-blue-600',
    'TR': 'bg-red-600',
    'IL': 'bg-gradient-to-b from-blue-600 via-white to-blue-600',
    'SA': 'bg-green-600',
    'AE': 'bg-gradient-to-b from-red-600 via-white to-black',
    'PH': 'bg-gradient-to-b from-blue-600 to-red-600',
    'TH': 'bg-gradient-to-b from-red-600 via-white to-blue-600',
    'VN': 'bg-red-600',
    'MY': 'bg-gradient-to-b from-red-600 via-white to-blue-600',
    'ID': 'bg-gradient-to-b from-red-600 to-white',
    'PK': 'bg-gradient-to-r from-green-600 to-white',
    'BD': 'bg-green-600',
    'LK': 'bg-gradient-to-b from-orange-500 via-green-600 to-red-600',
    'AR': 'bg-gradient-to-b from-blue-400 via-white to-blue-400',
    'CL': 'bg-gradient-to-br from-blue-600 via-white to-red-600',
    'CO': 'bg-gradient-to-b from-yellow-400 via-blue-600 to-red-600',
    'PE': 'bg-gradient-to-r from-red-600 via-white to-red-600',
    'VE': 'bg-gradient-to-b from-yellow-400 via-blue-600 to-red-600',
    'UY': 'bg-gradient-to-b from-blue-400 via-white to-blue-400',
    'EC': 'bg-gradient-to-b from-yellow-400 via-blue-600 to-red-600',
    'BO': 'bg-gradient-to-b from-red-600 via-yellow-400 to-green-600',
    'PY': 'bg-gradient-to-b from-red-600 via-white to-blue-600',
    'PL': 'bg-gradient-to-b from-white to-red-600',
    'CZ': 'bg-gradient-to-b from-white via-red-600 to-blue-600',
    'HU': 'bg-gradient-to-b from-red-600 via-white to-green-600',
    'RO': 'bg-gradient-to-r from-blue-600 via-yellow-400 to-red-600',
    'HR': 'bg-gradient-to-b from-red-600 via-white to-blue-600',
    'BG': 'bg-gradient-to-b from-white via-green-600 to-red-600',
    'LT': 'bg-gradient-to-b from-yellow-400 via-green-600 to-red-600',
    'LV': 'bg-gradient-to-b from-red-600 via-white to-red-600',
    'EE': 'bg-gradient-to-b from-blue-600 via-black to-white',
    'SK': 'bg-gradient-to-b from-white via-blue-600 to-red-600',
    'SI': 'bg-gradient-to-b from-white via-blue-600 to-red-600',
    'LU': 'bg-gradient-to-b from-red-600 via-white to-blue-400',
    'MT': 'bg-gradient-to-r from-white to-red-600',
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

  // Get flag style, fallback to gray if country not found
  const flagStyle = flagStyles[countryCode] || 'bg-gray-500';

  return (
    <div 
      className={`inline-flex items-center justify-center rounded-full shadow-lg border-2 border-white/90 overflow-hidden transition-all duration-200 hover:shadow-xl hover:scale-105 hover:border-white ${sizeClasses[size]} ${flagStyle} ${className}`}
      title={countryNames[countryCode] || countryCode}
    >
      {/* Special elements for some flags that need symbols */}
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
    </div>
  );
};

export default CountryFlag;
