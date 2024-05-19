import React from "react";
import useFetch from "../hooks/useFetch";
import { slugify } from "transliteration";
import WeatherIcon from "./WeatherIcon";
import { FaArrowUp } from "react-icons/fa6";

const MapMarker = ({ city, xval, yval }) => {
  const { data } = useFetch(slugify(city), "current");
  const arrowStyle = {
    transform: `rotate(${data && data.current && data.current.wind_degree}deg)`,
  };

  return (
    <>
      {data && data.current && (
        <div className="bg-transparent  rounded-sm p-3 m-1 shadow-2xl">
          <p className="w-full bg-slate-400 text-center rounded-md text-black text-xl">
            {city}
          </p>
          <div className="flex flex-col r py-6">
            <div className="flex w-full items-center">
              <WeatherIcon imagesrc={data.current.condition.icon} size={100} />
              <p className="font-medium text-white translate-x-10 text-2xl">
                {data.current.temp_c}°C
              </p>
            </div>
            <div className="flex font-medium text-white justify-center">
              <FaArrowUp size={30} className="ml-5" style={arrowStyle} />
              <p className="ml-5 text-2xl">{data.current.wind_kph} km/h</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MapMarker;
