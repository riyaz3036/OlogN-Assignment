import Image from "next/image";
import logo from '../assets/logo.png'
import user from '../assets/user.png'
import HomeSearch from '@/Components/HomeSearch/HomeSearch';

export default function Home() {


  return (
    <main className="min-h-screen flex flex-col justify-between">
        {/* Home Header */}
        <div className=" px-5 py-2 flex items-center gap-5 justify-end">
          <div className="flex cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-[24px] -mr-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-[24px] -mr-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-[24px]">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
              </svg>
          </div>
          <div className="w-[30px] h-[30px] cursor-pointer">
            <Image src={user} alt="" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Home Main Section */}
        <div className="flex flex-col gap-5 items-center">
            <div className="w-[150px] md:w-[250px]"><Image src={logo} alt="logo" className="w-full object-cover" /></div>
            <HomeSearch />
            <div className="flex flex-wrap justify-center gap-5">
                <div className="bg-[#F8F9FA] py-1 px-3 rounded">
                    <p className="text-[#5F6368] text-sm">1000+ Locations</p>
                </div>
                <div className="bg-[#F8F9FA] py-1 px-3 rounded">
                    <p className="text-[#5F6368] text-sm">Over 95% Accuracy</p>
                </div>
            </div>
        </div>

        {/* Home Footer */}
        <div>
            <div className="h-[40px] bg-[#F2F2F2] p-3 flex items-center border-b-2 border-[#DADCE0]">
              <p className="text-xs cursor-pointer text-[#5F6368]">India</p>
            </div>
            <div className="bg-[#F2F2F2] p-3 flex flex-wrap justify-between items-center gap-1">
                <div className="flex items-center gap-3">
                  <p className="text-xs cursor-pointer text-[#5F6368]">About</p>
                  <p className="text-xs cursor-pointer text-[#5F6368]">Advertising</p>
                  <p className="text-xs cursor-pointer text-[#5F6368]">Business</p>
                  <p className="text-xs cursor-pointer text-[#5F6368]">How Search Works</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-xs cursor-pointer text-[#5F6368]">Privacy</p>
                  <p className="text-xs cursor-pointer text-[#5F6368]">Terms</p>
                  <p className="text-xs cursor-pointer text-[#5F6368]">Settings</p>
                </div>
            </div>
        </div>
    </main>
  );
}
