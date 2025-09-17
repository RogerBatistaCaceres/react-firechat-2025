import { toast } from "sonner";
import { Button } from "./button";
import { CardFooter } from "./card";
import { useAuthAction } from "@/hooks/use-auth-actions";
// esto es una libreria de iconos
import { Mail } from "lucide-react";
import { Link } from "react-router";

interface Props {
  type: "login" | "register";
  loading: boolean;
}

const CardFooterAuth = ({ type, loading }: Props) => {
  const isLogin = type === "login";

  const { loginWithGoogle } = useAuthAction();
  const handleLoginWithGoogle = async () => {
    const result = await loginWithGoogle();
    if (result.success) {
      console.log("Login successful");
    } else {
      console.error("Login failed:", result.error);
      toast.error("Login failed");
    }
  };
  return (
    <CardFooter className="flex flex-col item-center gp-4">
      <Button
        onClick={handleLoginWithGoogle}
        className="w-full"
        disabled={loading}
        variant="outline"
      >
        <Mail className="mr-2" />
        {isLogin ? "Login with Google" : "Register with Google"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        {isLogin ? "Dont have an account? " : "Already have an account?"}
        <Link to={isLogin ? "/auth/register" : "/auth/login"}>
          <Button variant="link" className="p-0 h-auto font-normal">
            {isLogin ? "Register" : "Sign in"}
          </Button>
        </Link>
      </p>
    </CardFooter>
  );
};
export default CardFooterAuth;
