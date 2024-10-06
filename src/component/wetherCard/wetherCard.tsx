import React, { useState, useEffect } from 'react';
import axios from 'axios'; // You need to install axios
import { FaTemperatureHigh, FaWind, FaTint } from 'react-icons/fa'; // Weather icons

const WeatherCard: React.FC<{ city: string }> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch weather data from OpenWeatherMap
  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f0a0657645fbb58602c03f661e6f1bff&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]); // Add city as a dependency, so it fetches new data if the city changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!weatherData) {
    return <div>No data available</div>;
  }

  // Destructure necessary data from weatherData
  const { main, wind, weather } = weatherData;
  const temperature = main.temp;
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  const weatherCondition = weather[0].main;
  const weatherIcon = weather[0].icon;

  return (
    <div className='w-full  flex justify-center items-center min-h-screen '>
    <div className="max-w-xs p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 ">
      <div className="text-xl font-bold text-center">{city}</div>
      <div className="flex justify-center my-4">
        <img
          src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
          alt={weatherCondition}
        />
      </div>
      <div className="text-2xl font-bold text-center">
        {Math.round(temperature)}°C
      </div>
      <div className="text-center">{weatherCondition}</div>
      <div className="flex justify-around mt-4 space-x-5">
        <div className="flex flex-col items-center">
          <FaTint className="text-blue-500" />
          <span>{humidity}%</span>
        </div>
        <div className="flex flex-col items-center">
          <FaWind className="text-gray-500" />
          <span>{windSpeed} km/h</span>
        </div>
        <div className="flex flex-col items-center">
          <FaTemperatureHigh className="text-red-500" />
          <span>{temperature}°C</span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default WeatherCard;
