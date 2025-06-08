
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
    'PY': '🇵🇾'
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
    'PY': 'Paraguay'
  };

  const sizeClasses = {
    sm: 'text-xs w-4 h-4',
    md: 'text-sm w-6 h-6',
    lg: 'text-base w-8 h-8'
  };

  // Get flag emoji, fallback to a default flag if country not found
  const flagEmoji = flagEmojis[countryCode] || '🏳️';

  return (
    <div 
      className={`inline-flex items-center justify-center rounded-full bg-slate-600/50 backdrop-blur-sm border border-slate-500/20 ${sizeClasses[size]} ${className}`}
      title={countryNames[countryCode] || countryCode}
    >
      <span className="leading-none">{flagEmoji}</span>
    </div>
  );
};

export default CountryFlag;
