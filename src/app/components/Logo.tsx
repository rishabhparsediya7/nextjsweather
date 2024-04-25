import { Dispatch, SetStateAction } from "react";
import SearchBar from "./SearchBar";
import { Search } from "lucide-react";

export default function Logo({ searchCity, setCity, city }: { searchCity: any, setCity: Dispatch<SetStateAction<string>>, city: string }) {
    return (
        <div className="flex space-y-2 sm:space-y-2 px-2 flex-col sm:flex-row">
            <div className="flex space-x-2">
                <div className="h-12 w-12 bg-[#c8bcf6] flex justify-center font-bold items-center rounded-md text-[#121216] text-[20px]">
                    R
                </div>
                <div className="flex flex-col justify-center">
                    <h1 className="text-gray-300 text-sm">Howdy,</h1>
                    <h1 className="text-[14px]">Rishabh Parsediya</h1>
                </div>
            </div>
            <div className="w-full block sm:hidden">
                <div className="flex justify-end items-center relative">
                    <input value={city} onChange={(e) => setCity(e.target.value)} type="text" className="px-2 w-full py-3 outline-none rounded-lg  bg-[#1a1b1d] placeholder:text-zinc-600 text-sm text-zinc-300 placeholder:text-sm" placeholder="Search location" />
                    <Search size={20} onClick={searchCity} className="absolute right-3" />
                </div>
            </div>
        </div>
    )
}