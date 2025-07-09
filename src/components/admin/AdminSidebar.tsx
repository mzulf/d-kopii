
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { cn } from "@/lib/utils";
import {
  Coffee,
  Package,
  Users,
  BarChart,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ShoppingBag
} from "lucide-react";
import { Button } from "@/components/ui/button";

type SidebarNavItemProps = {
  icon: React.ReactNode;
  title: string;
  href: string;
  isActive: boolean;
  onClick?: () => void;
  children?: {
    title: string;
    href: string;
  }[];
};

const SidebarNavItem = ({
  icon,
  title,
  href,
  isActive,
  onClick,
  children,
}: SidebarNavItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = children && children.length > 0;
  
  const handleToggle = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div className="relative">
      <Link
        to={hasChildren ? "#" : href}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors",
          isActive && !hasChildren && "bg-muted font-medium"
        )}
        onClick={hasChildren ? handleToggle : undefined}
      >
        <span className="text-muted-foreground">{icon}</span>
        <span className="flex-1">{title}</span>
        {hasChildren && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(!isOpen);
            }}
            className="text-muted-foreground"
          >
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        )}
      </Link>
      
      {hasChildren && isOpen && (
        <div className="ml-6 mt-1 space-y-1 border-l pl-3 border-muted-foreground/20">
          {children.map((child) => (
            <Link
              key={child.href}
              to={child.href}
              className={cn(
                "flex py-1.5 text-sm transition-colors hover:text-foreground",
                window.location.pathname === child.href
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              )}
            >
              {child.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const AdminSidebar = ({ isMobile, setIsMobileOpen }: { isMobile?: boolean; setIsMobileOpen?: (open: boolean) => void }) => {
  const location = useLocation();
  const { signOut, adminUser } = useAdminAuth();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="h-full flex flex-col bg-background border-r">
      {/* Admin Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <Link to="/admin/dashboard" className="flex items-center gap-2 font-serif">
          <Coffee className="h-5 w-5 text-coffee-dark" />
          <span className="font-bold text-lg">D'Kopi Admin</span>
        </Link>
        {isMobile && setIsMobileOpen && (
          <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      {/* Admin Profile */}
      <div className="py-4 px-3 border-b">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-coffee-dark/20 flex items-center justify-center text-coffee-dark font-medium">
            {adminUser?.name.charAt(0) || "A"}
          </div>
          <div className="overflow-hidden">
            <p className="font-medium truncate">{adminUser?.name || "Admin User"}</p>
            <p className="text-sm text-muted-foreground truncate">{adminUser?.role || "Manager"}</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1 text-sm">
        <SidebarNavItem
          icon={<BarChart size={18} />}
          title="Dashboard"
          href="/admin/dashboard"
          isActive={isActive("/admin/dashboard")}
        />
        
        <SidebarNavItem
          icon={<Coffee size={18} />}
          title="Products"
          href="#"
          isActive={location.pathname.includes("/admin/products")}
          children={[
            {
              title: "All Products",
              href: "/admin/products"
            },
            {
              title: "Add Product",
              href: "/admin/products/add"
            },
            {
              title: "Categories",
              href: "/admin/products/categories"
            }
          ]}
        />
        
        <SidebarNavItem
          icon={<Package size={18} />}
          title="Inventory"
          href="/admin/inventory"
          isActive={isActive("/admin/inventory")}
        />
        
        <SidebarNavItem
          icon={<Users size={18} />}
          title="Users"
          href="/admin/users"
          isActive={isActive("/admin/users")}
        />

        <SidebarNavItem
          icon={<ShoppingBag size={18} />}
          title="Orders"
          href="/admin/orders"
          isActive={isActive("/admin/orders")}
        />

        <SidebarNavItem
          icon={<Settings size={18} />}
          title="Settings"
          href="/admin/settings"
          isActive={isActive("/admin/settings")}
        />
      </nav>
      
      {/* Footer */}
      <div className="p-3 border-t mt-auto">
        <Button
          variant="outline"
          size="sm"
          className="w-full flex items-center gap-2 justify-start"
          onClick={signOut}
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
