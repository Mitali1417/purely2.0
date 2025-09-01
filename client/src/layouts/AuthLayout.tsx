import { Outlet } from "react-router-dom";
import { motion } from "motion/react";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            <span className="text-purple-600">Purely</span>
          </h1>
          <p className="text-gray-600">Your beauty journey starts here</p>
        </div>
        <Outlet />
      </motion.div>
    </div>
  );
};

export default AuthLayout;