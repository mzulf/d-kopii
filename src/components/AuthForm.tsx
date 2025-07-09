
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Key, User, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type AuthFormType = "login" | "register" | "forgotPassword";

interface AuthFormProps {
  type: AuthFormType;
}

const AuthForm = ({ type }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate fields
    if (type === "register" && password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Determine where to redirect based on role
    const redirectPath = isAdmin ? "/admin/login" : "/";

    // Simulate API call
    setTimeout(() => {
      switch (type) {
        case "login":
          toast({
            title: "Login successful",
            description: `Welcome back to D'Kopi${isAdmin ? " Admin" : ""}!`,
          });
          navigate(isAdmin ? "/admin/dashboard" : "/");
          break;
        case "register":
          toast({
            title: "Registration successful",
            description: `Your ${isAdmin ? "admin" : "customer"} account has been created.`,
          });
          navigate(isAdmin ? "/admin/login" : "/login");
          break;
        case "forgotPassword":
          toast({
            title: "Reset email sent",
            description: "Check your email for password reset instructions.",
          });
          navigate("/login");
          break;
      }
      setIsLoading(false);
    }, 1500);
  };

  const renderTitle = () => {
    switch (type) {
      case "login":
        return "Log in to your account";
      case "register":
        return "Create an account";
      case "forgotPassword":
        return "Reset your password";
    }
  };

  const renderDescription = () => {
    switch (type) {
      case "login":
        return "Enter your credentials to access your account";
      case "register":
        return "Fill in your details to create a new account";
      case "forgotPassword":
        return "Enter your email and we'll send you a reset link";
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-serif">{renderTitle()}</CardTitle>
        <CardDescription>{renderDescription()}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {type === "register" && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {type !== "forgotPassword" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {type === "login" && (
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-coffee-accent hover:underline"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
          )}

          {type === "register" && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          )}
          
          {/* Account type checkbox */}
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox 
              id="admin" 
              checked={isAdmin} 
              onCheckedChange={() => setIsAdmin(!isAdmin)} 
            />
            <Label htmlFor="admin" className="text-sm font-medium leading-none cursor-pointer">
              {type === "login" ? "Login as admin" : "Register as admin"}
            </Label>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col">
          <Button
            type="submit"
            className="w-full bg-coffee-dark hover:bg-coffee-accent"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                <span>Processing...</span>
              </div>
            ) : type === "login" ? (
              "Log in"
            ) : type === "register" ? (
              "Create account"
            ) : (
              "Send reset link"
            )}
          </Button>
          
          <div className="mt-4 text-center text-sm">
            {type === "login" ? (
              <p>
                Don't have an account?{" "}
                <Link to="/register" className="text-coffee-accent hover:underline">
                  Sign up
                </Link>
              </p>
            ) : type === "register" ? (
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-coffee-accent hover:underline">
                  Log in
                </Link>
              </p>
            ) : (
              <p>
                Remember your password?{" "}
                <Link to="/login" className="text-coffee-accent hover:underline">
                  Back to login
                </Link>
              </p>
            )}
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AuthForm;
