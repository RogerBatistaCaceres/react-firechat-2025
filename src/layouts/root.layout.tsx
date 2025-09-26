import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner";

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Outlet />
      <Toaster position="top-right" richColors />
    </div>
  );
};
export default RootLayout;
