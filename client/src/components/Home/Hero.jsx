import React, { useState, useEffect } from "react";
import { Button, Box, Typography, Grid } from "@mui/material";
import { styles } from "../../style/tailwindStyles";
import { heroSlider, heroTextSlider } from "../../data";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [transitionIn, setTransitionIn] = useState(true);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [nextTextIndex, setNextTextIndex] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTransitionIn(false);
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setNextIndex((nextIndex + 1) % heroSlider.length);
        setCurrentTextIndex(nextTextIndex);
        setNextTextIndex((nextTextIndex + 1) % heroTextSlider.length);
        setTransitionIn(true);
      }, 700);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [nextIndex, nextTextIndex]);

  return (
    <Box className={`${styles.flexCenter} p-[1rem]`}>
      <Grid
        container
        className={`${styles.flexBetween} relative bg-white/40 backdrop-blur-2xl w-full h-[96vh] rounded-2xl ${styles.xPaddings} overflow-hidden`}
      >
        <Grid
          item
          xs={12}
          md={6}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            style={{
              color: "#73414f",
            }}
            className={`z-20 ${styles.heroHeading} font-Kalnia text-secondary w-full`}
          >
            pure
            <Typography
              component="span"
              variant="h1"
              style={{
                color: "#ffffff",
              }}
            >
              ly.
            </Typography>
          </Typography>
          <Box
            className={`${styles.flexStart} bg-[#AA7CC7]/20 border-[2px] w-full xl:w-[70%] pt-[1rem] ss:pt-0 pb-[1rem] px-[1rem] rounded-r-full rounded-l-lg text-left z-20 mt-[2rem]`}
          >
            <Typography
              variant="body1"
              component="div"
              style={{
                marginTop: "1rem",
              }}
              className={`${
                transitionIn ? "fadeInUp" : "fadeOutUp"
              } h-full w-full`}
            >
              {heroTextSlider[currentTextIndex].para}
            </Typography>
          </Box>
          <Box style={{ marginTop: "1rem" }}>
            <Button
              href="/about"
              variant="primary"
              className={`hero-btn-glow1`}
            >
              Find Your Best Care
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} className={`${styles.flexCenter} mt-[2rem]`}>
          <Box className="absolute -right-[7rem] w-[50rem] h-[50rem] object-cover rounded-full">
            <img
              src={heroSlider[currentIndex].image}
              alt="Current Hero"
              className={`absolute -right-[7rem] top-[10rem] sm:top-0 w-[30rem] lg:w-[50rem] h-[30rem] lg:h-[50rem] opacity-[0.7] object-cover rounded-full hero-slider-shadow ${
                transitionIn ? "fadeIn" : "fadeOut"
              }`}
              style={{
                animation: transitionIn
                  ? "fadeInRight 1.5s ease-out"
                  : "fadeOutLeft 1.5s ease-in",
                right: "0%",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;
