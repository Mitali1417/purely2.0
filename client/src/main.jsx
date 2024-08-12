import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { styles } from "./style/tailwindStyles.jsx";
import { ThemeProvider } from "@emotion/react";
import customTheme from "./mui/theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <div className={`${styles.bg}`}>
        <App />
      </div>
    </ThemeProvider>
  </React.StrictMode>
);
