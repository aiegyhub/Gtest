
import { Helmet } from "react-helmet-async";

interface LocalBusinessSchemaProps {
  name?: string;
  description?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  telephone?: string;
  url?: string;
  openingHours?: string[];
  priceRange?: string;
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating: number;
    worstRating: number;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
}

const LocalBusinessSchema = ({
  name = "توب كلينرز للخدمات المنزلية",
  description = "شركة متخصصة في تقديم خدمات المنازل المتكاملة في منطقة عسير والمنطقة الشرقية مع فريق محترف ومدرب",
  address = {
    streetAddress: "خميس مشيط، حي الملك فهد",
    addressLocality: "خميس مشيط",
    addressRegion: "منطقة عسير",
    postalCode: "62529",
    addressCountry: "SA"
  },
  telephone = "+966546331988",
  url = "https://top-cleaners.net",
  openingHours = [
    "Mo-Su 06:00-23:00"
  ],
  priceRange = "$$",
  aggregateRating = {
    ratingValue: 4.7,
    reviewCount: 287,
    bestRating: 5,
    worstRating: 1
  },
  geo = {
    latitude: 18.3070,
    longitude: 42.7290
  }
}: LocalBusinessSchemaProps = {}) => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": url,
    "name": name,
    "description": description,
    "image": [
      `${url}/images/logo.png`,
      `${url}/images/services-banner.jpg`,
      `${url}/images/team-photo.jpg`
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address.streetAddress,
      "addressLocality": address.addressLocality,
      "addressRegion": address.addressRegion,
      "postalCode": address.postalCode,
      "addressCountry": address.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": geo.latitude,
      "longitude": geo.longitude
    },
    "telephone": telephone,
    "url": url,
    "openingHours": openingHours,
    "priceRange": priceRange,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": aggregateRating.ratingValue,
      "reviewCount": aggregateRating.reviewCount,
      "bestRating": aggregateRating.bestRating,
      "worstRating": aggregateRating.worstRating
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": 5,
          "bestRating": 5
        },
        "author": {
          "@type": "Person",
          "name": "أحمد محمد"
        },
        "reviewBody": "خدمة ممتازة وفريق محترف جداً. تم تنظيف المنزل بدقة عالية والأسعار معقولة."
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": 5,
          "bestRating": 5
        },
        "author": {
          "@type": "Person",
          "name": "فاطمة علي"
        },
        "reviewBody": "أفضل شركة خدمات منزلية جربتها. سرعة في الاستجابة وجودة في العمل."
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": 4,
          "bestRating": 5
        },
        "author": {
          "@type": "Person",
          "name": "خالد السعد"
        },
        "reviewBody": "خدمة جيدة ولكن يمكن تحسين المواعيد. بشكل عام راضي عن الخدمة."
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": geo.latitude,
        "longitude": geo.longitude
      },
      "geoRadius": "50000"
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
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "خدمات المنازل",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "تنظيف المنازل",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "تنظيف شامل للمنزل"
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog", 
          "name": "مكافحة الحشرات",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "مكافحة الحشرات المنزلية"
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog", 
          "name": "صيانة التكييف",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "صيانة وإصلاح أجهزة التكييف"
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog", 
          "name": "السباكة",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "إصلاح وصيانة أنظمة السباكة"
              }
            }
          ]
        }
      ]
    },
    "sameAs": [
      "https://www.facebook.com/topcleaners",
      "https://www.instagram.com/topcleaners_sa",
      "https://twitter.com/topcleaners_sa"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
    </Helmet>
  );
};

export default LocalBusinessSchema;
