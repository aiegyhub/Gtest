
import { Helmet } from "react-helmet-async";

interface OrganizationSchemaProps {
  name?: string;
  description?: string;
  url?: string;
  logo?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint?: {
    telephone: string;
    contactType: string;
    availableLanguage: string[];
  };
  sameAs?: string[];
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating: number;
    worstRating: number;
  };
}

const OrganizationSchema = ({
  name = "توب كلينرز للخدمات المنزلية",
  description = "شركة رائدة في تقديم خدمات المنازل المتكاملة في منطقة عسير والمنطقة الشرقية",
  url = "https://top-cleaners.net",
  logo = "https://top-cleaners.net/logo.png",
  address = {
    streetAddress: "خميس مشيط",
    addressLocality: "خميس مشيط",
    addressRegion: "منطقة عسير",
    postalCode: "62529",
    addressCountry: "SA"
  },
  contactPoint = {
    telephone: "+966546331988",
    contactType: "customer service",
    availableLanguage: ["Arabic", "English"]
  },
  sameAs = [
    "https://www.facebook.com/topcleaners",
    "https://www.twitter.com/topcleaners_sa",
    "https://www.instagram.com/topcleaners_sa",
    "https://www.linkedin.com/company/topcleaners"
  ],
  aggregateRating = {
    ratingValue: 4.7,
    reviewCount: 342,
    bestRating: 5,
    worstRating: 1
  }
}: OrganizationSchemaProps = {}) => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": name,
    "description": description,
    "url": url,
    "logo": {
      "@type": "ImageObject",
      "url": logo
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address.streetAddress,
      "addressLocality": address.addressLocality,
      "addressRegion": address.addressRegion,
      "postalCode": address.postalCode,
      "addressCountry": address.addressCountry
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": contactPoint.telephone,
      "contactType": contactPoint.contactType,
      "availableLanguage": contactPoint.availableLanguage
    },
    "sameAs": sameAs,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": aggregateRating.ratingValue,
      "reviewCount": aggregateRating.reviewCount,
      "bestRating": aggregateRating.bestRating,
      "worstRating": aggregateRating.worstRating
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "خميس مشيط"
      },
      {
        "@type": "City",
        "name": "أبها"
      },
      {
        "@type": "City",
        "name": "حفر الباطن"
      },
      {
        "@type": "City",
        "name": "بيشة"
      },
      {
        "@type": "City",
        "name": "محايل عسير"
      },
      {
        "@type": "City",
        "name": "القيصومة"
      },
      {
        "@type": "City",
        "name": "تثليث"
      },
      {
        "@type": "City",
        "name": "سراة عبيدة"
      },
      {
        "@type": "City",
        "name": "النماص"
      },
      {
        "@type": "City",
        "name": "المجاردة"
      },
      {
        "@type": "City",
        "name": "ظهران الجنوب"
      },
      {
        "@type": "City",
        "name": "مدينة الملك خالد العسكرية"
      }
    ],
    "serviceType": [
      "تنظيف المنازل",
      "مكافحة الحشرات",
      "صيانة التكييف",
      "خدمات السباكة",
      "خدمات الكهرباء",
      "نقل الأثاث",
      "صيانة المنازل",
      "خدمات التعقيم",
      "تنظيف الخزانات",
      "تنظيف المباني"
    ],
    "founder": {
      "@type": "Person",
      "name": "فريق توب كلينرز للخدمات المنزلية"
    },
    "foundingDate": "2020-01-01",
    "numberOfEmployees": "50-100"
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
    </Helmet>
  );
};

export default OrganizationSchema;
