import { Button } from "@/components/ui/button";
import { useAuthAction } from "@/hooks/use-auth-actions";
import { useUser } from "reactfire";

const DashboardPage = () => {
  const { data: user } = useUser();
  const { logout } = useAuthAction();
  return (
    <div className="container mx-auto p-4">
      <h1>DashboardPage</h1>
      <p>Welcome, {user?.displayName || "Guest"}</p>
      <p>Email: {user?.email || "Not provided"}</p>
      <Button variant={"destructive"} onClick={logout}>
        Sign Out
      </Button>
    </div>
  );
};
export default DashboardPage;
