'use client'
import { SetStateAction, Suspense, useEffect, useState } from "react";
import CityDetail from "./components/CityDetail";
import Logo from "./components/Logo";
import Nav from "./components/Nav";
import SearchBar from "./components/SearchBar";
import WeatherAdvisor from "./components/WeatherAdvisror";

export default function Home() {
  const [city, setCity] = useState<string>('gwalior')
  const [cityDetails, setCityDetails] = useState({ temp: 0, city: '', sunrise: '', sunset: '', pressure: 0, humidity: 0, visibility: 0, country: '', weather: {} })

  const getWeatherData = async () => {
    const response = await fetch(`/api/weather?city=${city}`);
    const { data } = await response.json();
    setCityDetails({
      ...cityDetails,
      temp: data.main.temp,
      city: data.name,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      visibility: data.visibility,
      country: data.sys.country,
      weather: data.weather[0]
    })
  }
  const searchCity = () => {
    console.log('calloing');

    getWeatherData()
  }
  useEffect(() => {
    getWeatherData();
  }, [])
  return (
    <main className="w-full p-6">
      <Suspense fallback={<h1>Loading...</h1>}>
        <div className="container">
          <div className="logo"><Logo searchCity={searchCity} setCity={setCity} city={city} /></div>
          <div className="searchbar hidden sm:block"><SearchBar searchCity={searchCity} setCity={setCity} city={city} /></div>
          <div className="nav hidden sm:block"><Nav /></div>
          <div className="city-detail"><CityDetail data={cityDetails} /></div>
          <div className="weather-advisor hidden sm:block"><WeatherAdvisor /></div>
        </div>
      </Suspense>
    </main>
  );
}
