import PageTitle from "@/components/shared/PageTitle";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div
      style={{
        backgroundImage:
          'url("https://res.cloudinary.com/duju3bhds/image/upload/v1757323648/Untitled_design_1_bu7lyt.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen flex items-center justify-center md:px-4 py-8 relative overflow-hidden"
    >
      <PageTitle />
      <div className="w-full max-w-md">
      <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
