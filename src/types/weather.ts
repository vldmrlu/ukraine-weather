export interface Region {
  id: string;
  name: string;
  nameEn: string;
  capital: string;
  lat: number;
  lon: number;
}

export interface WeatherData {
  regionId: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  condition: WeatherCondition;
  description: string;
  pressure: number;
  visibility: number;
  updatedAt: Date;
}

export type WeatherCondition = 
  | 'sunny'
  | 'partly-cloudy'
  | 'cloudy'
  | 'rainy'
  | 'stormy'
  | 'snowy'
  | 'foggy'
  | 'windy';

export interface WeatherIconProps {
  condition: WeatherCondition;
  size?: number;
  className?: string;
}
