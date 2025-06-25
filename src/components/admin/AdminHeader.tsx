
import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
  onLogout: () => void;
}

const AdminHeader = ({ onLogout }: AdminHeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">لوحة الإدارة المتقدمة</h1>
          <Button variant="outline" onClick={onLogout}>
            تسجيل الخروج
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
