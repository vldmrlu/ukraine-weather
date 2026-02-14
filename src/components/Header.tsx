import React from 'react';
import { RefreshCw, CloudSun } from 'lucide-react';

interface HeaderProps {
  lastUpdate: Date | null;
  onRefresh: () => void;
  loading: boolean;
}

export const Header: React.FC<HeaderProps> = ({ lastUpdate, onRefresh, loading }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('uk-UA', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <header className="relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-ukraine-yellow blur-xl opacity-50 animate-pulse-slow" />
              <CloudSun size={40} className="relative text-ukraine-yellow" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Погода України
              </h1>
              <p className="text-white/60 text-sm">
                Weather in Ukraine regions
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {lastUpdate && (
              <div className="text-white/50 text-sm hidden sm:block">
                Оновлено: {formatTime(lastUpdate)}
              </div>
            )}
            
            <button
              onClick={onRefresh}
              disabled={loading}
              className={`
                flex items-center gap-2 px-4 py-2
                bg-ukraine-yellow/20 hover:bg-ukraine-yellow/30
                border border-ukraine-yellow/50
                rounded-full text-ukraine-yellow font-medium
                transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:shadow-lg hover:shadow-ukraine-yellow/20
              `}
            >
              <RefreshCw 
                size={18} 
                className={loading ? 'animate-spin' : ''} 
              />
              <span className="hidden sm:inline">Оновити</span>
            </button>
          </div>
        </div>

        {/* Ukraine Flag Decoration */}
        <div className="mt-6 flex justify-center">
          <div className="flex rounded-full overflow-hidden shadow-lg">
            <div className="w-24 h-2 bg-ukraine-blue" />
            <div className="w-24 h-2 bg-ukraine-yellow" />
          </div>
        </div>
      </div>
    </header>
  );
};
