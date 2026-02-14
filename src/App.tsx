import React, { useState, useRef } from 'react';
import { 
  Header, 
  Footer, 
  WeatherCard, 
  SearchBar, 
  LoadingSpinner, 
  ErrorMessage 
} from './components';
import { ukraineRegions } from './data/regions';
import { useWeather } from './hooks/useWeather';

const App: React.FC = () => {
  const { weatherData, loading, error, lastUpdate, refresh } = useWeather(ukraineRegions);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const handleSelectRegion = (regionId: string) => {
    setSelectedRegion(regionId);
    
    // Scroll to selected region card
    const cardElement = cardRefs.current.get(regionId);
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Ukraine flag gradient overlay */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-ukraine-blue/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-ukraine-yellow/5 to-transparent" />
        
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ukraine-blue/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-ukraine-yellow/10 rounded-full blur-3xl animate-pulse-slow animation-delay-500" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header 
          lastUpdate={lastUpdate} 
          onRefresh={refresh} 
          loading={loading} 
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SearchBar 
            regions={ukraineRegions} 
            onSelectRegion={handleSelectRegion} 
          />

          {loading && !weatherData.size ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} onRetry={refresh} />
          ) : (
            <>
              {/* Stats Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <StatSummary 
                  label="Регіонів" 
                  value={ukraineRegions.length.toString()} 
                />
                <StatSummary 
                  label="Макс. температура" 
                  value={`${Math.max(...Array.from(weatherData.values()).map(w => w.temperature))}°C`} 
                />
                <StatSummary 
                  label="Мін. температура" 
                  value={`${Math.min(...Array.from(weatherData.values()).map(w => w.temperature))}°C`} 
                />
                <StatSummary 
                  label="Середня вологість" 
                  value={`${Math.round(Array.from(weatherData.values()).reduce((a, b) => a + b.humidity, 0) / weatherData.size)}%`} 
                />
              </div>

              {/* Weather Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {ukraineRegions.map((region, index) => (
                  <div
                    key={region.id}
                    ref={(el) => {
                      if (el) cardRefs.current.set(region.id, el);
                    }}
                    style={{ animationDelay: `${index * 50}ms` }}
                    className="animate-slide-up"
                  >
                    <WeatherCard
                      region={region}
                      weather={weatherData.get(region.id)}
                      isSelected={selectedRegion === region.id}
                      onClick={() => setSelectedRegion(
                        selectedRegion === region.id ? null : region.id
                      )}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
};

// Summary stat component
interface StatSummaryProps {
  label: string;
  value: string;
}

const StatSummary: React.FC<StatSummaryProps> = ({ label, value }) => (
  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
    <p className="text-white/50 text-sm mb-1">{label}</p>
    <p className="text-white text-xl font-bold">{value}</p>
  </div>
);

export default App;
