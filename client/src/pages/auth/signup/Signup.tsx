import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "@/lib/store";
import { signupSchema } from "../../../auth/auth-validation/validationSchema";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, UserPlus, Loader2, User, Mail, Lock, Check } from "lucide-react";
import api from "@/api";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

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
        setIsLoading(true);
        setError(null);
        try {
          const res = await api.post("/auth/register", {
            name: values.username,
            email: values.email,
            password: values.password,
          });
          const { token, user } = res.data;
          localStorage.setItem("auth_token", token);
          login({ id: user.id, email: user.email, name: user.name }, token);
          toast.success("Signup successful!");
          navigate("/");
        } catch (error: any) {
          const errorMessage = error?.response?.data?.message || "Signup failed. Please try again.";
          setError(errorMessage);
        } finally { 
          setSubmitting(false);
          setIsLoading(false);
        }
      },
    });

  // Handle password change and check strength
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    const password = e.target.value;
    let strength = 0;
    
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-200";
    if (passwordStrength === 1) return "bg-red-500";
    if (passwordStrength === 2) return "bg-yellow-500";
    if (passwordStrength === 3) return "bg-blue-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";
    return "Strong";
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8  relative overflow-hidden">

      <Card className="w-full max-w-md z-10">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-secondary">Create Account</CardTitle>
          <CardDescription className="text-gray-600">
            Join us to start your beauty journey
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
              <Label htmlFor="username" className="text-gray-700 flex items-center gap-1">
                <User className="h-4 w-4" />
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`text-muted-foreground {touched.username && errors.username ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                placeholder="Enter your username"
                disabled={isLoading}
              />
              {touched.username && errors.username && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <span>•</span> {errors.username}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 flex items-center gap-1">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`text-muted-foreground {touched.email && errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                placeholder="Enter your email"
                disabled={isLoading}
              />
              {touched.email && errors.email && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <span>•</span> {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 flex items-center gap-1">
                <Lock className="h-4 w-4" />
                Password
              </Label>
              <div className="relative">
                <PasswordInput
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handlePasswordChange}
                  onBlur={handleBlur}
                  className={`text-muted-foreground {touched.password && errors.password ? "border-red-500 focus-visible:ring-red-500 pr-10" : "pr-10"}`}
                  placeholder="Create a password"
                  disabled={isLoading}
                  type={showPassword ? "text" : "password"}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              
              {/* Password strength indicator */}
              {values.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Password strength</span>
                    <span className={`text-xs font-medium ${
                      passwordStrength === 1 ? "text-red-500" :
                      passwordStrength === 2 ? "text-yellow-500" :
                      passwordStrength === 3 ? "text-blue-500" :
                      passwordStrength >= 4 ? "text-green-500" : "text-gray-500"
                    }`}>
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${getPasswordStrengthColor()}`}
                      style={{ width: `${(passwordStrength / 4) * 100}%` }}
                    ></div>
                  </div>
                  
                  {/* Password requirements */}
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      {values.password.length >= 8 ? (
                        <Check className="h-3 w-3 text-green-500" />
                      ) : (
                        <span className="w-3 h-3 rounded-full border border-gray-300 inline-block"></span>
                      )}
                      At least 8 characters
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      {/[A-Z]/.test(values.password) ? (
                        <Check className="h-3 w-3 text-green-500" />
                      ) : (
                        <span className="w-3 h-3 rounded-full border border-gray-300 inline-block"></span>
                      )}
                      One uppercase letter
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      {/[0-9]/.test(values.password) ? (
                        <Check className="h-3 w-3 text-green-500" />
                      ) : (
                        <span className="w-3 h-3 rounded-full border border-gray-300 inline-block"></span>
                      )}
                      One number
                    </p>
                  </div>
                </div>
              )}
              
              {touched.password && errors.password && (
                <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                  <span>•</span> {errors.password}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
              <div className="relative">
                <PasswordInput
                  id="confirmPassword"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`text-muted-foreground {touched.confirmPassword && errors.confirmPassword ? "border-red-500 focus-visible:ring-red-500 pr-10" : "pr-10"}`}
                  placeholder="Confirm your password"
                  disabled={isLoading}
                  type={showConfirmPassword ? "text" : "password"}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <span>•</span> {errors.confirmPassword}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create Account
                </>
              )}
            </Button>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link 
                  to="/login" 
                  className="font-medium text-primary hover:underline transition-colors"
                >
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;