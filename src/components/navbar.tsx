import { useAuthAction } from "@/hooks/use-auth-actions";
import {
  LayoutDashboard,
  MessageCircle,
  User,
  LogOut,
  ClipboardCheck,
  Menu,
  X,
} from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Chat", href: "/admin/chat", icon: MessageCircle },
  { name: "Profile", href: "/admin/profile", icon: User },
  { name: "Tasks", href: "/admin/tasks", icon: ClipboardCheck },
];

const Nabvar = () => {
  const { logout } = useAuthAction();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <nav className="px-4 mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand - Add your logo here if needed */}
          <div className="flex items-center">
            <span className="text-xl font-semibold text-primary">FireChat</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/80 hover:bg-muted"
                  )
                }
                end
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </NavLink>
            ))}
            <Button
              onClick={logout}
              variant="ghost"
              className="text-foreground/80 hover:bg-destructive hover:text-destructive-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-2 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/80 hover:bg-muted"
                  )
                }
                onClick={() => setIsMobileMenuOpen(false)}
                end
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </NavLink>
            ))}
            <Button
              onClick={() => {
                setIsMobileMenuOpen(false);
                logout();
              }}
              variant="ghost"
              className="w-full justify-start text-foreground/80 hover:bg-destructive hover:text-destructive-foreground"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};
export default Nabvar;
