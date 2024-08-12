import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { styles } from "../../style/tailwindStyles";
import { loginSchema } from "../auth-validation/validationSchema";
import { TextField, Button, Typography, Box } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        const storedData = JSON.parse(localStorage.getItem("signupData"));
        if (
          storedData &&
          storedData.email === values.email &&
          storedData.password === values.password
        ) {
          console.log("Login successful: ", values);
          login();
          navigate("/");
        } else {
          alert("Invalid email or password.");
          console.error("Invalid email or password.");
        }
      },
    });

  return (
    <Box
      className={`${styles.flexCenter} relative overflow-hidden min-h-[100vh]`}
    >
      <Box
        className={`${styles.flexCenter} flex-col xl:flex-row px-[2rem] sm:px-[3.5rem] md:px-[4rem]  z-10 w-[90vw] sm:w-[80vw] min-h-[70vh] h-full bg-white/30 rounded-2xl backdrop-blur-xl py-[3rem]`}
      >
        <Box className={`${styles.flexCenter} flex-col w-full h-full`}>
          <Typography variant="h2">Login</Typography>
        </Box>
        <form
          onSubmit={handleSubmit}
          className={`${styles.flexBetween} ${styles.paddingX} bg-primary/50 p-[2rem] rounded-[0.8rem] mt-[2rem] md:mt-0 flex-col w-full max-w-[25rem] sm:max-w-[60vw] lg:max-w-[50vw]`}
        >
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />

          <Button
            type="submit"
            variant="secondary"
            className={`hero-btn-glow1`}
            fullWidth
            style={{ marginTop: "2rem" }}
          >
            Login
          </Button>

          <hr
            className={`border-white/10 border-[0.1rem] rounded-full w-full my-[2rem] mb-[1rem]`}
          />

          <Typography variant="p" className={`text-white font-light`}>
            Don't have an account?{" "}
            <a href="/signup" className={`font-medium text-green1`}>
              Signup here
            </a>
          </Typography>
        </form>
      </Box>
      {/* Background Elements */}
      <Box
        className={`bg-brightGreen2 w-[7rem] h-[7rem] absolute left-[20rem] bottom-0 z-0 rotate-[28deg] blur-[50px] rounded-full`}
      />
      <Box
        className={`bg-warmPink  w-[3rem] h-[3rem] absolute left-[16rem] bottom-[5rem] z-0 rotate-[28deg] blur-[40px] rounded-full`}
      />
      <Box
        className={`bg-blue  w-[6rem] h-[6rem] absolute right-[18rem] top-[4rem] z-0 blur-[40px] rounded-full`}
      />
      <Box
        className={`bg-coolPurple w-[10rem] h-[10rem] absolute right-[20rem] top-0 z-0 blur-[70px] rounded-full`}
      />
    </Box>
  );
};

export default Login;
