import Image from "next/image";
import { useEffect, useState } from "react";

export default function CityDetail({ data }: { data: any }) {
    const [src, setSrc] = useState('');
    useEffect(() => {

        if (data.weather.description !== undefined) {
            setSrc(() => {
                if (data.weather.description.includes('cloud')) return '/partlycloudy.png'
                else if (data.weather.description.includes('rain')) return '/rainy.png'
                return '/sun.png'
            })
        }
    }, [data.weather.description])
    return (
        <div className="w-full custom-gradient p-4 rounded-3xl">
            <div className="flex flex-col justify-center">
                <div className="city flex justify-between items-center p-2">
                    <div className="px-2 py-1 text-[12px] bg-white rounded-3xl text-black">{data.city}, {data.country}</div>
                    <p className="text-[12px]">{new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                </div>
                <div className="flex items-center space-x-3">
                    {src && <Image
                        className="h-20 w-28"
                        src={src}
                        alt={src}
                        height={400}
                        width={400}
                    >
                    </Image>}
                    <h1 className="text-zinc-500 capitalize">{data.weather.description}</h1>
                </div>
                <div className="flex justify-center items-center">
                    <h1 className="text-9xl">
                        {Math.floor(data.temp)}
                    </h1>
                    <h1 className="text-4xl"><sup>°c</sup></h1>
                </div>
                <div className="flex justify-between p-4">
                    <div className="flex flex-col">
                        <h1 className="text-zinc-500 text-lg">Pressure</h1>
                        <h2 className="text-xl">{data.pressure}mb</h2>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-zinc-500 text-lg">Humidity</h1>
                        <h2 className="text-xl">{data.humidity}%</h2>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-zinc-500 text-lg">Visibility</h1>
                        <h2 className="text-xl">{Math.floor(data.visibility / 1000)} km</h2>
                    </div>
                </div>
                <div className="flex flex-col mt-4 space-y-2">
                    <div className="w-full rounded-2xl bg-[#1a1b1d] flex flex-col p-4">
                        <div><Image className="h-8 w-8" src="/sun.png" alt="sun" height={400} width={400}></Image></div>
                        <h1 className="text-zinc-500">Sunrise</h1>
                        <h1>{new Date((data.sunrise) * 1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</h1>
                    </div>
                    <div className="w-full rounded-2xl bg-[#1a1b1d] flex flex-col p-4">
                        <div><Image className="h-8 w-8 rounded-full" src="/sunset.jpg" alt="sun" height={400} width={400}></Image></div>
                        <h1 className="text-zinc-500">Sunset</h1>
                        <h1>{new Date((data.sunset) * 1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}