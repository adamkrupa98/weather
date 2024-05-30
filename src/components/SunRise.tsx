import React from "react";
import { BsSunrise } from "react-icons/bs";
import { BsSunset } from "react-icons/bs";
import { format } from "date-fns";
import { useContext } from "react";
import { CityContext } from "./Home";

const SunRise = () => {
  const { data } = useContext(CityContext);
  const sunrise =
    data && data.forecast ? data.forecast.forecastday[0].astro.sunrise : null;
  const sunset =
    data && data.forecast ? data.forecast.forecastday[0].astro.sunset : null;

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const date = new Date(`01/01/2000 ${timeString}`); // Tworzenie daty zgodnie z oczekiwanym formatem
    return format(date, "HH:mm"); // Konwersja daty do formatu HH:mm
  };

  return (
    <>
      {data && data.current && (
        <div className="felx flex-col md:w-1/2 w-full mt-2">
          <h1 className="text-3xl w-full pl-[55px] md:text-blue-400 hidden md:block">
            Wschód i zachód:
          </h1>
          <div className="flex items-center h-[220px] justify-between px-10">
            <div className="flex flex-col items-center">
              <p className="text-white text-2xl md:hidden">Wschód</p>
              <BsSunrise size={120} className="text-[#e4f155]" />
              <p className="text-2xl text-white justify-center">
                {formatTime(sunrise)}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-white text-2xl md:hidden">Zachód</p>
              <BsSunset size={120} className="text-[#efdf4b]" />
              <p className="text-2xl text-white ">{formatTime(sunset)}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SunRise;
