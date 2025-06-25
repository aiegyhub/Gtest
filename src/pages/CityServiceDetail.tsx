import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Star, Clock, Shield, Users, MapPin, Phone, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import BreadcrumbSchema from "@/components/SEO/BreadcrumbSchema";
import { useState, useMemo } from "react";
import { City } from "@/types/services";
import { useToast } from "@/hooks/use-toast";

const CityServiceDetail = () => {
  const { citySlug, serviceSlug } = useParams<{ citySlug: string; serviceSlug: string }>();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const { toast } = useToast();
  
  const city = useMemo(() => {
    return citiesData.find((c: City) => c.slug === citySlug);
  }, [citySlug]);

  const service = useMemo(() => {
    return servicesData.find(s => s.slug === serviceSlug);
  }, [serviceSlug]);

  if (!city || !service) {
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
    { name: "الخدمات في السعودية", url: "https://top-cleaners.net/sa", position: 2 },
    { name: city.name, url: `https://top-cleaners.net/sa/${city.slug}`, position: 3 },
    { name: service.name, url: `https://top-cleaners.net/sa/${city.slug}/${service.slug}`, position: 4 }
  ];

  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${service.name} في ${city.name}`,
    "description": `احصل على خدمة ${service.name} احترافية في ${city.name} مع توب كلينرز. ضمان جودة وأسعار تنافسية.`,
    "provider": { "@type": "Organization", "name": "توب كلينرز", "url": "https://top-cleaners.net" },
    "areaServed": { "@type": "City", "name": city.name, "containedInPlace": { "@type": "Country", "name": "SA" } },
    "offers": { "@type": "Offer", "priceRange": service.pricing.priceRange, "priceCurrency": "SAR" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": service.metadata.rating, "reviewCount": service.metadata.reviewCount }
  };

  return (
    <>
      <Helmet>
        <title>{service.name} في {city.name} | توب كلينرز السعودية</title>
        <meta name="description" content={`أفضل خدمة ${service.name} في ${city.name}. توب كلينرز تقدم ${service.description}. جودة عالية، أسعار تنافسية، وضمان. احجز الآن!`} />
        <meta name="keywords" content={`${service.name}, ${city.name}, ${service.metadata.tags.join(', ')}, توب كلينرز, السعودية`} />
        <link rel="canonical" href={`https://top-cleaners.net/sa/${city.slug}/${service.slug}`} />
        <script type="application/ld+json">{JSON.stringify(serviceStructuredData)}</script>
      </Helmet>

      <BreadcrumbSchema breadcrumbs={breadcrumbs} />

      <div className="min-h-screen bg-gray-50 font-arabic" dir="rtl">
        <ModernHeader />
        <div className="pt-32">
          <ServiceHero service={service} cityName={city.name} onBookService={handleBookService} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <ServiceFeatures service={service} />
                <ServiceSubServices service={service} onBookService={handleBookService} />
                <ServiceCalculator selectedService={service} onBookService={handleBookWithPrice} />
                <ReviewsSection serviceName={`${service.name} في ${city.name}`} />
                <FAQSection serviceName={service.name} cityName={city.name} />
              </div>
              <div className="space-y-6">
                <Card className="sticky top-32">
                  <CardHeader><CardTitle className="flex items-center gap-2"><Star className="h-5 w-5 text-yellow-500" />معلومات الخدمة في {city.name}</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center"><span className="text-gray-600">التقييم:</span><div className="flex items-center gap-1"><Star className="h-4 w-4 text-yellow-500 fill-current" /><span className="font-semibold">{service.metadata.rating}</span><span className="text-sm text-gray-500">({service.metadata.reviewCount})</span></div></div>
                    <div className="flex justify-between items-center"><span className="text-gray-600">السعر:</span><span className="font-semibold text-blue-600">{service.pricing.priceRange}</span></div>
                    <div className="flex justify-between items-center"><span className="text-gray-600">التوفر:</span><Badge variant={service.availability.available24x7 ? "default" : "secondary"}>{service.availability.available24x7 ? "متاح 24/7" : "حجز مسبق"}</Badge></div>
                    <div className="pt-4 space-y-2">
                      <Button onClick={handleBookService} className="w-full" size="lg">احجز الآن في {city.name}</Button>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1"><Phone className="h-4 w-4 ml-2" />اتصل</Button>
                        <Button variant="outline" size="sm" className="flex-1"><MessageCircle className="h-4 w-4 ml-2" />واتساب</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <ServiceCoverageAreas data={city} serviceSlug={serviceSlug} />
              </div>
            </div>
            <div className="mt-12"><ServiceAboutSection service={service} cityName={city.name} /></div>
            {relatedServices.length > 0 && (<div className="mt-12"><RelatedServices services={relatedServices} onBookService={handleBookService} cityName={city.name} /></div>)}
            <ServiceCTA service={service} cityName={city.name} onBookService={handleBookService} />
          </div>
        </div>
        <Footer />
      </div>

      <ModernFloatingButtons cityName={city.name} serviceName={service.name} />
      {showBookingModal && (<BookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} serviceName={service.name} cityName={city.name} />)}
    </>
  );
};

export default CityServiceDetail;