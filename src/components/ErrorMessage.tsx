import React from 'react';
import { CloudOff } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-red-500 blur-xl opacity-30" />
        <CloudOff size={64} className="relative text-red-400" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">
        Помилка завантаження
      </h3>
      <p className="text-white/60 text-center mb-6 max-w-md">
        {message}
      </p>
      <button
        onClick={onRetry}
        className="
          px-6 py-3 bg-ukraine-blue hover:bg-ukraine-blue/80
          text-white font-medium rounded-xl
          transition-all duration-300
          hover:shadow-lg hover:shadow-ukraine-blue/30
        "
      >
        Спробувати знову
      </button>
    </div>
  );
};
