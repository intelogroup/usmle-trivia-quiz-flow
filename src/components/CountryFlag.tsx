import React from 'react';

interface CountryFlagProps {
  countryCode: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const CountryFlag: React.FC<CountryFlagProps> = ({ countryCode, size = 'sm', className = '' }) => {
  const flagStyles: { [key: string]: React.CSSProperties } = {
    'US': { background: 'linear-gradient(to bottom, #dc2626 0%, #dc2626 35%, #ffffff 35%, #ffffff 65%, #2563eb 65%)' },
    'UK': { background: 'linear-gradient(45deg, #1e40af 30%, #ffffff 30%, #ffffff 50%, #dc2626 50%, #dc2626 70%, #ffffff 70%)' },
    'CA': { background: 'linear-gradient(to right, #dc2626 0%, #dc2626 30%, #ffffff 30%, #ffffff 70%, #dc2626 70%)' },
    'AU': { backgroundColor: '#1e40af' },
    'IN': { background: 'linear-gradient(to bottom, #f97316 33%, #ffffff 33%, #ffffff 67%, #16a34a 67%)' },
    'DE': { background: 'linear-gradient(to bottom, #000000 33%, #dc2626 33%, #dc2626 67%, #facc15 67%)' },
    'FR': { background: 'linear-gradient(to right, #2563eb 33%, #ffffff 33%, #ffffff 67%, #dc2626 67%)' },
    'JP': { backgroundColor: '#ffffff' },
    'BR': { backgroundColor: '#16a34a' },
    'MX': { background: 'linear-gradient(to right, #16a34a 33%, #ffffff 33%, #ffffff 67%, #dc2626 67%)' },
    'NG': { background: 'linear-gradient(to right, #16a34a 33%, #ffffff 33%, #ffffff 67%, #16a34a 67%)' },
    'ZA': { backgroundColor: '#16a34a' },
    'EG': { background: 'linear-gradient(to bottom, #dc2626 33%, #ffffff 33%, #ffffff 67%, #000000 67%)' },
    'KR': { backgroundColor: '#ffffff' },
    'SG': { background: 'linear-gradient(to bottom, #dc2626 50%, #ffffff 50%)' },
    'CN': { backgroundColor: '#dc2626' },
    'RU': { background: 'linear-gradient(to bottom, #ffffff 33%, #2563eb 33%, #2563eb 67%, #dc2626 67%)' },
    'IT': { background: 'linear-gradient(to right, #16a34a 33%, #ffffff 33%, #ffffff 67%, #dc2626 67%)' },
    'ES': { background: 'linear-gradient(to bottom, #dc2626 25%, #facc15 25%, #facc15 75%, #dc2626 75%)' },
    'NL': { background: 'linear-gradient(to bottom, #dc2626 33%, #ffffff 33%, #ffffff 67%, #2563eb 67%)' },
    'SE': { backgroundColor: '#2563eb' },
    'NO': { backgroundColor: '#dc2626' },
    'DK': { backgroundColor: '#dc2626' },
    'FI': { backgroundColor: '#ffffff' },
    'CH': { backgroundColor: '#dc2626' },
    'AT': { background: 'linear-gradient(to bottom, #dc2626 33%, #ffffff 33%, #ffffff 67%, #dc2626 67%)' },
    'BE': { background: 'linear-gradient(to right, #000000 33%, #facc15 33%, #facc15 67%, #dc2626 67%)' },
    'PT': { background: 'linear-gradient(to right, #16a34a 40%, #dc2626 40%)' },
    'IE': { background: 'linear-gradient(to right, #16a34a 33%, #ffffff 33%, #ffffff 67%, #f97316 67%)' },
    'GR': { backgroundColor: '#2563eb' },
    'TR': { backgroundColor: '#dc2626' },
    'IL': { backgroundColor: '#ffffff' },
    'SA': { backgroundColor: '#16a34a' },
    'AE': { background: 'linear-gradient(to bottom, #dc2626 33%, #ffffff 33%, #ffffff 67%, #000000 67%)' },
    'PH': { background: 'linear-gradient(to bottom, #2563eb 50%, #dc2626 50%)' },
    'TH': { background: 'linear-gradient(to bottom, #dc2626 20%, #ffffff 20%, #ffffff 40%, #2563eb 40%, #2563eb 60%, #ffffff 60%, #ffffff 80%, #dc2626 80%)' },
    'VN': { backgroundColor: '#dc2626' },
    'MY': { backgroundColor: '#2563eb' },
    'ID': { background: 'linear-gradient(to bottom, #dc2626 50%, #ffffff 50%)' },
    'PK': { backgroundColor: '#16a34a' },
    'BD': { backgroundColor: '#16a34a' },
    'LK': { backgroundColor: '#f97316' },
    'AR': { backgroundColor: '#60a5fa' },
    'CL': { backgroundColor: '#2563eb' },
    'CO': { backgroundColor: '#facc15' },
    'PE': { backgroundColor: '#dc2626' },
    'VE': { backgroundColor: '#facc15' },
    'UY': { backgroundColor: '#60a5fa' },
    'EC': { backgroundColor: '#facc15' },
    'BO': { background: 'linear-gradient(to bottom, #dc2626 33%, #facc15 33%, #facc15 67%, #16a34a 67%)' },
    'PY': { background: 'linear-gradient(to bottom, #dc2626 33%, #ffffff 33%, #ffffff 67%, #2563eb 67%)' },
    'PL': { background: 'linear-gradient(to bottom, #ffffff 50%, #dc2626 50%)' },
    'CZ': { backgroundColor: '#2563eb' },
    'HU': { background: 'linear-gradient(to bottom, #dc2626 33%, #ffffff 33%, #ffffff 67%, #16a34a 67%)' },
    'RO': { backgroundColor: '#2563eb' },
    'HR': { background: 'linear-gradient(to bottom, #dc2626 33%, #ffffff 33%, #ffffff 67%, #2563eb 67%)' },
    'BG': { backgroundColor: '#ffffff' },
    'LT': { backgroundColor: '#facc15' },
    'LV': { backgroundColor: '#dc2626' },
    'EE': { backgroundColor: '#2563eb' },
    'SK': { backgroundColor: '#ffffff' },
    'SI': { backgroundColor: '#ffffff' },
    'LU': { backgroundColor: '#60a5fa' },
    'MT': { backgroundColor: '#ffffff' },
    'CY': { backgroundColor: '#ffffff' }
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
  const flagStyle = flagStyles[countryCode] || { backgroundColor: '#2563eb' };

  // Special handling for flags that need borders or symbols
  const needsBorder = ['JP', 'KR', 'IL', 'FI', 'BG', 'SK', 'SI', 'MT', 'CY'].includes(countryCode);
  const borderClass = needsBorder ? 'border-2 border-slate-400' : '';

  return (
    <div 
      className={`inline-flex items-center justify-center rounded-full shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl hover:scale-105 ${sizeClasses[size]} ${borderClass} ${className}`}
      style={flagStyle}
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
