import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CardFooterAuth from "@/components/ui/card-footer-auth";
import { useAuthAction } from "@/hooks/use-auth-actions";

const RegisterPage = () => {
  const { loading } = useAuthAction();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          Register to your account using email and password or with Google.
        </CardDescription>
      </CardHeader>
      <CardContent>...</CardContent>
      <CardFooterAuth type="register" loading={loading} />
    </Card>
  );
};
export default RegisterPage;
