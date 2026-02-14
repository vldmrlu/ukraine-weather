import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative w-20 h-20">
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
        {/* Spinning arc */}
        <div className="absolute inset-0 border-4 border-transparent border-t-ukraine-yellow border-r-ukraine-blue rounded-full animate-spin" />
        {/* Inner glow */}
        <div className="absolute inset-2 bg-gradient-to-br from-ukraine-blue/20 to-ukraine-yellow/20 rounded-full animate-pulse" />
      </div>
      <p className="mt-6 text-white/60 animate-pulse">
        Завантаження погоди...
      </p>
    </div>
  );
};
