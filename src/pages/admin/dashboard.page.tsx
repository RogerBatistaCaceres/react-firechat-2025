import { Button } from "@/components/ui/button";
import { useAuthAction } from "@/hooks/use-auth-actions";
import { useUser } from "reactfire";
import { Card } from "@/components/ui/card";
import {
  UserCircle2,
  Mail,
  MessageSquare,
  Clock,
  Activity,
} from "lucide-react";

const DashboardPage = () => {
  const { data: user } = useUser();
  const { logout } = useAuthAction();

  // Obtener la fecha actual
  const currentDate = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          {currentDate.charAt(0).toUpperCase() + currentDate.slice(1)}
        </p>
      </section>

      {/* User Info Section */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6 space-y-2">
          <div className="flex items-center gap-2 text-primary">
            <UserCircle2 className="h-5 w-5" />
            <h2 className="font-semibold">Perfil</h2>
          </div>
          <p className="text-2xl font-bold">
            {user?.displayName || "Invitado"}
          </p>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center gap-2 text-primary">
            <Mail className="h-5 w-5" />
            <h2 className="font-semibold">Email</h2>
          </div>
          <p className="text-2xl font-bold truncate">
            {user?.email || "No proporcionado"}
          </p>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center gap-2 text-primary">
            <Clock className="h-5 w-5" />
            <h2 className="font-semibold">Último acceso</h2>
          </div>
          <p className="text-2xl font-bold">
            {user?.metadata.lastSignInTime
              ? new Date(user.metadata.lastSignInTime).toLocaleString("es-ES")
              : "No disponible"}
          </p>
        </Card>
      </section>

      {/* Activity Section */}
      <section className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-primary">
              <Activity className="h-5 w-5" />
              <h2 className="font-semibold">Estado de la cuenta</h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm text-muted-foreground">Activo</span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Tu cuenta está activa y verificada. Puedes usar todas las
              funcionalidades de la aplicación.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-destructive hover:text-destructive-foreground hover:bg-destructive"
              onClick={logout}
            >
              Cerrar sesión
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 text-primary mb-4">
            <MessageSquare className="h-5 w-5" />
            <h2 className="font-semibold">Actividad reciente</h2>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Explora las diferentes secciones de la aplicación usando la barra
              de navegación. Puedes:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                Chatear con otros usuarios
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                Gestionar tu perfil
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                Administrar tus tareas
              </li>
            </ul>
          </div>
        </Card>
      </section>
    </div>
  );
};
export default DashboardPage;
