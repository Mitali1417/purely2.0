import React from "react";
import "./PageLoader.css";

const PageLoader: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`min-h-screen flex flex-col items-center justify-center ${className || ""}`}>
    <span className="loader" />
  </div>
);

export default PageLoader;
