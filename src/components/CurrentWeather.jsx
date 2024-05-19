import React from "react";
import useFetch from "../hooks/useFetch";
import WeatherIcon from "./WeatherIcon";
import { FaArrowUp } from "react-icons/fa6";
import { useContext } from "react";
import { CityContext } from "./Home";
import { slugify } from "transliteration";
const CurrentWeather = () => {
  const { city } = useContext(CityContext);

  const { data, error } = useFetch(slugify(city));

  const arrowStyle = {
    transform: `rotate(${data && data.current && data.current.wind_degree}deg)`,
  };

  return (
    <>
      {error && <div>Bład: {error.message}</div>}
      {data && data.current && (
        <div className="md:w-[700px] flex flex-col m-5  mt-[50px] text-white mx-auto shadow-xl rounded-2xl">
          <div className="flex items-center md:w-full justify-center">
            <p className="m-2 text-5xl first-letter:uppercase">{city}</p>
          </div>
          <div className="grid md:grid-cols-2 grid-rows-1">
            <div className="flex mt-2 md:mt-3 items-center ml-5 md:ml-0 md:justify-center">
              <WeatherIcon imagesrc={data.current.condition.icon} size={120} />
              <p className="text-[50px] ml-5">{data.current.temp_c}°C</p>
            </div>
            <div className="flex p-5 flex-col mt-2  md:mt-5 justify-center">
              <div className="flex items-center">
                <p className="ml-5 text-2xl">Wiatr:</p>
                <FaArrowUp size={30} className="ml-5" style={arrowStyle} />
                <p className="ml-5 text-2xl">{data.current.wind_kph} km/h</p>
              </div>
              <div className="mt-3 ml-5 text-2xl">
                <p>Opad: {data.current.precip_mm} mm</p>
                <p className="mt-3">Wilgotność: {data.current.humidity}%</p>
                <p className="mt-3">
                  Ciśnienie: {data.current.pressure_mb} hPa
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CurrentWeather;
