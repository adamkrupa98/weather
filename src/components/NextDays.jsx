import React, { useState, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import WeatherIcon from "./WeatherIcon";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useEffect } from "react";

const NextDays = ({ city }) => {
  const { data, error } = useFetch(city);

  const dataArr = useMemo(() => {
    return data && data.forecast ? [data.forecast.forecastday] : null;
  }, [data]);
  const [notificationCreated] = useState(false);

  useEffect(() => {
    if (data && !dataArr && !notificationCreated) {
      createNotification();
    }
  }, [data, dataArr, notificationCreated]);

  const createNotification = () => {
    return NotificationManager.error(
      "Takie miasto nie istnieje!",
      "Błąd",
      2000
    );
  };
  return (
    <>
      {error && <div>Błąd...{error.message}</div>}
      {dataArr && (
        <>
          <div className="flex flex-col w-full md:w-1/2 mt-2 text-white mb-10">
            <h1 className="text-3xl w-full pl-[55px] md:text-blue-400 hidden md:block">
              Pogoda na kolejne dni:
            </h1>
            <div className="md:grid md:grid-cols-2 w-full text-center mt-5 grid-cols-4 hidden px-10 py-2">
              {dataArr[0].map((obj, index) => {
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
                        <WeatherIcon
                          imagesrc={obj.day.condition.icon}
                          size={90}
                        />
                        <p className="text-2xl text-white ">
                          {obj.day.avgtemp_c}°C
                        </p>
                      </div>
                    </div>
                  )
                );
              })}
            </div>
            <div className="grid grid-cols-2 mt-10 w-full text-center md:hidden">
              {dataArr[0].slice(0, 5).map((obj, index) => {
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
                        <WeatherIcon
                          imagesrc={obj.day.condition.icon}
                          size={90}
                        />
                        <p className="text-2xl text-white ">
                          {obj.day.avgtemp_c}°C
                        </p>
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NextDays;
