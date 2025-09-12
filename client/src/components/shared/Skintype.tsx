import { motion } from "motion/react";
import { skinType } from "../../data/index";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export const Skintype = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h2>Love the Skin You're In</h2>
          <p className="max-w-lg mx-auto mb-6">
            Everyone's skin is unique — just like you! Discover what your skin
            craves and let Mira share tips to keep it happy and healthy.
          </p>
          <Button
            variant={"secondary"}
            size="lg"
            onClick={() => navigate("/mira")}
            className="bg-black text-white"
          >
            Let's Get Started
          </Button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex justify-center items-start flex-row flex-wrap w-full">
          {skinType.map((item) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: item.id * 0.1 }}
              key={item.id}
              className="flex flex-col items-center justify-center text-center relative w-52 mt-16 m-4 h-full group cursor-pointer"
              whileHover={{ y: -5 }}
            >
              {/* Image Container */}
              <div
                className={`relative w-48 h-72 overflow-hidden ${
                  item.id % 2 !== 0
                    ? "rounded-full sm:rounded-t-full sm:rounded-b-none"
                    : "rounded-full sm:rounded-b-full sm:rounded-t-none"
                }`}
              >
                {/* Main Image */}
                <motion.img
                  src={item.image}
                  alt={item.typeName}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Overlay - Using CSS group-hover instead of motion */}
                <div className="absolute inset-0 bg-black/70 bg-opacity-0 flex items-center justify-center transition-all duration-400 ease-out group-hover:bg-opacity-80 group-hover:translate-y-0 translate-y-full">
                  <span className="text-white font-DM text-lg font-semibold opacity-0 transition-opacity duration-300 delay-100 group-hover:opacity-100">
                    🤍&nbsp;{item.typeName}
                  </span>
                </div>
              </div>

              {/* Content below image */}
              <motion.div
                className="mt-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: item.id * 0.1 + 0.3 }}
              >
                <ul className="font-Quicks">
                  <li className="italic">{item.description}</li>
                </ul>
                <h5 className="font-semibold font-Quicks mt-2">
                  🖤&nbsp;{item.getType}
                </h5>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Layout - Improved */}
        <div className="lg:hidden">
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {skinType.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: item.id * 0.1 }}
                className="flex flex-col items-center text-center p-4 rounded-xl shadow-sm bg-white/20"
              >
                {/* Image Container */}
                <div className="group relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3">
                  <img
                    src={item.image}
                    alt={item.typeName}
                    className="w-full h-full object-cover rounded-full"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <span className="text-white text-xs font-semibold">
                      {item.typeName}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full">
                  <p className="text-xs line-clamp-2 leading-tight">
                    {item.description}
                  </p>
                  <h5 className="text-sm font-semibold mb-1">{item.getType}</h5>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
