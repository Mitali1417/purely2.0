import { styles } from "@/style/tailwindStyles";
import logo from "../assets/Hero/1.png";
import { Link } from "react-router-dom";
import { navLinks } from "@/data";

const Footer = () => {
  return (
    <div
      className={`${styles.flexCenter} overflow-hidden w-full px-[0.5rem] sm:px-[2rem]`}
    >
      <div
        className={`${styles.flexBetween} flex-col overflow-hidden text-gray-500 w-full px-[1rem] py-[0.75rem] rounded-t-lg bg-black/80 footer-shadow`}
      >
        <Link
          to="/about"
          className={`${styles.flexCenter} font-semibold my-[0.5rem]`}
        >
          <img
            src={logo}
            className="w-[2.5rem] h-[2.5rem] mr-[1rem] rounded-full"
            alt="Logo"
          />
          Purely
        </Link>

        <div className={`flex justify-evenly my-[0.5rem] w-[50%]`}>
          {navLinks.map((item) => (
            <Link
              key={item.id}
              to={item.navLink}
            >
              {item.navText}
            </Link>
          ))}
        </div>

        <div>
          Copyright © 2024. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
