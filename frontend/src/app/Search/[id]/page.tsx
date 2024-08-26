"use client";
import Header from '../../../Components/Header/Header';
import Link from 'next/link';
import locationsData from '../../../assets/data/data.json'; 
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectLocalitiesByText } from '../../../Store/localitiesSlice';
import { RootState } from '../../../Store/Store';


interface Location {
    localityName: string;
    cityName: string;
    localityId: string;
}

interface SearchProps {
    params: {
        id: string;
    };
}

export default function Search({ params }: SearchProps) {
    const { id } = params;
    const decodedId = decodeURIComponent(id);

    // Use the selector
    const filteredLocations = useSelector((state: RootState) =>
        selectLocalitiesByText(decodedId)(state)
    );


    //logic for pagination
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState<number>(1);

    const totalPages = Math.ceil(filteredLocations.length / itemsPerPage);

    // items to display on current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredLocations.slice(startIndex, startIndex + itemsPerPage);

    // to change the page
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({
                top: 0,
                behavior: 'smooth' 
            });
        }
    };

    return (
        <div>
            <Header text={decodedId} />

            <div className="px-5 md:px-20">
                <p className="text-sm py-1 text-[#5F6368] mb-5">
                    About {filteredLocations.length.toLocaleString()} results
                </p>

                <div className="flex flex-col gap-3 min-h-[500px]">
                    {currentItems.length > 0 ? (
                        currentItems.map((location: Location) => (
                            <Link 
                                key={location.localityId} 
                                href={`/Weather/${encodeURIComponent(location.localityId)}`} 
                                className="max-w-[600px] cursor-pointer"
                            >
                                <p className="text-[#1A0DAB] text-lg font-medium hover:underline">
                                    {location.localityName} - {location.cityName}
                                </p>
                                <p className='text-[#5F6368] text-sm pl-3'>
                                    We are here to keep you informed with the most relevant information for {location.localityName} - {location.cityName}. 
                                    Whether you are planning your day or just catching up, we aim to provide timely and useful insights to help you stay on top of things.
                                </p>
                            </Link>
                        ))
                    ) : (
                        <p>No results found for "{decodedId}".</p>
                    )}
                </div>

                <div className="flex justify-center items-center gap-5 mt-5 text-sm">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-gray-200 text-gray-700 rounded">
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-200 text-gray-700 rounded">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
