
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
    'SG': '🇸🇬',
    'CN': '🇨🇳',
    'RU': '🇷🇺',
    'IT': '🇮🇹',
    'ES': '🇪🇸',
    'NL': '🇳🇱',
    'SE': '🇸🇪',
    'NO': '🇳🇴',
    'DK': '🇩🇰',
    'FI': '🇫🇮',
    'CH': '🇨🇭',
    'AT': '🇦🇹',
    'BE': '🇧🇪',
    'PT': '🇵🇹',
    'IE': '🇮🇪',
    'GR': '🇬🇷',
    'TR': '🇹🇷',
    'IL': '🇮🇱',
    'SA': '🇸🇦',
    'AE': '🇦🇪',
    'PH': '🇵🇭',
    'TH': '🇹🇭',
    'VN': '🇻🇳',
    'MY': '🇲🇾',
    'ID': '🇮🇩',
    'PK': '🇵🇰',
    'BD': '🇧🇩',
    'LK': '🇱🇰',
    'AR': '🇦🇷',
    'CL': '🇨🇱',
    'CO': '🇨🇴',
    'PE': '🇵🇪',
    'VE': '🇻🇪',
    'UY': '🇺🇾',
    'EC': '🇪🇨',
    'BO': '🇧🇴',
    'PY': '🇵🇾',
    'PL': '🇵🇱',
    'CZ': '🇨🇿',
    'HU': '🇭🇺',
    'RO': '🇷🇴',
    'HR': '🇭🇷',
    'BG': '🇧🇬',
    'LT': '🇱🇹',
    'LV': '🇱🇻',
    'EE': '🇪🇪',
    'SK': '🇸🇰',
    'SI': '🇸🇮',
    'LU': '🇱🇺',
    'MT': '🇲🇹',
    'CY': '🇨🇾'
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
    sm: 'w-5 h-5 text-xs',
    md: 'w-7 h-7 text-sm',
    lg: 'w-10 h-10 text-lg'
  };

  // Get flag emoji, fallback to a default flag if country not found
  const flagEmoji = flagEmojis[countryCode] || '🏳️';

  return (
    <div 
      className={`inline-flex items-center justify-center rounded-full bg-white shadow-lg border-2 border-gray-200 overflow-hidden ${sizeClasses[size]} ${className}`}
      title={countryNames[countryCode] || countryCode}
    >
      <span className="leading-none select-none">{flagEmoji}</span>
    </div>
  );
};

export default CountryFlag;
