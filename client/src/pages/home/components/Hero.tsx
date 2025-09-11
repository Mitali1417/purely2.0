import { useState, useEffect } from "react";
import { heroSlider, heroTextSlider } from "@/data";
import { motion, AnimatePresence } from "motion/react";
import { ShinyButton } from "@/components/magicui/shiny-button";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlider.length);
      setCurrentTextIndex((prev) => (prev + 1) % heroTextSlider.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  const imageVariants = {
    enter: {
      y: 50,
      opacity: 0,
      scale: 0.9,
    },
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    exit: {
      y: -50,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const textVariants = {
    enter: {
      y: 20,
      opacity: 0,
    },
    center: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        delay: 0.2,
        ease: "easeOut",
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative bg-primary-foreground/30 backdrop-blur-md w-full hero-height max-w-6xl rounded-2xl overflow-hidden border border-slate-200 shadow-lg"
        style={{
          backgroundImage:
            'url("https://res.cloudinary.com/duju3bhds/image/upload/v1757323648/Untitled_design_1_bu7lyt.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative flex flex-col md:flex-row items-center justify-between mx-auto h-full px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-8">
          {/* Content Container - Stack vertically on mobile */}
          <div className="flex flex-col w-full md:w-1/2 z-10 justify-center h-full order-2 md:order-1">
            <motion.h1
              variants={itemVariants}
              className="text-6xl lg:text-7xl font-bold mb-4 text-center md:text-left font-kalnia"
            >
              .purely
            </motion.h1>

            {/* Text slider - visible on all screens */}
            <motion.div
              variants={itemVariants}
              className="relative py-4 mb-5 max-w-md mx-auto md:mx-0"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTextIndex}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className=" text-sm sm:text-base leading-relaxed text-center md:text-left px-2 sm:px-0"
                >
                  {heroTextSlider[currentTextIndex].para}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex justify-center md:justify-start"
            >
              <ShinyButton
                onClick={() => {
                  window.location.href = "/mira";
                }}
              >
                Let Mira Help You Glow
              </ShinyButton>
            </motion.div>
          </div>

          {/* Image Section - Order first on mobile */}
          <div className="relative w-full md:w-1/2 h-64 sm:h-72 md:h-80 lg:h-96 flex items-center justify-center order-1 md:order-2 mb-6 md:mb-0">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={heroSlider[currentIndex].image}
                  alt={heroSlider[currentIndex].alt}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-lg"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Indicators - Adjusted for mobile */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
        >
          {heroSlider.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setCurrentTextIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white shadow-md scale-125"
                  : "bg-slate-200 hover:bg-slate-400"
              }`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
