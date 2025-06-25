import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import CityServicesGrid from "@/components/city/CityServicesGrid";
import CityNeighborhoods from "@/components/city/CityNeighborhoods";
import CityCallToAction from "@/components/city/CityCallToAction";
import CityHeader from "@/components/city/CityHeader";
import BookingModal from "@/components/BookingModal";
import ModernFloatingButtons from "@/components/modern/ModernFloatingButtons";
import ModernHeader from "@/components/modern/ModernHeader";
import Footer from "@/components/Footer";
import { useState, useMemo } from "react";
import { citiesData } from "@/data/citiesData";
import { City } from "@/types/services";
import BreadcrumbSchema from "@/components/SEO/BreadcrumbSchema";

const CityServices = () => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const city = useMemo(() => citiesData.find((c: City) => c.slug === citySlug), [citySlug]);

  if (!city) {
    return <Navigate to="/404" replace />;
  }

  const handleBookService = (serviceName: string) => {
    setSelectedService(serviceName);
    setShowBookingModal(true);
  };
  
  const breadcrumbs = [
    { name: "الرئيسية", url: "https://top-cleaners.net/", position: 1 },
    { name: "الخدمات في السعودية", url: "https://top-cleaners.net/sa", position: 2 },
    { name: city.name, url: `https://top-cleaners.net/sa/${city.slug}`, position: 3 }
  ];

  const cityStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `خدمات منزلية في ${city.name}`,
    "description": `استعراض جميع الخدمات المنزلية التي تقدمها توب كلينرز في مدينة ${city.name}، بما في ذلك التنظيف، الصيانة، ومكافحة الحشرات.`,
    "url": `https://top-cleaners.net/sa/${city.slug}`,
    "about": {
      "@type": "City",
      "name": city.name,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "SA"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>خدمات منزلية في {city.name} | توب كلينرز</title>
        <meta
          name="description"
          content={`توب كلينرز تقدم أفضل خدمات التنظيف، الصيانة، ومكافحة الحشرات في ${city.name}. جودة عالية واستجابة سريعة. اطلب خدمتك الآن.`}
        />
        <meta
          name="keywords"
          content={`خدمات منزلية في ${city.name}, تنظيف ${city.name}, صيانة ${city.name}, سباكة ${city.name}, كهرباء ${city.name}, توب كلينرز`}
        />
        <link rel="canonical" href={`https://top-cleaners.net/sa/${city.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify(cityStructuredData)}
        </script>
      </Helmet>

      <BreadcrumbSchema breadcrumbs={breadcrumbs} />

      <div className="min-h-screen bg-gray-50 font-arabic" dir="rtl">
        <ModernHeader />
        
        <div className="pt-32">
          <CityHeader city={city} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <CityServicesGrid city={city} citySlug={citySlug!} onBookService={handleBookService} />
            <CityNeighborhoods city={city} />
            <CityCallToAction city={city} />
          </div>
        </div>
        
        <Footer />
      </div>

      <ModernFloatingButtons 
        cityName={city.name}
      />

      {showBookingModal && (
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          serviceName={selectedService}
          cityName={city.name}
        />
      )}
    </>
  );
};

export default CityServices;