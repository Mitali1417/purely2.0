import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/lib/store";
import { styles } from "../../style/tailwindStyles";
import { signupSchema } from "../auth-validation/validationSchema";
import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/api";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: signupSchema,
      onSubmit: async (values, { setSubmitting }) => {
        try {
          const res = await api.post("/auth/register", {
            name: values.username,
            email: values.email,
            password: values.password,
          });
          const { token, user } = res.data;
          localStorage.setItem("auth_token", token);
          login({ id: user.id, email: user.email, name: user.name });
          navigate("/");
        } catch (error: any) {
          alert(error?.response?.data?.message || "Signup failed");
        } finally { setSubmitting(false); }
      },
    });

  return (
    <div
      className={`${styles.flexCenter} relative overflow-hidden min-h-[100vh]`}
    >
      <Card className="w-[90vw] sm:w-[80vw] max-w-md bg-white/30 backdrop-blur-xl border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Signup</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.username && errors.username ? "border-red-500" : ""}
                placeholder="Enter your username"
              />
              {touched.username && errors.username && (
                <p className="text-sm text-red-500">{errors.username}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.email && errors.email ? "border-red-500" : ""}
                placeholder="Enter your email"
              />
              {touched.email && errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.password && errors.password ? "border-red-500" : ""}
                placeholder="Enter your password"
              />
              {touched.password && errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.confirmPassword && errors.confirmPassword ? "border-red-500" : ""}
                placeholder="Confirm your password"
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white"
              loadingText="Creating account..."
            >
              Signup
            </Button>

            <hr className="border-white/10 border-[0.1rem] rounded-full w-full my-[2rem]" />

            <p className="text-center text-white font-light">
              Already have an account?{" "}
              <a href="/login" className="font-medium text-green-400 hover:underline">
                Login here
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
      
      {/* Background Elements */}
      <div
        className="bg-brightGreen2 w-[7rem] h-[7rem] absolute left-[20rem] bottom-0 z-0 rotate-[28deg] blur-[50px] rounded-full"
      />
      <div
        className="bg-warmPink w-[3rem] h-[3rem] absolute left-[16rem] bottom-[5rem] z-0 rotate-[28deg] blur-[40px] rounded-full"
      />
      <div
        className="bg-blue w-[6rem] h-[6rem] absolute right-[18rem] top-[4rem] z-0 blur-[40px] rounded-full"
      />
      <div
        className="bg-coolPurple w-[10rem] h-[10rem] absolute right-[20rem] top-0 z-0 blur-[70px] rounded-full"
      />
    </div>
  );
};

export default Signup;
