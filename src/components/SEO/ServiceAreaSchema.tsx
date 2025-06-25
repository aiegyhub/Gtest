
import { Helmet } from "react-helmet-async";

interface ServiceAreaSchemaProps {
  serviceName: string;
  serviceAreas: string[];
  baseLocation?: {
    city: string;
    region: string;
    country: string;
  };
}

const ServiceAreaSchema = ({
  serviceName,
  serviceAreas,
  baseLocation = {
    city: "الرياض",
    region: "منطقة الرياض", 
    country: "السعودية"
  }
}: ServiceAreaSchemaProps) => {
  const serviceAreaSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "serviceType": serviceName,
    "provider": {
      "@type": "LocalBusiness",
      "name": "توب كلينرز للخدمات المنزلية",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": baseLocation.city,
        "addressRegion": baseLocation.region,
        "addressCountry": baseLocation.country
      }
    },
    "areaServed": serviceAreas.map(area => ({
      "@type": "Place",
      "name": area
    })),
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 24.7136,
        "longitude": 46.6753
      },
      "geoRadius": "100000"
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://top-cleaners.net",
      "serviceSmsNumber": "+966546331988",
      "servicePhone": "+966546331988"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(serviceAreaSchema)}
      </script>
    </Helmet>
  );
};

export default ServiceAreaSchema;
