import React, { useState, useMemo } from 'react';
import { Region } from '../types/weather';
import { Search, X, MapPin } from 'lucide-react';

interface SearchBarProps {
  regions: Region[];
  onSelectRegion: (regionId: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ regions, onSelectRegion }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const filteredRegions = useMemo(() => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    return regions.filter(
      region => 
        region.name.toLowerCase().includes(lowerQuery) ||
        region.nameEn.toLowerCase().includes(lowerQuery) ||
        region.capital.toLowerCase().includes(lowerQuery)
    ).slice(0, 5);
  }, [query, regions]);

  const handleSelect = (regionId: string) => {
    onSelectRegion(regionId);
    setQuery('');
    setIsFocused(false);
  };

  return (
    <div className="relative max-w-md mx-auto mb-8">
      <div className={`
        relative flex items-center
        bg-white/10 backdrop-blur-md
        border border-white/20 rounded-2xl
        transition-all duration-300
        ${isFocused ? 'ring-2 ring-ukraine-yellow border-ukraine-yellow/50' : ''}
      `}>
        <Search size={20} className="absolute left-4 text-white/50" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Пошук регіону..."
          className="
            w-full py-3 pl-12 pr-10
            bg-transparent text-white
            placeholder:text-white/40
            focus:outline-none
          "
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 text-white/50 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {filteredRegions.length > 0 && isFocused && (
        <div className="
          absolute top-full left-0 right-0 mt-2
          bg-gray-900/95 backdrop-blur-lg
          border border-white/20 rounded-xl
          shadow-2xl overflow-hidden z-50
          animate-slide-up
        ">
          {filteredRegions.map((region) => (
            <button
              key={region.id}
              onClick={() => handleSelect(region.id)}
              className="
                w-full flex items-center gap-3 px-4 py-3
                text-left text-white
                hover:bg-ukraine-blue/30
                transition-colors border-b border-white/5 last:border-0
              "
            >
              <MapPin size={16} className="text-ukraine-yellow flex-shrink-0" />
              <div>
                <p className="font-medium">{region.name}</p>
                <p className="text-sm text-white/50">{region.capital}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
