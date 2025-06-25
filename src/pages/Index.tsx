import { useState } from "react";
import { Helmet } from "react-helmet-async";
import ModernHeader from "@/components/modern/ModernHeader";
import Footer from "@/components/Footer";
import ModernHeroSection from "@/components/home/ModernHeroSection"; // Corrected import
import ServicesGrid from "@/components/home/ServicesGrid";
import AdvancedSpecializedServices from "@/components/home/AdvancedSpecializedServices";
import SpecializedCleaningSection from "@/components/home/SpecializedCleaningSection";
import HighValueServicesSection from "@/components/home/HighValueServicesSection";
import CityCard from "@/components/home/CityCard";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import SpecialOffersSection from "@/components/SpecialOffersSection";
import ModernFloatingButtons from "@/components/modern/ModernFloatingButtons";
import IntelligentLiveChat from "@/components/IntelligentLiveChat";
import BookingModal from "@/components/BookingModal";
import { Button } from "@/components/ui/button";
import { MapPin, Sparkles } from "lucide-react";
import { servicesData } from "@/data/servicesData";
import { citiesData } from "@/data/citiesData";
import OrganizationSchema from "@/components/SEO/OrganizationSchema";
import LocalBusinessSchema from "@/components/SEO/LocalBusinessSchema";
import WebsiteSchema from "@/components/SEO/WebsiteSchema";
import { useNotification } from "@/components/ui/notification";

const Index = () => {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [showAI, setShowAI] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { success } = useNotification();

  const handleBookService = (serviceName: string) => {
    setSelectedService(serviceName);
    setShowBooking(true);
    success("تم تحديد الخدمة", `تم اختيار خدمة ${serviceName} بنجاح.`);
  };

  const handleSearchResults = (results: any[]) => {
    setSearchResults(results);
    // You can add logic here to display results if needed
  };

  const testimonials = [
    {
      name: "أحمد محمد",
      location: "خميس مشيط",
      service: "تنظيف منازل",
      rating: 5,
      comment: "خدمة ممتازة وفريق محترف من توب كلينرز. أنصح بشدة بهذه الشركة.",
      date: "2024-01-15"
    },
    {
      name: "فاطمة علي",
      location: "أبها", 
      service: "صيانة مكيفات",
      rating: 5,
      comment: "سرعة في الاستجابة وجودة عالية في العمل. شكراً لتوب كلينرز.",
      date: "2024-01-10"
    },
    {
      name: "سعد الشهري",
      location: "حفر الباطن",
      service: "مكافحة حشرات", 
      rating: 4,
      comment: "تم حل مشكلة الحشرات نهائياً. فريق متخصص ومعدات حديثة.",
      date: "2024-01-08"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-arabic" dir="rtl">
      <Helmet>
        <title>توب كلينرز | خدمات تنظيف وصيانة احترافية بالسعودية (عسير والشرقية)</title>
        <meta name="description" content="توب كلينرز: خدمات منزلية موثوقة في منطقة عسير والشرقية. متخصصون في التنظيف، مكافحة الحشرات، كشف التسريبات، والعزل. اطلب عرض سعر مجاني!" />
        <meta name="keywords" content="توب كلينرز, شركة تنظيف, صيانة منزلية, مكافحة حشرات, رش دفان, كشف تسريبات, عزل فوم, خميس مشيط, أبها, حفر الباطن, السعودية" />
      </Helmet>

      <OrganizationSchema />
      <LocalBusinessSchema />
      <WebsiteSchema />

      <ModernHeader />
      
      <main>
        <ModernHeroSection 
          onBookService={handleBookService}
          onSearchResults={handleSearchResults}
          onShowAIRecommendations={() => setShowAI(true)}
        />
        
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full px-6 py-2 mb-6">
                <Sparkles className="h-4 w-4 text-blue-600" />
                <span className="text-blue-800 font-medium">خدماتنا المتميزة</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                اختر الخدمة التي تحتاجها
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                نقدم مجموعة شاملة من الخدمات المنزلية بجودة عالية وأسعار تنافسية
              </p>
            </div>
            
            <ServicesGrid 
              services={servicesData} 
              onBookService={handleBookService}
            />
          </div>
        </section>

        <HighValueServicesSection onBookService={handleBookService} />
        <AdvancedSpecializedServices onBookService={handleBookService} />
        <SpecializedCleaningSection onBookService={handleBookService} />

        <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full px-6 py-2 mb-6">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span className="text-blue-800 font-medium">اختر محافظتك</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                نخدم جميع مدن المملكة
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                فرق متخصصة في كل محافظة لضمان أفضل خدمة
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {citiesData.slice(0, 8).map(city => (
                <CityCard key={city.slug} city={city} />
              ))}
            </div>

            <div className="text-center">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                onClick={() => window.location.href = '/sa'}
              >
                <MapPin className="h-5 w-5 ml-2" />
                عرض جميع المحافظات
              </Button>
            </div>
          </div>
        </section>

        <StatsSection />
        <TestimonialsSection testimonials={testimonials} />
        <SpecialOffersSection />
        <FAQSection />
      </main>

      <Footer />
      <ModernFloatingButtons onShowAI={() => setShowAI(true)} />

      <BookingModal 
        isOpen={showBooking} 
        onClose={() => setShowBooking(false)}
        serviceName={selectedService}
      />

      {showAI && (
        <IntelligentLiveChat 
          currentPage="home"
          cityName=""
          serviceName=""
        />
      )}
    </div>
  );
};

export default Index;