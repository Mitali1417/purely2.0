import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <main className="mt-28 bg-yellow-400 min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;
