import { Outlet } from "react-router-dom";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import LoginRequiredDialog from "@/components/shared/LoginRequiredDialog";
import PageTitle from "@/components/shared/PageTitle";

const UserLayout = () => {
  return (
    <>
      <PageTitle />
      <Navbar />
      <div className="pt-16">
        <main className="container min-h-screen mx-auto mt-16 px-4 md:px-10 pt-6">
          <Outlet />
        </main>
        <Footer />
      </div>
      <LoginRequiredDialog />
    </>
  );
};

export default UserLayout;
