"use client";
import { useState, useMemo, ChangeEvent, KeyboardEvent } from 'react';
import { useSelector } from 'react-redux';
import { selectLocalitiesByText } from '../../Store/localitiesSlice';
import { RootState } from '../../Store/Store';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../assets/logo.png';
import mic from '../../assets/mic.png';
import user from '../../assets/user.png';



// type of locality
interface Locality {
    localityName: string;
    cityName: string;
    localityId: string;
}

interface HeaderProps {
    text: string;
}

const Header: React.FC<HeaderProps> = ({ text }) => {
    const [searchText, setSearchText] = useState<string>(text);
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
    
    //to handle change in search text
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
        setSuggestions(filteredSuggestions);
    };

    //to handle search 
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const encodedText = encodeURIComponent(searchText);
            setSuggestions([]);
            router.push(`/Search/${encodedText}`);
        }
    };

    //to handle search through suggestion
    const handleSuggestionClick = (suggestion: Locality) => {
        setSearchText(suggestion.localityName);
        router.push(`/Search/${encodeURIComponent(suggestion.localityName)}`);
    };

    return (
        <header className="bg-white flex flex-col md:flex-row items-center gap-3 px-3 py-3 border-b-2 border-[#EBEBEB]">
            <div className="flex items-center justify-between gap-5 w-full md:w-auto">
                <Link href="/" className="w-[80px]">
                    <Image src={logo} alt="logo" className="w-full object-cover" />
                </Link>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-[24px] md:hidden">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>

            <div className="flex items-center justify-center sm:justify-between gap-3 w-full">
                <div className="relative w-full sm:w-auto flex items-center gap-2 h-[40px] bg-white px-5 rounded-[25px] border-2 border-[#DFE1E5] shadow">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-[20px] text-[#797A7C]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input
                        type="text"
                        value={searchText}
                        name="searchText"
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        className="h-full w-full sm:w-[440px] border-0 focus:outline-none"
                    />
                    {searchText.length > 0 && suggestions.length > 0 && (
                        <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-2">
                            {suggestions.map((suggestion) => (
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
                    <div className="h-[20px] w-[14px] bg-white cursor-pointer">
                        <Image src={mic} alt="" className="h-full w-full object-cover" />
                    </div>
                </div>
                <div className="items-center gap-3 hidden md:flex">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-[24px] cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </div>
                    <div className="flex cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-[24px] -mr-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                        </svg>
                        <Image src={user} alt="user" className="w-[30px] h-[30px] rounded-full object-cover" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
