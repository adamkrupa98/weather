import React, { useState, createContext } from "react";
import CurrentWeather from "./CurrentWeather";
import SearchCity from "./SearchCity";
import NextDays from "./NextDays";
import HouersForecast from "./HouersForecast";
import MapMarker from "./MapMarker";
import { Link } from "react-router-dom";
import SunRise from "./SunRise";

//Tablice miast używana na stronie startowej aplikacji
const citiesArr = [
  ["Poznań", 30, 38],
  ["Szczecin", 20, 25],
  ["Gdańsk", 40, 20],
  ["Warszawa", 52, 38],
  ["Kraków", 47, 65],
  ["Wrocław", 25, 53],
  ["Łódź", 43, 51],
  ["Suwałki", 58, 23],
];

// tworzony context
export const CityContext = createContext();

const Home = () => {
  //stan przechowujacy wybrane miasto
  const [city, setCity] = useState("");

  //funkcja do zmiany stanu miasta
  const handleSearch = (searchedCity) => {
    setCity(searchedCity);
  };

  //funkcja do przeladowania strony
  const handleHomeClick = () => {
    window.location.reload();
  };

  //renderowanie komponentów z tablicy miast
  const renderCities = citiesArr.map((city, index) => {
    return (
      <div key={index}>
        <MapMarker city={city[0]} />
      </div>
    );
  });

  return (
    <CityContext.Provider value={{ city, setCity }}>
      <div className="w-full flex flex-col h-full min-h-screen bg-gradient-to-b from-slate-800 to-slate-600 md:from-blue-300 md:to-blue-200">
        <div className="md:max-w-[900px] w-full mx-auto h-full min-h-screen flex flex-col md:border-l-2 md:border-r-2 md:border-slate-400 md:backdrop-filter md:backdrop-blur-md md:bg-opacity-60 md:bg-black">
          <Link to="/" onClick={handleHomeClick}>
            <h1 className="md:text-4xl text-2xl font-bold md:ml-5 md:mt-5 text-white md:text-left text-center mt-5 ">
              WeatherWise
            </h1>
          </Link>
          <SearchCity onSearch={handleSearch} />

          {city !== "" ? (
            <>
              <CurrentWeather />
              <HouersForecast />
              <div className="flex flex-col md:flex-row h-full">
                <NextDays />
                <SunRise />
              </div>
            </>
          ) : (
            <div className="md:grid md:grid-cols-4 h-full mt-[10%] gap-y-24">
              {renderCities}
            </div>
          )}
        </div>
      </div>
    </CityContext.Provider>
  );
};

export default Home;
