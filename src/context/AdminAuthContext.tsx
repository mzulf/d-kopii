
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "inventory_manager" | "user_manager" | "customer";
};

type AdminAuthContextType = {
  adminUser: AdminUser | null;
  isLoading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, role: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate auth check with a delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      // For demo purposes, automatically log in with any email/password
      // In production, this would verify credentials with Supabase
      
      // Mock successful login
      const mockUser: AdminUser = {
        id: "mock-id-123",
        name: email.split('@')[0],
        email,
        role: email.includes('admin') ? "inventory_manager" : "customer"
      };
      
      setAdminUser(mockUser);

      toast({
        title: "Login successful",
        description: `Welcome back, ${mockUser.name}!`,
      });

      if (mockUser.role !== "customer") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string, role: string) => {
    try {
      setIsLoading(true);
      
      // Mock registration - in production this would create a user in Supabase
      toast({
        title: "Registration successful",
        description: `Your ${role} account has been created. You can now log in.`,
      });
      
      navigate("/admin/login");
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      
      // In production this would sign out with Supabase
      setAdminUser(null);
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      
      navigate("/admin/login");
    } catch (error: any) {
      toast({
        title: "Logout failed",
        description: error.message || "An error occurred during logout",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    adminUser,
    isLoading,
    isAdmin: !!adminUser && adminUser.role !== "customer",
    signIn,
    signUp,
    signOut
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};
