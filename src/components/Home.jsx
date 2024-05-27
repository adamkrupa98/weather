import React, { useState, createContext } from "react";
import CurrentWeather from "./CurrentWeather";
import SearchCity from "./SearchCity";
import NextDays from "./NextDays";
import HouersForecast from "./HouersForecast";
import MapMarker from "./MapMarker";
import { Link } from "react-router-dom";
import SunRise from "./SunRise";
import useFetch from "../hooks/useFetch";
import { slugify } from "transliteration";
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
  const { data, error } = useFetch(slugify(city));

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
      <div
        key={index}
        onClick={() => setCity(city[0])}
        className="cursor-pointer"
      >
        <MapMarker city={city[0]} />
      </div>
    );
  });

  return (
    <CityContext.Provider value={{ data }}>
      <div className="w-full flex flex-col h-full min-h-screen bg-gradient-to-b from-slate-800 to-slate-600 md:from-gray-400 md:to-gray-200">
        <div className="md:max-w-[900px] w-full mx-auto h-full min-h-screen flex flex-col md:border-l-2 md:border-r-2 md:border-slate-400 md:backdrop-filter md:backdrop-blur-md md:bg-opacity-70 md:bg-black">
          <Link to="/" onClick={handleHomeClick}>
            <h1 className="md:text-4xl text-2xl font-bold md:ml-5  text-white md:text-left text-center md:relative md:top-5 mt-2 md:mt-0">
              WeatherWise
            </h1>
          </Link>
          <SearchCity onSearch={handleSearch} />
          {data.error && data.error.code === 1006 && (
            <div className="md:max-w-full h-screen flex justify-center items-center bg-red-50">
              Nie znaleziono lokalizacji
            </div>
          )}
          {city !== "" ? (
            <>
              <CurrentWeather city={city} />
              <HouersForecast />
              <div className="flex flex-col md:flex-row h-full">
                <NextDays />
                <SunRise />
              </div>
            </>
          ) : (
            <div className="grid md:grid-cols-4 grid-cols-2 h-full mt-[5%] 3xl:mt-[15%] gap-y-12 pb-10">
              {renderCities}
            </div>
          )}
        </div>
      </div>
    </CityContext.Provider>
  );
};

export default Home;
