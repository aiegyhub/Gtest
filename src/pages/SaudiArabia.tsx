import { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ModernHeader from "@/components/modern/ModernHeader";
import Footer from "@/components/Footer";
import ModernFloatingButtons from "@/components/modern/ModernFloatingButtons";
import IntelligentLiveChat from "@/components/IntelligentLiveChat";
import CityCard from "@/components/home/CityCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Users, Star, Clock, Sparkles } from "lucide-react";
import { citiesData } from "@/data/citiesData";

// Schema imports
import OrganizationSchema from "@/components/SEO/OrganizationSchema";
import LocalBusinessSchema from "@/components/SEO/LocalBusinessSchema";
import BreadcrumbSchema from "@/components/SEO/BreadcrumbSchema";
import ServiceAreaSchema from "@/components/SEO/ServiceAreaSchema";

const SaudiArabia = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCities, setFilteredCities] = useState(citiesData);
  const [showAI, setShowAI] = useState(false);

  useEffect(() => {
    const results = citiesData.filter(city =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCities(results);
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const breadcrumbs = useMemo(() => [
    { name: "الرئيسية", url: "https://top-cleaners.net/", position: 1 },
    { name: "الخدمات في السعودية", url: "https://top-cleaners.net/sa", position: 2 }
  ], []);

  const allServiceAreas = useMemo(() => 
    citiesData.map(city => city.name), 
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-arabic" dir="rtl">
      <Helmet>
        <title>خدماتنا في جميع مدن السعودية | توب كلينرز (عسير والشرقية)</title>
        <meta name="description" content={`نقدم خدمات التنظيف والصيانة في ${citiesData.length} مدينة ومنطقة سعودية، مع التركيز على منطقة عسير والمنطقة الشرقية. احجز أفضل خدمة لمنطقتك.`} />
        <meta name="keywords" content="خدمات منزلية, السعودية, الرياض, جدة, الدمام, خميس مشيط, أبها, حفر الباطن, توب كلينرز" />
      </Helmet>

      {/* Schema Markup */}
      <OrganizationSchema />
      <LocalBusinessSchema />
      <BreadcrumbSchema breadcrumbs={breadcrumbs} />
      <ServiceAreaSchema 
        serviceName="خدمات التنظيف والصيانة المنزلية"
        serviceAreas={allServiceAreas}
      />

      <ModernHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full px-6 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-blue-800 font-medium">اختر مدينتك لأفضل خدمة</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              خدمات توب كلينرز في المملكة
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            نقدم خدمات تنظيف وصيانة احترافية في جميع مدن المملكة العربية السعودية. 
            ابحث عن مدينتك للعثور على أفضل الخدمات.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
            {[
              { icon: MapPin, number: `${citiesData.length}`, label: "مدينة" },
              { icon: Users, number: "25,000+", label: "عميل راضي" },
              { icon: Star, number: "4.9/5", label: "تقييم العملاء" },
              { icon: Clock, number: "24/7", label: "خدمة متاحة" }
            ].map((stat, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <nav className="mb-6 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600 transition-colors">الرئيسية</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">خدمات توب كلينرز في المملكة</span>
        </nav>

        {/* Enhanced Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="ابحث عن مدينتك..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pr-12 pl-4 py-4 text-lg border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cities Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              المدن المتاحة ({filteredCities.length})
            </h2>
            {searchTerm && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                نتائج البحث عن: {searchTerm}
              </Badge>
            )}
          </div>
          
          {filteredCities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredCities.map(city => (
                <CityCard key={city.slug} city={city} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center bg-white border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="text-gray-400 mb-4">
                  <MapPin className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  لم نجد نتائج للبحث
                </h3>
                <p className="text-gray-600 mb-6">
                  جرب البحث بكلمات أخرى أو تصفح جميع المدن المتاحة
                </p>
                <Button 
                  onClick={() => setSearchTerm("")}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  عرض جميع المدن
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">هل تحتاج مساعدة في اختيار الخدمة المناسبة؟</h2>
          <p className="text-xl mb-8">تواصل معنا الآن وسنساعدك في العثور على أفضل الخدمات في منطقتك</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              اتصل بنا الآن
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              تواصل عبر واتساب
            </Button>
          </div>
        </div>
      </main>

      <Footer />
      <ModernFloatingButtons onShowAI={() => setShowAI(true)} />

      {showAI && (
        <IntelligentLiveChat 
          currentPage="cities"
          cityName=""
          serviceName=""
        />
      )}
    </div>
  );
};

export default SaudiArabia;