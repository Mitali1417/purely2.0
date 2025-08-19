import { useState } from "react";
import { skinType, getCleanser, getMoisturizer  } from "@/data/index";


const Guide = () => {
  const [hover, setHover] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-4 sm:px-6 lg:px-12 py-4">
      <div className="flex flex-col items-center justify-center w-full min-h-[96vh]">
        <div className="flex flex-col items-center justify-center mt-12 sm:mt-32 bg-gradient-to-tr from-[#CCB0DD] to-[#BC97D3] shadow-2xl rounded-3xl p-6 sm:p-10 min-h-[70vh] w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 z-20 font-Kalnia text-white w-full">
            Hey There, Welcome to Your {" "}
            <span className="text-primary font-semibold">Skincare</span> Journey!
          </h2>
          <p className="hidden sm:flex text-lg md:text-xl font-Quicks w-full text-white">
            If you're stepping into the world of skincare, you've come to the
            right place.
          </p>
        </div>

        {/* ---------------- Skin Type Section ---------------- */}
        <div className="mt-32 my-8">
          <h1 className="text-4xl sm:text-5xl font-Kalnia text-white mx-8 z-20">
            What’s Your
            <span className="text-primary font-semibold"> &nbsp;Skin Type&nbsp;</span>?
          </h1>
          <p className="text-lg md:text-xl mt-4 font-Quicks text-white mx-8">
            First things first, let’s find out what your skin is really asking
            for. Here’s a quick rundown:
          </p>

          {/* Desktop Grid */}
          <div className="hidden md:flex justify-center items-start flex-row flex-wrap w-full">
            {skinType.map((item) => (
              <div
                data-aos="fade-zoom-in"
                key={item.id}
                className="flex flex-col items-center justify-center text-center relative w-52 mt-16 m-4 h-full"
              >
                <div
                  className={`group relative w-48 h-72 ${
                    item.id % 2 !== 0
                      ? "rounded-full sm:rounded-t-full sm:rounded-b-none"
                      : "rounded-full sm:rounded-b-full sm:rounded-t-none"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.typeName}
                    className="w-full h-full object-cover rounded-full"
                  />
                  <span className="group-hover:bottom-0 group-hover:translate-y-0 transition-all duration-700 ease-in-out absolute left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 text-white font-DM">
                    🤍&nbsp;{item.typeName}
                  </span>
                </div>
                <div>
                  <ul className="mt-4 text-lg font-Quicks text-white">
                    <li className="font-semibold italic">{item.description}</li>
                  </ul>
                  <h5 className="text-lg font-semibold font-Quicks text-white">
                    🖤&nbsp;{item.getType}
                  </h5>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Marquee */}
          <div className="md:hidden w-[96vw] my-8">
            <div className="flex overflow-x-auto whitespace-nowrap animate-marquee">
              {skinType.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center justify-center text-center relative w-full h-full p-6 bg-white/20"
                >
                  <div className="group relative w-28 sm:w-48 h-28 sm:h-48 rounded-full">
                    <img
                      src={item.image}
                      alt={item.typeName}
                      className="w-full h-full object-cover rounded-full"
                    />
                    <span className="group-hover:opacity-100 opacity-0 absolute bottom-0 left-0 w-full h-full flex items-center justify-center bg-black/60 text-white font-DM">
                      🤍&nbsp;{item.typeName}
                    </span>
                  </div>
                  <div>
                    <ul className="mt-4 text-lg font-Quicks text-white">
                      <li className="font-semibold italic">{item.description}</li>
                    </ul>
                    <h5 className="text-lg font-semibold font-Quicks text-white">
                      🖤&nbsp;{item.getType}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---------------- Quick Tip ---------------- */}
        <div
          data-aos="fade-up"
          className="bg-black shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between px-8 py-6 rounded-2xl w-full z-10"
        >
          <p className="text-lg font-Quicks text-white">
            <span
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className="text-3xl sm:text-4xl font-bold"
            >
              Quick Tip <button className={`${hover ? "bulb-glow" : ""}`}>💡</button>
              <br />
            </span>
            <span>
              Your skin can change with the seasons or even with age, so check
              in on it now and then!
            </span>
          </p>

          <div className="w-88 h-32 absolute bg-white/50 blur-3xl right-20 -top-20 rounded-full -rotate-[38deg]" />
          <div className="w-88 h-32 absolute bg-white/50 blur-3xl left-20 -bottom-20 rounded-full -rotate-[38deg]" />
        </div>

        {/* ---------------- Skincare ABCs ---------------- */}
        <div className="mt-32 my-8 w-[90%]">
          <h2 className="text-4xl sm:text-5xl font-Kalnia text-white">
            Skincare <span className="text-primary font-semibold">ABC's</span>
          </h2>

          {/* Cleansing Section */}
          <div className="my-8">
            <h3 className="italic font-semibold text-3xl sm:text-4xl font-Quicks text-white">
              Start Fresh: Cleansing
            </h3>
            <p className="text-lg font-Quicks text-white">
              🤍Morning Buzz: Wake up your skin by washing away the sleep and any overnight products.
            </p>
            <p className="text-lg font-Quicks text-white">
              🤍Nighttime Ritual: Before you hit the pillows, cleanse again to remove the day’s grime, makeup, and oil build-up.
            </p>
            <div className="bg-black shadow-2xl flex flex-col lg:flex-row items-center justify-between px-8 py-6 rounded-2xl my-4">
              <p className="text-lg font-Quicks text-white">
                <span className="text-xl font-semibold">Why?<br /></span>
                Keeping your skin clean is the first step to clear, happy skin. It’s like setting a clean canvas every morning and night!
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center text-white w-full mb-20">
            {getCleanser.map((item) => (
              <div
                data-aos="fade-up"
                key={item.id}
                className="relative w-80 h-[25rem] m-2 bg-gradient-to-tr from-[#d5bee3] to-[#bb96d2] p-2 rounded-2xl"
              >
                <a href={item.ProductLink} target="_blank" rel="noopener noreferrer">
                  <img src={item.ProductImage} alt={item.ProductName} className="rounded-xl w-full h-[75%]" />
                  <span className="absolute text-center p-4 bottom-0 left-0 w-full h-full flex items-center justify-center bg-[#aa7cc7] bg-opacity-85 text-white font-DM">
                    {item.ProductName}
                  </span>
                </a>
                <a
                  className="block z-10 text-lg font-medium font-Quicks w-full my-4 px-4"
                  href={item.ProductLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.ProductName}
                </a>
              </div>
            ))}
          </div>

          {/* Moisturizing Section */}
          <div className="my-8">
            <h3 className="italic font-semibold text-3xl sm:text-4xl font-Quicks text-white">
              Hydrate and Protect: Moisturizing
            </h3>
            <p className="text-lg font-Quicks text-white">
              🤍Daily Dose: After cleansing, apply a moisturizer that fits your skin type.
            </p>
            <p className="text-lg font-Quicks text-white">
              🤍Lock and Load: Moisturizer not only hydrates but also locks in all the goodness of your previous skincare steps.
            </p>
            <div className="bg-black shadow-2xl flex flex-col lg:flex-row items-center justify-between px-8 py-6 rounded-2xl my-4">
              <p className="text-lg font-Quicks text-white">
                <span className="text-xl font-semibold">Why?<br /></span>
                Hydrated skin is healthy skin. It looks smoother, feels softer, and stays supple longer. It's your daily armor against dryness and fine lines.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center text-white w-full mb-20">
            {getMoisturizer.map((item) => (
              <div
                data-aos="fade-up"
                key={item.id}
                className="relative w-80 h-[25rem] m-2 bg-gradient-to-tr from-[#d5bee3] to-[#bb96d2] p-2 rounded-2xl"
              >
                <a href={item.ProductLink} target="_blank" rel="noopener noreferrer">
                  <img src={item.ProductImage} alt={item.ProductName} className="rounded-xl w-full h-[75%]" />
                  <span className="absolute text-center p-4 bottom-0 left-0 w-full h-full flex items-center justify-center bg-[#aa7cc7] bg-opacity-85 text-white font-DM">
                    {item.ProductName}
                  </span>
                </a>
                <a
                  className="block z-10 text-lg font-medium font-Quicks w-full my-4 px-4"
                  href={item.ProductLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.ProductName}
                </a>
              </div>
            ))}
          </div>

          {/* Sun Protection */}
          <div className="my-8">
            <h3 className="italic font-semibold text-3xl sm:text-4xl font-Quicks text-white">
              Shield Up: Sun Protection
            </h3>
            <p className="text-lg font-Quicks text-white">
              🤍Every Single Day: Yes, even when it's cloudy or indoors. UV rays don’t play fair!
            </p>
            <div className="bg-black shadow-2xl flex flex-col lg:flex-row items-center justify-between px-8 py-6 rounded-2xl my-4">
              <p className="text-lg font-Quicks text-white">
                <span className="text-xl font-semibold">Why?<br /></span>
                Sunscreen is the ultimate anti-aging tool. It prevents sunburn, premature aging, and reduces the risk of skin cancer. Make it non-negotiable!
              </p>
            </div>
          </div>
        </div>

        {/* ---------------- React & Response ---------------- */}
        <div className="my-8">
          <h2 className="text-4xl sm:text-5xl font-Kalnia text-white">
            Quick Heads Up: Listen to <span className="text-primary font-semibold">Skin!</span>
          </h2>
          <p className="text-lg font-Quicks text-white">
            ✔️ Skin SOS: If any product causes redness, itching, or irritation, it’s your skin waving a red flag.
          </p>
          <p className="text-lg font-Quicks text-white">
            ✔️ Patch Test Pro: Always introduce new products slowly. Apply a small amount on your wrist or behind your ear first.
          </p>
          <div className="bg-black shadow-2xl flex flex-col lg:flex-row items-center justify-between px-8 py-6 rounded-2xl my-4">
            <p className="text-lg font-Quicks text-white">
              <span className="text-xl font-semibold">Why?<br /></span>
              Your skin’s comfort is key. Adjusting products based on your skin’s response helps tailor your skincare journey for the best results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;
