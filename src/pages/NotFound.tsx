import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import ModernHeader from "@/components/modern/ModernHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";
import { AlertTriangle, Home, Wrench, Phone } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // For logging purposes
    console.error(
      `404 Error: User attempted to access non-existent route: ${location.pathname}`
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 font-arabic flex flex-col" dir="rtl">
      <ModernHeader />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center p-8 max-w-2xl mx-auto">
          <div className="flex justify-center mb-6">
            <AlertTriangle className="h-16 w-16 text-yellow-500" />
          </div>
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            عذراً، الصفحة التي تبحث عنها غير موجودة.
          </h2>
          <p className="text-gray-600 mb-8">
            ربما تم حذف الصفحة أو تغيير الرابط. يمكنك البحث عن ما تحتاجه أو العودة إلى الصفحة الرئيسية.
          </p>
          
          <div className="max-w-md mx-auto mb-8">
            <SearchBar placeholder="ابحث عن خدمة أو مدينة..." />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/">
                <Home className="ml-2 h-4 w-4" />
                العودة للرئيسية
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/sa">
                <Wrench className="ml-2 h-4 w-4" />
                عرض جميع الخدمات
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">
                <Phone className="ml-2 h-4 w-4" />
                اتصل بنا
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;