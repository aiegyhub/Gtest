
import { Helmet } from "react-helmet-async";

interface ContactPageSchemaProps {
  name?: string;
  description?: string;
  url?: string;
  contactInfo?: {
    telephone: string;
    email: string;
    address: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
    openingHours: string[];
  };
}

const ContactPageSchema = ({
  name = "اتصل بنا - توب كلينرز للخدمات المنزلية",
  description = "تواصل معنا للحصول على أفضل خدمات المنازل في السعودية على مدار الساعة",
  url = "https://top-cleaners.net/contact",
  contactInfo = {
    telephone: "+966546331988",
    email: "info@top-cleaners.net",
    address: {
      streetAddress: "شارع الملك فهد",
      addressLocality: "الرياض",
      addressRegion: "منطقة الرياض",
      postalCode: "11564",
      addressCountry: "SA"
    },
    openingHours: [
      "Mo-Su 00:00-23:59"
    ]
  }
}: ContactPageSchemaProps = {}) => {
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": name,
    "description": description,
    "url": url,
    "mainEntity": {
      "@type": "Organization",
      "name": "توب كلينرز للخدمات المنزلية",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": contactInfo.telephone,
          "contactType": "customer service",
          "availableLanguage": ["Arabic", "English"],
          "areaServed": "SA",
          "serviceType": "خدمات المنازل"
        },
        {
          "@type": "ContactPoint",
          "email": contactInfo.email,
          "contactType": "customer support",
          "availableLanguage": ["Arabic", "English"]
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": contactInfo.address.streetAddress,
        "addressLocality": contactInfo.address.addressLocality,
        "addressRegion": contactInfo.address.addressRegion,
        "postalCode": contactInfo.address.postalCode,
        "addressCountry": contactInfo.address.addressCountry
      },
      "openingHours": contactInfo.openingHours
    },
    "potentialAction": {
      "@type": "CommunicateAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "tel:" + contactInfo.telephone,
        "inLanguage": "ar"
      }
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(contactPageSchema)}
      </script>
    </Helmet>
  );
};

export default ContactPageSchema;
