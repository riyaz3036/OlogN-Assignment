import Image from "next/image";
import weather from '../../../assets/weather.jpg';
import Header from '../../../Components/Header/Header';
import locationsData from '../../../assets/data/data.json';


interface LocationData {
    localityName: string;
    cityName: string;
    localityId: string;
}

interface WeatherData {
    temperature: number;
    humidity: number;
    wind_speed: number;
    wind_direction: number;
    rain_intensity: number;
    rain_accumulation: number;
}

interface WeatherProps {
    params: {
        id: string;
    };
}

// function to call the api
async function fetchWeatherData(localityId: string): Promise<WeatherData> {
    try {
        const response = await fetch(`https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data?locality_id=${localityId}`, {
            headers: {
                'X-Zomato-Api-Key': '8c85c3fca7788770103c08c94005b74c'
            }
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.status !== '200') {
            throw new Error(`API response status was not OK: ${data.message || 'Unknown error'}`);
        }

        return data.locality_weather_data;
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
        throw error;
    }
}


export default async function Weather({ params }: WeatherProps) {
    const { id } = params;
    const decodedId = decodeURIComponent(id);

    // get the location details from the local json file 
    const location = locationsData.find((location: LocationData) => location.localityId === decodedId);

    if (!location) {
        return <p>Location not found</p>;
    }

    // call to fetch weather data
    let weatherData: WeatherData | undefined;
    try {
        weatherData = await fetchWeatherData(decodedId);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherData = undefined; 
    }

    if (!weatherData) {
        return <p>Failed to load weather data. Please try again later.</p>;
    }

    return (
        <div>
            <Header text={location.localityName}/>
            <div className="w-full h-[200px]">
                <Image src={weather} alt="Weather Background" className="w-full h-full object-cover" />
            </div>
            <div className="p-5">
                <div className="mb-5">
                    <p className="text-base font-medium text-[#b7b7b7]">Location</p>
                    <p className="text-lg font-semibold">{location.localityName}, {location.cityName}</p>
                </div>
                <div>
                    <p className="text-base text-[#b7b7b7] font-medium">Today's Highlights</p>
                    <div className='flex flex-wrap gap-5 py-3'>
                        <div className="p-2 border-2 border-[#f6f6f6] rounded-[10px] w-[150px] shadow">
                            <p className="text-sm text-[#545454] font-semibold">Temperature</p>
                            <p className="text-xl text-center font-semibold py-3">{weatherData?.temperature !== null ? `${weatherData.temperature} °C` : 'NA'}</p>
                        </div>
                        <div className="p-2 border-2 border-[#f6f6f6] rounded-[10px] w-[150px] shadow">
                            <p className="text-sm text-[#545454] font-semibold">Humidity</p>
                            <p className="text-xl text-center font-semibold py-3">{weatherData?.humidity !== null ? `${weatherData.humidity} %` : 'NA'}</p>
                        </div>
                        <div className="p-2 border-2 border-[#f6f6f6] rounded-[10px] w-[150px] shadow">
                            <p className="text-sm text-[#545454] font-semibold">Wind Speed</p>
                            <p className="text-xl text-center font-semibold py-3">{weatherData?.wind_speed !== null ? `${weatherData.wind_speed} m/s` : 'NA'}</p>
                        </div>
                        <div className="p-2 border-2 border-[#f6f6f6] rounded-[10px] w-[150px] shadow">
                            <p className="text-sm text-[#545454] font-semibold">Wind Direction</p>
                            <p className="text-xl text-center font-semibold py-3">{weatherData?.wind_direction !== null ? `${weatherData.wind_direction}°` : 'NA'}</p>
                        </div>
                        <div className="p-2 border-2 border-[#f6f6f6] rounded-[10px] w-[150px] shadow">
                            <p className="text-sm text-[#545454] font-semibold">Rain Intensity</p>
                            <p className="text-xl text-center font-semibold py-3">{weatherData?.rain_intensity !== null ? `${weatherData.rain_intensity} mm/hr` : 'NA'}</p>
                        </div>
                        <div className="p-2 border-2 border-[#f6f6f6] rounded-[10px] w-[150px] shadow">
                            <p className="text-sm text-[#545454] font-semibold">Rain Accumulation</p>
                            <p className="text-xl text-center font-semibold py-3">{weatherData?.rain_accumulation !== null ? `${weatherData.rain_accumulation} mm` : 'NA'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
