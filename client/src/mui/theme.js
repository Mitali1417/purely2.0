import { createTheme, ThemeProvider } from "@mui/material";
import { grey } from "@mui/material/colors";

const baseTheme = createTheme({});
const customTheme = createTheme({
  // palette: {
  //   mode: "dark",
  //   primary: {
  //     light: "#0f1f52",
  //     main: "#0c1942",
  //     dark: "#081029",
  //     contrastText: "#fff",
  //   },
  //   secondary: {
  //     light: "#ccff90",
  //     main: "#b2ff59",
  //     dark: "#64dd17",
  //     contrastText: "#fff",
  //   },
  //   background: {
  //     default: "#091331",
  //     paper: "#0f1f52",
  //     customLight: "#f5f5f5",
  //     customDark: "#1a1a1a",
  //     customGradient: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  //   },
  // },
  breakpoints: {
    values: {
      xs: 240,
      ss: 325,
      sm: 600,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1440,
    },
  },
  typography: {
    fontSize: 14,
    h1: {
      fontFamily: '"kalnia", sans-serif',
      fontSize: "2.5rem",
      [baseTheme.breakpoints.up("sm")]: {
        fontSize: "4rem",
      },
      [baseTheme.breakpoints.up("md")]: {
        fontSize: "6rem",
      },
      fontWeight: 500,
      color: "#fff",
    },

    h2: {
      fontFamily: '"Quicksand",sans-serif',
      fontSize: "2rem",
      [baseTheme.breakpoints.up("sm")]: {
        fontSize: "3rem",
      },
      [baseTheme.breakpoints.up("md")]: {
        fontSize: "4.5rem",
      },
      fontWeight: 500,
      color: "#fff",
    },
    h3: {
      fontFamily: '"Quicksand",sans-serif',
      fontSize: "1.20rem",
      [baseTheme.breakpoints.up("md")]: {
        fontSize: "3rem",
      },
      fontWeight: 500,
      color: "#ffffff",
    },
    h5: {
      fontFamily: '"Quicksand",sans-serif',
      fontSize: "1.20rem",
      [baseTheme.breakpoints.up("md")]: {
        fontSize: "2rem",
      },
      fontWeight: 500,
      color: "#ffffff",
    },
    h6: {
      fontFamily: '"Quicksand",sans-serif',
      fontSize: "1rem",
      color: "#ffffff",
      fontWeight: 500,
    },
    body1: {
      fontFamily: '"Inter",sans-serif',
      fontSize: "0.85rem",
      [baseTheme.breakpoints.up("md")]: {
        fontSize: "1.25rem",
      },
      fontWeight: 300,
      color: "#ffffff",
    },
    body2: {
      fontFamily: '"Quicksand",sans-serif',
      fontSize: "1.1rem",
      fontWeight: 300,
      color: "#ffffff",
    },
    body3: {
      fontFamily: '"Quicksand",sans-serif',
      fontSize: "0.9rem",
      [baseTheme.breakpoints.up("sm")]: {
        fontSize: "1rem",
      },
      [baseTheme.breakpoints.up("md")]: {
        fontSize: "1.10rem",
      },
      fontWeight: 300,
      color: "#ffffff6c",
    },
    body4: {
      fontFamily: '"Quicksand",sans-serif',
      fontSize: "0.9rem",
      [baseTheme.breakpoints.up("sm")]: {
        fontSize: "0.8rem",
      },
      [baseTheme.breakpoints.up("md")]: {
        fontSize: "1rem",
      },
      fontWeight: 300,
      color: "#ffffff2c",
    },
    p1: {
      fontFamily: '"Quicksand",sans-serif',
      fontSize: "0.9rem",
      [baseTheme.breakpoints.up("sm")]: {
        fontSize: "1rem",
      },
      [baseTheme.breakpoints.up("md")]: {
        fontSize: "1.2rem",
      },
      fontWeight: 500,
      color: "#ffffff",
    },
    p2: {
      fontFamily: '"Quicksand",sans-serif',
      fontSize: "0.9rem",
      [baseTheme.breakpoints.up("sm")]: {
        fontSize: "1rem",
      },
      [baseTheme.breakpoints.up("md")]: {
        fontSize: "1.2rem",
      },
      fontWeight: 500,
      color: "#ffffff",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          width: "80%",
          color: "#ffffff",
          boxShadow: "none",
          padding: "0rem 0rem",
          borderRadius: "5rem",
          backdropFilter: "blur(40px)",
          transition:
            "backdrop-filter 500ms ease-in-out, border 500ms ease-in-out",
          "& .MuiToolbar-root": {
            display: "flex",
            justifyContent: "space-between",
          },
          "&:hover": {
            borderColor: "#ffffffc4",
            boxShadow: "none",
          },
        },
      },
    },
    MuiTextField: {
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            borderRadius: "40px",
            marginTop: "0.4rem",
            "& .MuiInputBase-root": {
              color: "#ffffff",
              padding: "0rem",
              fontSize: "1rem",
              backgroundColor: "transparent",
            },
            "& .MuiInputLabel-root": {
              color: "#ffffff",
              fontSize: "1rem",
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px",
              "& fieldset": {
                borderColor: "#ffffff3b",
                backgroundColor: "transparent",
              },
              "&:hover fieldset": {
                borderColor: "#ffffff",
                backgroundColor: "transparent",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ffffff",
                backgroundColor: "transparent",
                // color: "#ffffff",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#000000",
            },
          },
        },
      ],
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "primary" },
          style: {
            borderRadius: "2rem",
            padding: "0.7rem 1.5rem",
            background:
              "linear-gradient(to top right, #421FB4 20%, #F92057 100%)",
            color: "#fff",
            fontWeight: "400",
            fontFamily: '"Quicksand", sans-serif',
            fontSize: "0.75rem",
            [baseTheme.breakpoints.up("sm")]: {
              fontSize: "1rem",
            },
            "&:hover": {
              background: "#000000",
            },
          },
        },
        {
          props: { variant: "secondary" },
          style: {
            borderRadius: "10px",
            padding: "0.7rem 1.5rem",
            background: "black",
            color: "white",
            fontWeight: "600",
            fontFamily: '"Quicksand", sans-serif',
            fontSize: "0.8rem",
            [baseTheme.breakpoints.up("sm")]: {
              fontSize: "1rem",
            },
            "&:hover": {
              background: "#000000d4",
            },
          },
        },
      ],
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "#A97BC5c4",
          color: "#ffffff",
          borderRadius: "10px",
          padding: "8px 10px",
          border: "1px solid #ffffff3b",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: '"Quicksand", sans-serif',
          color: "#ffffff",
          fontSize: "1rem",
          "&:hover": {
            color: "#ffffff",
          },
          "&.Mui-selected": {
            backgroundColor: "#081029",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#0f1f52",
              color: "#ffffff",
            },
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "0.2rem",
          borderRadius: 18,
          border: "0.1rem solid #ffffff66",
          background: "#ffffff40",
          transition: "border ease-in-out 500ms",
          boxShadow: "0rem 0rem 0rem 0rem #ffffff4a",
          backdropFilter: "blur(10px)",
          "&:hover": {
            transformStyle: "preserve-3d",
            border: "1.75px solid white",
            transition: "box-shadow 500ms ease-in-out",
          },
        },
      },
    },
  },
});

export default customTheme;
