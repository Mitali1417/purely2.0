import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { styles } from "../style/tailwindStyles";
import { navLinks } from "../data";
import logo from "../assets/Hero/1.png";

const Footer = () => {
  return (
    <Box
      component="footer"
      style={{
        marginTop: "2.5rem",
      }}
      className={`${styles.flexCenter} overflow-hidden w-full px-[0.5rem] sm:px-[2rem]`}
    >
      <Box
        className={`${styles.flexBetween} flex-col overflow-hidden text-gray-500 w-full px-[1rem] py-[0.75rem] rounded-t-lg bg-black/80 footer-shadow`}
      >
        <Link
          href="/about"
          className={`${styles.flexCenter} font-semibold my-[0.5rem]`}
          underline="none"
          color="inherit"
        >
          <img
            src={logo}
            className="w-[2.5rem] h-[2.5rem] mr-[1rem] rounded-full"
            alt="Logo"
          />
          Purely
        </Link>

        <Box className={`flex justify-evenly my-[0.5rem] w-[50%]`}>
          {navLinks.map((item) => (
            <Link
              variant="body4"
              key={item.id}
              href={item.navLink}
              underline="none"
              color="inherit"
            >
              {item.navText}
            </Link>
          ))}
        </Box>

        <Typography variant="body4" color="textSecondary">
          Copyright © 2024. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
