import React from "react";
import useFetch from "../hooks/useFetch";
import { slugify } from "transliteration";
import WeatherIcon from "./WeatherIcon";
import { FaArrowUp } from "react-icons/fa6";
interface MapMarkerProps {
  city: string;
}
const MapMarker: React.FC<MapMarkerProps> = ({ city }) => {
  const { data: weatherData } = useFetch(slugify(city));
  const arrowStyle = {
    transform: `rotate(${
      weatherData &&
      weatherData.data?.current &&
      weatherData.data?.current.wind_degree
    }deg)`,
  };

  return (
    <>
      {weatherData && weatherData.data?.current && (
        <div className="bg-transparent rounded-sm p-3 m-1 shadow-2xl">
          <p className="w-full bg-slate-400 text-center rounded-md text-black text-xl">
            {city}
          </p>
          <div className="flex flex-col py-6">
            <div className="flex w-full items-center">
              <WeatherIcon
                imagesrc={weatherData.data.current.condition.icon}
                size={100}
              />
              <p className="font-medium text-white md:translate-x-5 text-2xl">
                {weatherData.data.current.temp_c}°C
              </p>
            </div>
            <div className="mt-2 flex flex-col font-medium text-white justify-center items-center">
              <FaArrowUp size={30} className="ml-5" style={arrowStyle} />
              <p className="ml-5 text-2xl">
                {weatherData.data.current.wind_kph} km/h
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MapMarker;
