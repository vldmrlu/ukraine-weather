import { useState, useEffect, useCallback } from 'react';
import { WeatherData, WeatherCondition, Region } from '../types/weather';

// Simulated weather data generator (in real app, this would be an API call)
const generateMockWeather = (region: Region): WeatherData => {
  const conditions: WeatherCondition[] = [
    'sunny', 'partly-cloudy', 'cloudy', 'rainy', 'stormy', 'snowy', 'foggy', 'windy'
  ];
  
  const descriptions: Record<WeatherCondition, string> = {
    'sunny': 'Ясно',
    'partly-cloudy': 'Мінлива хмарність',
    'cloudy': 'Хмарно',
    'rainy': 'Дощ',
    'stormy': 'Гроза',
    'snowy': 'Сніг',
    'foggy': 'Туман',
    'windy': 'Вітряно',
  };

  const windDirections = ['Пн', 'Пн-Сх', 'Сх', 'Пд-Сх', 'Пд', 'Пд-Зх', 'Зх', 'Пн-Зх'];
  
  // Generate realistic temperature based on latitude (northern regions are colder)
  const baseTemp = 15 - (region.lat - 46) * 0.8;
  const tempVariation = Math.random() * 10 - 5;
  const temperature = Math.round((baseTemp + tempVariation) * 10) / 10;
  
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  
  return {
    regionId: region.id,
    temperature,
    feelsLike: Math.round((temperature - 2 + Math.random() * 4) * 10) / 10,
    humidity: Math.floor(40 + Math.random() * 50),
    windSpeed: Math.round((3 + Math.random() * 12) * 10) / 10,
    windDirection: windDirections[Math.floor(Math.random() * windDirections.length)],
    condition,
    description: descriptions[condition],
    pressure: Math.floor(735 + Math.random() * 30),
    visibility: Math.floor(5 + Math.random() * 15),
    updatedAt: new Date(),
  };
};

export const useWeather = (regions: Region[]) => {
  const [weatherData, setWeatherData] = useState<Map<string, WeatherData>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newWeatherData = new Map<string, WeatherData>();
      
      regions.forEach(region => {
        newWeatherData.set(region.id, generateMockWeather(region));
      });
      
      setWeatherData(newWeatherData);
      setLastUpdate(new Date());
    } catch (err) {
      setError('Не вдалося завантажити дані погоди. Спробуйте пізніше.');
    } finally {
      setLoading(false);
    }
  }, [regions]);

  useEffect(() => {
    fetchWeather();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchWeather, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [fetchWeather]);

  return {
    weatherData,
    loading,
    error,
    lastUpdate,
    refresh: fetchWeather,
  };
};
