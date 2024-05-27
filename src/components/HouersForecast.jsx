import React from "react";
import WeatherIcon from "./WeatherIcon";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useContext } from "react";
import { CityContext } from "./Home";

const HouersForecast = () => {
  const { data } = useContext(CityContext);
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

  let dataForSelectedHouers = dataSelectedHouers.map((el, index) => {
    let date = new Date(el.time);
    let houer = date.getHours();
    return (
      <div
        className="flex flex-col items-center justify-center text-white text-center"
        key={index}
      >
        <div className="text-center text-2xl w-full">{houer}:00</div>
        <div className="w-full flex justify-center">
          <WeatherIcon size={90} imagesrc={el.condition.icon} />
        </div>
        <p className="text-2xl">{el.temp_c}°C</p>
      </div>
    );
  });
  return (
    <>
      <div className="w-full">
        {dataSelectedHouers.length > 0 && (
          <>
            <h1 className="text-3xl w-full h-auto pl-[55px] text-white md:text-blue-400 hidden md:block">
              Pogoda godzinowa:
            </h1>
            <div className="w-9/12 mx-auto mt-5 md:hidden">
              <Slider {...settings}>{dataForSelectedHouers}</Slider>
            </div>
            <div className="md:grid md:grid-cols-6 gap-y-10 mt-5rounded-xl p-5 md:bg-transparent hidden">
              {dataForSelectedHouers}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HouersForecast;
