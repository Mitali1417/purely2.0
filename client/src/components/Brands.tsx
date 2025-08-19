import brandsData from "../brands.json";

const Brands = () => {
  return (
    <div className="flex justify-center items-center text-white w-full h-full bg-black rounded-2xl max-w-7xl mx-auto my-8 p-4">
      <div className="flex justify-center items-center flex-col w-full">

          <div className="bg-black shadow-2xl z-10 relative flex justify-between items-center px-[1rem] sm:px-[2rem] flex-col lg:flex-row w-full rounded-2xl py-[1.5rem] sm:py-[4rem] mt-[3.5rem] sm:mt-[5rem]">
            <div className="text-base sm:text-lg md:text-xl font-Quicks text-white">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold">
                Indian Brands to know <br />
              </p>
              <p className="mt-[0.5rem] sm:mt-[1rem]">
                Your skin can change with the seasons or even with age, so check
                in on it now and then!
              </p>
            </div>
          </div>

        {/* -----------------------------Mobile view--------------------------------- */}
        <div className="relative w-full overflow-hidden h-[10rem] flex items-center">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...brandsData.AffordableSkincare, ...brandsData.AffordableSkincare].map((item, index) => (
              <a
                key={`${item.id}-${index}`}
                href={item.URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex justify-center items-center m-[0.5rem] sm:w-[19rem] h-fit hover:shadow-2xl border-[2px] border-white hover:border-[#BB96D2] transition-all duration-700 ease-in-out bg-white rounded-lg p-[1rem]">
                  <img
                    src={item.Logo}
                    className="w-fit h-[2rem] sm:h-[3rem]"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement
                      img.onerror = null
                      img.src = "/vite.svg"
                    }}
                    alt={item.Brand}
                  />
                </div>
              </a>
            ))}
           
          </div>
        </div>

        {/* -----------------------------Desktop view--------------------------------- */}
        {/* <div className="px-6 sm:px-12 md:px-20 lg:px-28 flex justify-center items-center flex-wrap w-full">
          {brandsData.AffordableSkincare.map((item) => (
            <div
              key={item.id}
              className="category-container relative w-full sm:w-[80%] md:w-[55%] lg:w-[40%] xl:w-[16rem] h-[17rem] md:h-[20rem] xl:h-[25rem] my-[1rem] md:m-[1rem] bg-gradient-to-tr from-[#d5bee3] to-[#bb96d2] p-[0.5rem] rounded-2xl"
            >
              <a
                href={item.URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={item.Logo}
                  alt={item.Brand}
                  className="rounded-xl w-full h-[65%] md:h-[60%] xl:h-[75%] object-cover"
                />
                <span className="absolute text-center p-[1rem] z-0 bottom-0 left-0 w-full h-full flex items-center justify-center bg-[#aa7cc7] bg-opacity-85 text-white font-DM transition-all category-span">
                  {item.Brand}
                </span>
              </a>
              <a
                className="block z-10 text-base sm:text-lg md:text-xl font-medium font-Quicks w-full my-[1rem] px-[1rem]"
                href={item.URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.Brand}
              </a>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Brands;
