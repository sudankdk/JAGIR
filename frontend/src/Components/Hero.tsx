import { SearchBar } from "./SearchBar";

export function Hero() {
  return (
    <div className="relative bg-gradient-to-r bg-blue-800  text-black py-20">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl text-white md:text-5xl font-bold mb-4">
            Find Your Dream Job Today
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Discover thousands of job opportunities with all the information you
            need
          </p>
          <div className="flex flex-col items-center justify-start ">
            {/* Added ml-auto to push the search bar to the right */}
            <div>
              <SearchBar
                onSearch={(query, location) => console.log(query, location)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-8 mt-12 text-blue-100">
          <div className="text-center">
            <div className="text-3xl font-bold">10k+</div>
            <div>Jobs Posted</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">8k+</div>
            <div>Companies</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">15k+</div>
            <div>Job Seekers</div>
          </div>
        </div>
      </div>
    </div>
  );
}
