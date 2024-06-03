import React, { useMemo } from "react";
import WeatherIcon from "./WeatherIcon";
import { useContext } from "react";
import { CityContext } from "./Home";

const NextDays = () => {
  const weatherData = useContext(CityContext);

  const dataArr = useMemo(() => {
    return weatherData && weatherData.data?.forecast
      ? [weatherData.data.forecast.forecastday]
      : null;
  }, [weatherData]);

  const nextDaysData =
    dataArr && Array.isArray(dataArr) && dataArr.length > 0
      ? dataArr[0].map((obj, index) => {
          const date = new Date(obj.date);
          const dayOfWeek = date.getDay();
          const days = [
            "Niedziela",
            "Poniedziałek",
            "Wtorek",
            "Środa",
            "Czwartek",
            "Piątek",
            "Sobota",
          ];
          const dayName = days[dayOfWeek];
          return (
            index > 0 && (
              <div key={index}>
                <p className="text-2xl">{dayName}</p>
                <div className="flex flex-col items-center justify-center">
                  <WeatherIcon imagesrc={obj.day.condition.icon} size={90} />
                  <p className="text-2xl text-white ">{obj.day.avgtemp_c}°C</p>
                </div>
              </div>
            )
          );
        })
      : null;

  return (
    <>
      {dataArr && (
        <>
          <div className="flex flex-col w-full md:w-1/2 mt-2 text-white mb-10">
            <h1 className="text-3xl w-full pl-[55px] md:text-blue-400 hidden md:block">
              Pogoda na kolejne dni:
            </h1>
            <div className="grid grid-cols-2 w-full text-center mt-5  px-10 py-2">
              {nextDaysData}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NextDays;
