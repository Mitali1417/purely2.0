/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "@/lib/store";
import * as Yup from "yup";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Eye, EyeOff, LogIn, User, Loader2 } from "lucide-react";
import api from "@/api";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isGuestLoading, setIsGuestLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: async (values, { setSubmitting }) => {
        setIsLoading(true);
        setError(null);
        try {
          const res = await api.post("/auth/login", {
            email: values.email,
            password: values.password,
          });
          const { token, user } = res.data;
          login({ id: user.id, email: user.email, name: user.name }, token);
          toast.success("Login successful!");
          navigate("/");
        } catch (error: any) {
          const errorMessage = error?.response?.data?.message || "Login failed. Please try again.";
          setError(errorMessage);
        } finally { 
          setSubmitting(false);
          setIsLoading(false);
        }
      },
    });

  const handleGuestLogin = async () => {
    setIsGuestLoading(true);
    setError(null);
    try {
      const res = await api.post('/auth/guest');
      const { token, user } = res.data;
      login({ id: user.id, email: user.email, name: user.name }, token);
      toast.success("Logged in as guest!");
      navigate('/');
    } catch (e: any) {
      const errorMessage = e?.response?.data?.message || 'Guest login failed. Please try again.';
      setError(errorMessage);
    } finally {
      setIsGuestLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-secondary">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`text-muted-foreground {touched.email && errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                placeholder="Enter your email"
                disabled={isLoading || isGuestLoading}
              />
              {touched.email && errors.email && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <span>•</span> {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
              </div>
              <div className="relative">
                <PasswordInput
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`text-muted-foreground {touched.password && errors.password ? "border-red-500 focus-visible:ring-red-500 pr-10" : "pr-10"}`}
                  placeholder="Enter your password"
                  disabled={isLoading || isGuestLoading}
                  type={showPassword ? "text" : "password"}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading || isGuestLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <span>•</span> {errors.password}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || isGuestLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign in
                </>
              )}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full text-secondary h-11"
              onClick={handleGuestLogin}
              disabled={isLoading || isGuestLoading}
            >
              {isGuestLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in as Guest...
                </>
              ) : (
                <>
                  <User className="mr-2 h-4 w-4" />
                  Continue as Guest
                </>
              )}
            </Button>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link 
                  to="/signup" 
                  className="font-medium text-primary hover:underline transition-colors"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>

    </div>
  );
};

export default Login;