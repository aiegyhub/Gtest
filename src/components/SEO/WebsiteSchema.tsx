
import { Helmet } from "react-helmet-async";

interface WebsiteSchemaProps {
  url?: string;
  name?: string;
  description?: string;
  publisher?: string;
}

const WebsiteSchema = ({
  url = "https://top-cleaners.net",
  name = "توب كلينرز - دليل الخدمات المنزلية في عسير والشرقية",
  description = "منصة شاملة للعثور على أفضل مقدمي الخدمات المحترفين في منطقة عسير والمنطقة الشرقية",
  publisher = "توب كلينرز للخدمات المنزلية"
}: WebsiteSchemaProps = {}) => {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": name,
    "description": description,
    "url": url,
    "publisher": {
      "@type": "Organization",
      "name": publisher
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "خدمات المنازل",
      "description": "قائمة شاملة بخدمات المنازل المتاحة في منطقة عسير والمنطقة الشرقية",
      "itemListElement": [
        {
          "@type": "Service",
          "name": "تنظيف المنازل",
          "description": "خدمات تنظيف شاملة للمنازل والشقق في خميس مشيط وأبها"
        },
        {
          "@type": "Service", 
          "name": "مكافحة الحشرات",
          "description": "خدمات مكافحة الحشرات الآمنة والفعالة في منطقة عسير"
        },
        {
          "@type": "Service",
          "name": "صيانة التكييف",
          "description": "صيانة وإصلاح أنظمة التكييف في خميس مشيط وحفر الباطن"
        },
        {
          "@type": "Service",
          "name": "خدمات السباكة",
          "description": "إصلاح وصيانة أنظمة السباكة في منطقة عسير والشرقية"
        },
        {
          "@type": "Service",
          "name": "خدمات الكهرباء",
          "description": "خدمات كهربائية آمنة ومحترفة في جميع المناطق المخدومة"
        },
        {
          "@type": "Service",
          "name": "نقل الأثاث",
          "description": "خدمات نقل الأثاث الآمن داخل المدن وبينها"
        },
        {
          "@type": "Service",
          "name": "تنظيف الخزانات",
          "description": "تنظيف وتعقيم خزانات المياه السكنية والتجارية"
        },
        {
          "@type": "Service",
          "name": "خدمات التعقيم",
          "description": "تعقيم شامل للمنازل والمكاتب ضد الفيروسات والبكتيريا"
        }
      ]
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Helmet>
  );
};

export default WebsiteSchema;
