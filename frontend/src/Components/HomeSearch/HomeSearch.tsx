"use client";
import { useState, useMemo, ChangeEvent, KeyboardEvent } from 'react';
import { useSelector } from 'react-redux';
import { selectLocalitiesByText } from '../../Store/localitiesSlice';
import { RootState } from '../../Store/Store';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import mic from '../../assets/mic.png';


//type for a locality
interface Locality {
    localityName: string;
    localityId: string;
}

//types for component state
interface State {
    searchText: string;
    suggestions: Locality[];
}

export default function HomeSearch() {
    const [searchText, setSearchText] = useState<string>('');
    const [suggestions, setSuggestions] = useState<Locality[]>([]);
    const router = useRouter();

    // Use the selector
    const localities = useSelector((state: RootState) =>
        selectLocalitiesByText(searchText)(state)
    );

    // Use useMemo to optimize filtering suggestions
    const filteredSuggestions = useMemo(() => {
        return localities
            .slice(0, 5);
    }, [searchText, localities]);

    // to handle change in input searchText
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
        setSuggestions(filteredSuggestions);
    };

    // to handle search submit
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const encodedText = encodeURIComponent(searchText);
            router.push(`/Search/${encodedText}`);
        }
    };

    // hanlding search through suggestion
    const handleSuggestionClick = (suggestion: Locality) => {
        setSearchText(suggestion.localityName);
        setSuggestions([]);
        router.push(`/Search/${encodeURIComponent(suggestion.localityName)}`);
    };

    return (
        <div className="relative flex items-center gap-2 h-[40px] md:h-[50px] bg-white px-5 rounded-[25px] border-2 border-[#DFE1E5]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-[24px] text-[#797A7C]">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
                type="text"
                name="searchText"
                value={searchText}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="h-full w-full md:w-[500px] border-0 focus:outline-none"
            />
            {searchText.length > 0 && suggestions.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-2">
                    {suggestions.map((suggestion: Locality) => (
                        <div
                            key={suggestion.localityId}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                        >
                            {suggestion.localityName}
                        </div>
                    ))}
                </div>
            )}
            <div className="h-[24px] w-[16px] bg-white cursor-pointer">
                <Image src={mic} alt="" className="h-full w-full object-cover" />
            </div>
        </div>
    );
}
