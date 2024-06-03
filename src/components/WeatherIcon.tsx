import React from "react";

interface WeatherIconProps {
  imagesrc: string;
  size: number;
}
const WeatherIcon: React.FC<WeatherIconProps> = ({ imagesrc, size }) => {
  return (
    <div className="w-[100px] flex justify-center">
      <img src={imagesrc} alt="" style={{ width: size, height: size }} />
    </div>
  );
};

export default WeatherIcon;
