import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import AdminHeader from "./AdminHeader";
import { LoadingPage } from "@/components/ui/loading";
import AdminLogin from "./AdminLogin";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { isAuthenticated, isLoading, signOut } = useAuth();

  if (isLoading) {
    return <LoadingPage text="جاري تحميل النظام..." />;
  }

  if (!isAuthenticated) {
    // Removed the unused onLogin prop from the component call.
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-gray-100 font-arabic" dir="rtl">
      <AdminHeader onLogout={signOut} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;