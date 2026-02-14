import React from 'react';
import { WeatherCondition, WeatherIconProps } from '../types/weather';
import { 
  Sun, 
  Cloud, 
  CloudSun, 
  CloudRain, 
  CloudLightning, 
  Snowflake, 
  CloudFog, 
  Wind,
  LucideIcon
} from 'lucide-react';

const iconMap: Record<WeatherCondition, LucideIcon> = {
  'sunny': Sun,
  'partly-cloudy': CloudSun,
  'cloudy': Cloud,
  'rainy': CloudRain,
  'stormy': CloudLightning,
  'snowy': Snowflake,
  'foggy': CloudFog,
  'windy': Wind,
};

const colorMap: Record<WeatherCondition, string> = {
  'sunny': 'text-yellow-500',
  'partly-cloudy': 'text-orange-400',
  'cloudy': 'text-gray-500',
  'rainy': 'text-blue-500',
  'stormy': 'text-purple-600',
  'snowy': 'text-cyan-400',
  'foggy': 'text-gray-400',
  'windy': 'text-teal-500',
};

export const WeatherIcon: React.FC<WeatherIconProps> = ({ 
  condition, 
  size = 24, 
  className = '' 
}) => {
  const IconComponent = iconMap[condition];
  const colorClass = colorMap[condition];
  
  return (
    <IconComponent 
      size={size} 
      className={`${colorClass} ${className} transition-transform hover:scale-110`} 
    />
  );
};
