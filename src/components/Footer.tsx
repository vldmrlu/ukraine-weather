import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 mt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Divider */}
        <div className="flex items-center justify-center mb-8">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent w-full max-w-xs" />
          <div className="mx-4 w-2 h-2 bg-ukraine-yellow rounded-full" />
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent w-full max-w-xs" />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/50 text-sm">
          <div className="flex items-center gap-1">
            <span>Зроблено з</span>
            <Heart size={14} className="text-red-500 fill-red-500" />
            <span>для України</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">
              Дані оновлюються кожні 5 хвилин
            </span>
          </div>

          <div className="text-center sm:text-right">
            <p>© {new Date().getFullYear()} Ukraine Weather</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
