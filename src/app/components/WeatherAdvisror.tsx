import Image from "next/image";
import { useState, useEffect } from "react";

interface CityWeather {
    temp: number;
    city: string;
    sunrise: number;
    sunset: number;
    pressure: number;
    humidity: number;
    visibility: number;
    country: string;
    weather: {
        main: string;
        description: string;
        icon: string;
    };
}


export default function WeatherAdvisor() {
    const dailyTemperature = [{ day: 'Monday', temp: 40 }, { day: 'Tuesday', temp: 38 }, { day: 'Wednesday', temp: 41 }, { day: 'Thursday', temp: 42 }]
    const [cityDetails, setCityDetails] = useState<CityWeather[]>([]);

    const getWeatherData = async (cities: string[]) => {
        const promises = cities.map(async (city: string) => {
            const response = await fetch(`/api/weather?city=${city}`);
            const { data } = await response.json();
            return {
                temp: data.main.temp,
                city: data.name,
                sunrise: data.sys.sunrise,
                sunset: data.sys.sunset,
                pressure: data.main.pressure,
                humidity: data.main.humidity,
                visibility: data.visibility,
                country: data.sys.country,
                weather: data.weather[0]
            };
        });
        const cityDetailsArray = await Promise.all(promises);
        setCityDetails(cityDetailsArray);
    };
    useEffect(() => {
        const initialCities: string[] = ['New York', 'London', 'Tokyo'];
        getWeatherData(initialCities);
    }, []);
    return (
        <div className="w-full h-full">
            <div className="flex flex-col justify-center p-4 bg-[#1a1b1d] rounded-2xl">
                <div className="p-1 flex justify-between">
                    <div className="px-2 py-1 text-[12px] bg-white rounded-3xl text-black">Weather Dashboard</div>
                    <p className="text-[12px] text-zinc-500">More details</p>
                </div>
                <div className="flex px-2 py-4 justify-center items-center">
                    {
                        dailyTemperature.map((a, index) => (
                            <div key={index} className="flex flex-col items-center space-y-6">
                                <h1 className="text-zinc-500 text-[16px]">{a.day}</h1>
                                <Image
                                    className="h-20 w-28"
                                    src='/partlycloudy.png'
                                    alt="partlycloudy"
                                    height={400}
                                    width={400}
                                >
                                </Image>
                                <h1>{a.temp}°C</h1>
                            </div>
                        ))}
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex justify-between p-4">
                    <div className="text-zinc-400 text-[20px]">Other cities</div>
                    <div className="bg-[#1a1b1d] rounded-2xl px-4 py-2 text-[12px]">Show all</div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                    {
                        cityDetails.map((city, index) => {
                            return <div key={index} className="flex justify-around p-4 items-center rounded-2xl bg-[#1a1b1d]">
                                <div className="flex flex-col">
                                    <h1 className="text-zinc-400 text-[16px]">{city.city}, {city.country}</h1>
                                    <p className="text-zinc-500 text-[12px]">{city.weather.description}</p>
                                </div>
                                <div>

                                    <Image
                                        className="h-12 w-16"
                                        src='/partlycloudy.png'
                                        alt="partlycloudy"
                                        height={400}
                                        width={400}
                                    >
                                    </Image>
                                    <h1>{Math.floor(city.temp)}°C</h1>
                                </div>
                            </div>
                        })}
                </div>
            </div>
        </div>
    )
}