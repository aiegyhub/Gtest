import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // Corrected: Import Helmet directly
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  MapPin, 
  Wrench, 
  FileText, 
  Phone, 
  Info,
  Shield,
  ScrollText,
  Building,
  Users,
  Menu,
  Globe,
  Clock
} from "lucide-react";
import ModernHeader from "@/components/modern/ModernHeader";
import Footer from "@/components/Footer";
import { citiesData } from "@/data/citiesData";
import { servicesData } from "@/data/servicesData";
import { useMemo } from "react";

const Sitemap = () => {
  const stats = useMemo(() => {
    const totalCities = citiesData.length;
    const totalServices = servicesData.length;
    const totalNeighborhoods = citiesData.reduce(
      (total, city) => total + (city.neighborhoods?.length || 0), 0
    );
    const totalPages = totalCities + totalServices + totalNeighborhoods + 6;
    
    return {
      totalCities,
      totalServices,
      totalNeighborhoods,
      totalPages
    };
  }, []);

  const mainPages = [
    { title: "الصفحة الرئيسية", path: "/", icon: Home, description: "الصفحة الرئيسية لتوب كلينرز" },
    { title: "خدمات المملكة", path: "/sa", icon: Building, description: "جميع الخدمات المتاحة في السعودية" },
    { title: "من نحن", path: "/about", icon: Users, description: "معلومات عن توب كلينرز" },
    { title: "اتصل بنا", path: "/contact", icon: Phone, description: "تواصل مع فريق توب كلينرز" },
    { title: "الشروط والأحكام", path: "/terms", icon: FileText, description: "شروط وأحكام استخدام الموقع" },
    { title: "سياسة الخصوصية", path: "/privacy", icon: Shield, description: "سياسة حماية البيانات والخصوصية" }
  ];

  return (
    <>
      <Helmet>
        <title>خريطة الموقع | توب كلينرز</title>
        <meta name="description" content="خريطة شاملة لجميع صفحات وخدمات توب كلينرز في المملكة العربية السعودية. تنقل بسهولة إلى خدمات التنظيف والصيانة في مدينتك." />
        <meta name="keywords" content="خريطة الموقع, توب كلينرز, جميع الخدمات, جميع المدن, sitemap" />
        <link rel="canonical" href="https://top-cleaners.net/sitemap" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 font-arabic" dir="rtl">
        <ModernHeader />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Globe className="h-10 w-10 text-blue-600" />
              <h1 className="text-4xl font-bold text-gray-900">
                خريطة الموقع
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-6">
              دليل شامل لجميع صفحات وخدمات توب كلينرز في المملكة العربية السعودية
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.totalPages.toLocaleString()}</div>
                  <div className="text-sm text-blue-700 font-medium">إجمالي الصفحات</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.totalCities}</div>
                  <div className="text-sm text-green-700 font-medium">المدن</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">{stats.totalServices}</div>
                  <div className="text-sm text-orange-700 font-medium">الخدمات</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{stats.totalNeighborhoods.toLocaleString()}</div>
                  <div className="text-sm text-purple-700 font-medium">الأحياء</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <ScrollText className="h-5 w-5" />
                  الصفحات الرئيسية
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                {mainPages.map((page, index) => (
                  <Link key={index} to={page.path} className="flex items-center gap-3 p-4 rounded-lg hover:bg-blue-50 transition-colors group border">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <page.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-700">{page.title}</h3>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <Wrench className="h-5 w-5" />
                  الخدمات الرئيسية ({stats.totalServices})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3 max-h-96 overflow-y-auto">
                {servicesData.map((service, index) => (
                  <Link key={index} to={`/services/${service.slug}`} className="flex items-center gap-3 p-4 rounded-lg hover:bg-orange-50 transition-colors group border">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                      <service.icon className="h-5 w-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-orange-700">{service.name}</h3>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <MapPin className="h-5 w-5" />
                  المدن والأحياء ({stats.totalCities} مدينة)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {citiesData.map((city, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50">
                      <Link to={`/sa/${city.slug}`} className="flex items-center gap-3 hover:text-green-700 transition-colors group mb-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                          <MapPin className="h-5 w-5 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-green-700">{city.name}</h3>
                      </Link>
                      {city.neighborhoods && city.neighborhoods.length > 0 && (
                        <div className="space-y-2 border-t pt-2 mt-2">
                          {city.neighborhoods.slice(0, 3).map((neighborhood, nIndex) => (
                            <Link key={nIndex} to={`/sa/${city.slug}`} className="block text-xs text-gray-600 hover:text-green-600 transition-colors">
                              - {neighborhood.name}
                            </Link>
                          ))}
                          {city.neighborhoods.length > 3 && <span className="text-xs text-gray-500 italic">والمزيد...</span>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Sitemap;