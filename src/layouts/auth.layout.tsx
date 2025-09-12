import { Navigate, Outlet } from "react-router";
import { useSigninCheck } from "reactfire";

const AuthLayout = () => {
  const { status, data: signInCheckResult, hasEmitted } = useSigninCheck();

  // Mostrar Loading mientras se verifica el estado de inicio de sesion
  if (status === "loading" || !hasEmitted) {
    return <div>Loading...</div>;
  }

  //Redirigir el usuario si ya está autenticado
  if (status === "success" && signInCheckResult.signedIn) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};
export default AuthLayout;
