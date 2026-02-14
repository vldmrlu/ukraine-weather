import React from 'react';
import { Region, WeatherData } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';
import { 
  Droplets, 
  Wind, 
  Gauge, 
  Eye, 
  Thermometer,
  MapPin 
} from 'lucide-react';

interface WeatherCardProps {
  region: Region;
  weather: WeatherData | undefined;
  isSelected: boolean;
  onClick: () => void;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ 
  region, 
  weather, 
  isSelected,
  onClick 
}) => {
  if (!weather) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 animate-pulse">
        <div className="h-6 bg-white/20 rounded w-3/4 mb-4"></div>
        <div className="h-12 bg-white/20 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-white/20 rounded w-full"></div>
      </div>
    );
  }

  const tempColor = weather.temperature < 0 
    ? 'text-cyan-300' 
    : weather.temperature < 10 
      ? 'text-blue-300' 
      : weather.temperature < 20 
        ? 'text-green-300' 
        : weather.temperature < 30 
          ? 'text-orange-300' 
          : 'text-red-400';

  return (
    <div 
      onClick={onClick}
      className={`
        relative overflow-hidden cursor-pointer
        bg-gradient-to-br from-white/15 to-white/5 
        backdrop-blur-md rounded-2xl p-6
        border border-white/20
        transition-all duration-300 ease-out
        hover:scale-[1.02] hover:shadow-2xl hover:border-white/40
        ${isSelected ? 'ring-2 ring-ukraine-yellow shadow-lg shadow-ukraine-yellow/20' : ''}
        animate-fade-in
      `}
    >
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full pointer-events-none" />
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MapPin size={14} className="text-ukraine-yellow" />
            <h3 className="font-semibold text-white text-lg leading-tight">
              {region.name}
            </h3>
          </div>
          <p className="text-white/60 text-sm">{region.capital}</p>
        </div>
        <WeatherIcon condition={weather.condition} size={48} />
      </div>

      {/* Temperature */}
      <div className="flex items-baseline gap-2 mb-4">
        <span className={`text-5xl font-bold ${tempColor}`}>
          {weather.temperature > 0 ? '+' : ''}{weather.temperature}
        </span>
        <span className="text-2xl text-white/70">°C</span>
      </div>

      {/* Condition */}
      <p className="text-white/80 font-medium mb-4 capitalize">
        {weather.description}
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatItem 
          icon={<Thermometer size={16} />} 
          label="Відчувається" 
          value={`${weather.feelsLike > 0 ? '+' : ''}${weather.feelsLike}°`} 
        />
        <StatItem 
          icon={<Droplets size={16} />} 
          label="Вологість" 
          value={`${weather.humidity}%`} 
        />
        <StatItem 
          icon={<Wind size={16} />} 
          label="Вітер" 
          value={`${weather.windSpeed} м/с ${weather.windDirection}`} 
        />
        <StatItem 
          icon={<Gauge size={16} />} 
          label="Тиск" 
          value={`${weather.pressure} мм`} 
        />
      </div>

      {/* Visibility (shown on hover/selected) */}
      {isSelected && (
        <div className="mt-4 pt-4 border-t border-white/10 animate-slide-up">
          <StatItem 
            icon={<Eye size={16} />} 
            label="Видимість" 
            value={`${weather.visibility} км`} 
          />
        </div>
      )}
    </div>
  );
};

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, label, value }) => (
  <div className="flex items-center gap-2 text-white/70">
    <span className="text-ukraine-yellow">{icon}</span>
    <div className="flex flex-col">
      <span className="text-xs text-white/50">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  </div>
);
