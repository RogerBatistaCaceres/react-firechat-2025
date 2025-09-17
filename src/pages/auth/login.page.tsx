import { useAuthAction } from "../../hooks/use-auth-actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CardFooterAuth from "@/components/ui/card-footer-auth";

const LoginPage = () => {
  const { loading } = useAuthAction();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Login to your account using email and password or with Google.
        </CardDescription>
      </CardHeader>
      <CardContent>...</CardContent>
      <CardFooterAuth type="login" loading={loading} />
    </Card>
  );
};
export default LoginPage;
