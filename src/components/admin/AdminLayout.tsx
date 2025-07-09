
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/context/AdminAuthContext";
import AdminSidebar from "./AdminSidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

type AdminLayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { adminUser, isLoading, isAdmin } = useAdminAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Redirect if not admin and finished loading
    if (!isLoading && !isAdmin) {
      navigate("/admin/login");
    }
  }, [isAdmin, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/10">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin h-10 w-10 border-4 border-coffee-dark border-t-transparent rounded-full"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Mobile Sidebar Drawer */}
      {isMobile && (
        <div
          className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-opacity duration-300 ${
            isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className={`fixed inset-y-0 left-0 w-64 bg-background transition-transform duration-300 ${
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}>
            <AdminSidebar isMobile={true} setIsMobileOpen={setIsMobileOpen} />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="hidden md:block md:w-64 shrink-0">
          <div className="sticky top-0 h-screen overflow-y-auto">
            <AdminSidebar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <h1 className="text-xl font-serif font-medium">
              {title || "Admin Dashboard"}
            </h1>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
