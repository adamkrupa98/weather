import React from "react";
import useFetch from "../hooks/useFetch";
import WeatherIcon from "./WeatherIcon";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HouersForecast = ({ city }) => {
  const { data, error } = useFetch(city, "current");
  const dataArr =
    data && data.forecast ? [data.forecast.forecastday[0].hour] : null;
  let dataSelectedHouers = [];
  if (dataArr) {
    dataSelectedHouers = dataArr[0].filter((hour, index) => {
      return index % 3 === 0 && index > 4;
    });
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };
  return (
    <>
      {error && <div>Błąd pobierania danych - {error.message}</div>}
      <div className="w-full">
        {dataSelectedHouers.length > 0 && (
          <>
            <h1 className="text-3xl w-full h-auto pl-[55px] text-white md:text-blue-400 hidden md:block">
              Pogoda godzinowa:
            </h1>
            <div className="w-10/12 mx-auto mt-5 md:hidden">
              <Slider {...settings}>
                {dataSelectedHouers.map((el, index) => {
                  let date = new Date(el.time);
                  let houer = date.getHours();
                  return (
                    <div
                      className="flex flex-col items-center justify-center text-white text-center"
                      key={index}
                    >
                      <div className="text-center text-2xl w-full">
                        {houer}:00
                      </div>
                      <div className="w-full flex justify-center">
                        <WeatherIcon size={90} imagesrc={el.condition.icon} />
                      </div>
                      <p className="text-2xl">{el.temp_c}°C</p>
                    </div>
                  );
                })}
              </Slider>
            </div>
            <div className="md:grid md:grid-cols-6 gap-y-10 mt-5rounded-xl p-5 md:bg-transparent hidden">
              {dataSelectedHouers.map((el, index) => {
                let date = new Date(el.time);
                let houer = date.getHours();
                return (
                  <div
                    className="flex flex-col items-center justify-center text-white"
                    key={index}
                  >
                    <div className="text-center text-2xl w-[100px]">
                      {houer}:00
                    </div>
                    <WeatherIcon size={90} imagesrc={el.condition.icon} />
                    <p className="text-2xl">{el.temp_c}°C</p>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HouersForecast;
