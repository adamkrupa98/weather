import React from "react";

const WeatherIcon = ({ imagesrc, size }) => {
  return (
    <div className="w-[100px] flex justify-center">
      <img src={imagesrc} alt="" style={{ width: size, height: size }} />
    </div>
  );
};

export default WeatherIcon;
