import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { heroSlider, heroTextSlider } from "@/data"
import { motion, AnimatePresence } from "motion/react"

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlider.length)
      setCurrentTextIndex((prev) => (prev + 1) % heroTextSlider.length)
    }, 4000)

    return () => clearInterval(intervalId)
  }, [])

  const imageVariants = {
    enter: {
      x: 100,
      opacity: 0,
      scale: 0.8,
    },
    center: {
      x: 0,
      opacity: 0.7,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    exit: {
      x: -100,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const textVariants = {
    enter: {
      y: 30,
      opacity: 0,
    },
    center: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    exit: {
      y: -30,
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.42, 0, 0.58, 1], // cubic-bezier for easeInOut
      },
    },
  }

  return (
    <div className="flex items-center justify-center p-4 min-h-screen">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative bg-white/10 backdrop-blur-xl w-full max-w-7xl h-[90vh] rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/10 to-pink-50/20" />

        <div className="relative flex flex-col md:flex-row items-center justify-between h-full px-6 md:px-12 py-8">
          {/* Left Content */}
          <motion.div variants={itemVariants} className="flex flex-col w-full md:w-1/2 z-10">
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8">
              <span className="text-slate-800">pure</span>
              <span className="text-white drop-shadow-lg">ly.</span>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="relative bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6 mb-8 max-w-lg"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTextIndex}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="text-slate-700 text-lg leading-relaxed"
                >
                  {heroTextSlider[currentTextIndex].para}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Find Your Best Care
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Image Section */}
          <div className="relative w-full md:w-1/2 h-full flex items-center justify-center mt-8 md:mt-0">
            <div className="relative w-80 h-80 lg:w-[36rem] lg:h-[36rem]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={heroSlider[currentIndex].image}
                  alt={heroSlider[currentIndex].alt}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 w-full h-full object-cover rounded-full shadow-2xl"
                />
              </AnimatePresence>

              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-60 blur-sm"
              />

              <motion.div
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-pink-400 to-orange-500 rounded-full opacity-50 blur-sm"
              />
            </div>
          </div>
        </div>

        <motion.div
          variants={itemVariants}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2"
        >
          {heroSlider.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                setCurrentTextIndex(index)
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white shadow-lg scale-110" : "bg-white/40 hover:bg-white/60"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Hero
