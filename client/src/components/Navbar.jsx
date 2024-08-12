import React, { useEffect, useState } from "react";
import { styles } from "../style/tailwindStyles";
import { navLinks } from "../data";
import logo from "../assets/Hero/1.png";
import menu from "../assets/Nav/menu.svg";
import close from "../assets/Nav/close.svg";
import menuScrolled from "../assets/Nav/menuScrolled.svg";
import closeScrolled from "../assets/Nav/closeScrolled.svg";
import { Link, NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Avatar,
} from "@mui/material";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { logout, isAuthenticated } = useAuth();
  const [username, setUsername] = useState("");

  const toggleMenu = () => {
    if (!toggle) {
      document.body.style.overflow = "hidden";
      setToggle(true);
    } else {
      document.body.style.overflow = "visible";
      setTimeout(() => {
        setToggle(false);
      }, 500);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      const viewportHeight = window.innerHeight;
      setScrolled(position > viewportHeight / 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "visible";
    };
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("signupData"));
    if (userData && userData.username) {
      setUsername(userData.username);
    }
  }, []);

  return (
    <Box
      className={`${styles.flexCenter} ${styles.boxWidth} fixed z-40 ${
        scrolled ? "top-[0.5rem]" : "top-[2rem]"
      } w-full transition-all duration-500 ease-in-out`}
    >
      <AppBar
        sx={{
          backgroundColor: scrolled ? "white" : "#ffffff1c",
          transition:
            "background-color 0.5s ease-in-out, backdrop-filter 0.5s ease-in-out",
        }}
        position="static"
        className={`${styles.flexBetween}`}
      >
        <Toolbar className={`${styles.flexBetween} w-full`}>
          <Typography component={Link} to="/about" variant="h6">
            {!scrolled && (
              <Box
                component="img"
                src={logo}
                className="w-[2.5rem] h-[2.5rem] lg:hidden rounded-full"
                alt="Logo"
              />
            )}

            {scrolled ? (
              <Box
                component="img"
                src={logo}
                className="w-[2.5rem] h-[2.5rem] rounded-full"
                alt="Logo"
              />
            ) : (
              <Box className={`flex items-center w-full`}>
                {/* <Box
                  component="img"
                  src={logo}
                  className="w-[2.5rem] h-[2.5rem] rounded-full"
                  alt="Logo"
                /> */}
                <Typography
                  component="p"
                  variant="p"
                  style={{
                    marginLeft: "0.6rem",
                  }}
                  className={`hidden lg:flex text-white`}
                >
                  Purely
                </Typography>
              </Box>
            )}
          </Typography>

          <Box
            className={`${styles.flexBetween} hidden md:flex ss:basis-[65%] sm:basis-[50%] md:basis-[40%] `}
          >
            {navLinks.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  `${styles.navtext} hover:font-semibold ${
                    isActive
                      ? "font-black text-primary border-b-2 border-primary"
                      : "text-white"
                  } my-[0.2rem]`
                }
                style={{ color: scrolled ? "#000" : "" }}
                key={item.id}
                to={item.navLink}
              >
                {item.navText}
              </NavLink>
            ))}
          </Box>

          <Box className={`${styles.flexCenter} flex-row`}>
            {isAuthenticated && (
              <>
                <Avatar sx={{ bgcolor: "#0f766e", marginRight: "1rem" }}>
                  {username.charAt(0).toUpperCase()}
                </Avatar>
                <Button
                  variant="secondary"
                  onClick={logout}
                  className="bg-teal-700   "
                  sx={{
                    color: "#fff",
                    borderColor: "#fff",
                    "&:hover": {
                      // color: "#000",
                      borderColor: "#ffffff66",
                      backgroundColor: "#be123c",
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            )}
            {/* Mobile View */}
            <Box className={`flex md:hidden sm:ml-[1rem]`}>
              <IconButton onClick={toggleMenu}>
                <Box
                  component="img"
                  src={
                    toggle
                      ? scrolled
                        ? closeScrolled
                        : close
                      : scrolled
                      ? menuScrolled
                      : menu
                  }
                  className="w-[1.7rem] cursor-pointer z-20"
                  alt={toggle ? "Close menu" : "Open menu"}
                />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile View toggle */}
      {toggle && (
        <Box
          className={`${
            styles.flexCenter
          } md:hidden flex-col text-white bg-white/5 backdrop-blur-xl fixed top-0 right-0 w-full min-h-[100vh] overflow-hidden transition-opacity duration-500 ease-in-out ${
            toggle ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <Box
            className={`${styles.flexCenter} flex-col mb-[1rem] sm:mb-[1.75rem]`}
          >
            {navLinks.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  `${styles.navtext} hover:font-semibold ${
                    isActive
                      ? "font-black text-primary border-b-2 border-primary"
                      : "text-white"
                  } my-[0.2rem]`
                }
                key={item.id}
                to={item.navLink}
              >
                {item.navText}
              </NavLink>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
