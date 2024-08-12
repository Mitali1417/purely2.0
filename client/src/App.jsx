import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from "./routes/AllRoutes";
import { styles } from "./style/tailwindStyles";
import { AuthProvider } from "./context/authContext";
import { ShopProvider } from "./context/productContext"; 

const App = () => {
  return (
    <div className={`${styles.boxWidth}`}>
      <AuthProvider>
        <ShopProvider>
          <Router>
            <AllRoutes />
          </Router>
        </ShopProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
