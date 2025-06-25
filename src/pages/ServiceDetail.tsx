import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { servicesData } from "@/data/servicesData";
import { citiesData } from "@/data/citiesData";
import ServiceHero from "@/components/service/ServiceHero";
import ServiceFeatures from "@/components/service/ServiceFeatures";
import ServiceSubServices from "@/components/service/ServiceSubServices";
import ServiceCoverageAreas from "@/components/service/ServiceCoverageAreas";
import ServiceAboutSection from "@/components/service/ServiceAboutSection";
import ServiceCTA from "@/components/service/ServiceCTA";
import ServiceCalculator from "@/components/ServiceCalculator";
import ReviewsSection from "@/components/ReviewsSection";
import FAQSection from "@/components/FAQSection";
import RelatedServices from "@/components/RelatedServices";
import BookingModal from "@/components/BookingModal";
import ModernFloatingButtons from "@/components/modern/ModernFloatingButtons";
import ModernHeader from "@/components/modern/ModernHeader";
import Footer from "@/components/Footer";
import { useState, useMemo } from "react";
import BreadcrumbSchema from "@/components/SEO/BreadcrumbSchema";
import { useToast } from "@/hooks/use-toast";

const ServiceDetail = () => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const { toast } = useToast();
  
  const service = useMemo(() => {
    return servicesData.find(s => s.slug === serviceSlug);
  }, [serviceSlug]);

  if (!service) {
    return <Navigate to="/404" replace />;
  }

  const handleBookService = () => {
    setShowBookingModal(true);
  };

  const handleBookWithPrice = (serviceName: string, estimatedPrice: number) => {
    toast({
      title: "تم تحديد الخدمة بسعر تقديري",
      description: `سيتم حجز خدمة ${serviceName} بسعر تقديري ${estimatedPrice} ريال.`,
    });
    setShowBookingModal(true);
  };

  const relatedServices = servicesData.filter(s => 
    s.slug !== service.slug && s.category === service.category
  ).slice(0, 3);

  const breadcrumbs = [
    { name: "الرئيسية", url: "https://top-cleaners.net/", position: 1 },
    { name: "الخدمات", url: "https://top-cleaners.net/sa", position: 2 },
    { name: service.name, url: `https://top-cleaners.net/services/${service.slug}`, position: 3 }
  ];

  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": { "@type": "Organization", "name": "توب كلينرز", "url": "https://top-cleaners.net" },
    "areaServed": citiesData.map(city => ({ "@type": "City", "name": city.name })),
    "offers": { "@type": "Offer", "priceRange": service.pricing.priceRange, "priceCurrency": "SAR" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": service.metadata.rating, "reviewCount": service.metadata.reviewCount }
  };

  return (
    <>
      <Helmet>
        <title>{service.name} في السعودية | خدمات توب كلينرز الاحترافية</title>
        <meta name="description" content={`${service.description} - خدمات ${service.name} بأفضل الأسعار وأعلى جودة في جميع مدن السعودية مع توب كلينرز.`} />
        <meta name="keywords" content={`${service.name}, ${service.metadata.tags.join(', ')}, خدمات منزلية, توب كلينرز, السعودية`} />
        <link rel="canonical" href={`https://top-cleaners.net/services/${service.slug}`} />
        <script type="application/ld+json">{JSON.stringify(serviceStructuredData)}</script>
      </Helmet>

      <BreadcrumbSchema breadcrumbs={breadcrumbs} />

      <div className="min-h-screen bg-gray-50 font-arabic" dir="rtl">
        <ModernHeader />
        <div className="pt-32">
          <ServiceHero service={service} onBookService={handleBookService} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <ServiceFeatures service={service} />
                <ServiceSubServices service={service} onBookService={handleBookService} />
                <ServiceCalculator selectedService={service} onBookService={handleBookWithPrice} />
                <ReviewsSection serviceName={service.name} />
                <FAQSection serviceName={service.name} />
              </div>
              <div className="space-y-6">
                 <ServiceCoverageAreas data={citiesData} serviceSlug={serviceSlug} />
              </div>
            </div>
            <div className="mt-12"><ServiceAboutSection service={service} /></div>
            {relatedServices.length > 0 && (<div className="mt-12"><RelatedServices services={relatedServices} onBookService={handleBookService} /></div>)}
            <ServiceCTA service={service} onBookService={handleBookService} />
          </div>
        </div>
        <Footer />
      </div>

      <ModernFloatingButtons serviceName={service.name} />
      {showBookingModal && (<BookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} serviceName={service.name} />)}
    </>
  );
};

export default ServiceDetail;