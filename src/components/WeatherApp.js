import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Wind, Droplets, Eye, Thermometer, Sun, Cloud, CloudRain, CloudSnow, Zap } from 'lucide-react';
import { getWeatherData } from '../services/weatherService';
import './WeatherApp.css';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [city, setCity] = useState('London');

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError('');
    setWeatherData(null); // Clear previous weather data
    try {
      const data = await getWeatherData(cityName);
      setWeatherData(data);
      setError(''); // Clear any previous errors
    } catch (err) {
      setError(err.message || 'City not found. Please try again.');
      setWeatherData(null); // Ensure weather data is cleared on error
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  const getWeatherIcon = (main) => {
    switch (main?.toLowerCase()) {
      case 'clear':
        return <Sun className="weather-icon" size={80} />;
      case 'clouds':
        return <Cloud className="weather-icon" size={80} />;
      case 'rain':
        return <CloudRain className="weather-icon" size={80} />;
      case 'snow':
        return <CloudSnow className="weather-icon" size={80} />;
      case 'thunderstorm':
        return <Zap className="weather-icon" size={80} />;
      default:
        return <Cloud className="weather-icon" size={80} />;
    }
  };

  const getBackgroundGradient = (main) => {
    switch (main?.toLowerCase()) {
      case 'clear':
        return 'linear-gradient(-45deg, #ff006e, #ff4081, #8338ec, #3a86ff)';
      case 'clouds':
        return 'linear-gradient(-45deg, #ff006e, #8338ec, #3a86ff, #ff4081)';
      case 'rain':
        return 'linear-gradient(-45deg, #8338ec, #3a86ff, #ff006e, #ff4081)';
      case 'snow':
        return 'linear-gradient(-45deg, #3a86ff, #8338ec, #ff006e, #ff4081)';
      case 'thunderstorm':
        return 'linear-gradient(-45deg, #ff006e, #8338ec, #3a86ff, #ff4081)';
      default:
        return 'linear-gradient(-45deg, #ff006e, #8338ec, #3a86ff, #ff4081)';
    }
  };

  return (
    <motion.div 
      className="weather-container"
      style={{ background: weatherData ? getBackgroundGradient(weatherData.weather[0].main) : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="glass-card"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-box">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search city..."
              className="search-input"
            />
            <button type="submit" className="search-btn">
              Search
            </button>
          </div>
        </form>

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="loading"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="spinner"
              />
              <p>Loading weather data...</p>
            </motion.div>
          )}

          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="error"
            >
              {error}
            </motion.div>
          )}

          {weatherData && !loading && (
            <motion.div
              key="weather"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="weather-content"
            >
              <div className="location">
                <MapPin className="location-icon" size={24} />
                <h2>{weatherData.name}, {weatherData.sys.country}</h2>
              </div>

              <motion.div 
                className="weather-main"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="weather-icon-container">
                  {getWeatherIcon(weatherData.weather[0].main)}
                </div>
                <div className="temp-container">
                  <h1>{Math.round(weatherData.main.temp)}°C</h1>
                  <p className="description">{weatherData.weather[0].description}</p>
                </div>
              </motion.div>

              <motion.div 
                className="weather-details"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="detail-card">
                  <Thermometer className="detail-icon" />
                  <span>Feels like</span>
                  <strong>{Math.round(weatherData.main.feels_like)}°C</strong>
                </div>
                <div className="detail-card">
                  <Droplets className="detail-icon" />
                  <span>Humidity</span>
                  <strong>{weatherData.main.humidity}%</strong>
                </div>
                <div className="detail-card">
                  <Wind className="detail-icon" />
                  <span>Wind</span>
                  <strong>{weatherData.wind.speed} m/s</strong>
                </div>
                <div className="detail-card">
                  <Eye className="detail-icon" />
                  <span>Visibility</span>
                  <strong>{weatherData.visibility / 1000} km</strong>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default WeatherApp;
