
import { Helmet } from "react-helmet-async";

interface AboutPageSchemaProps {
  name?: string;
  description?: string;
  url?: string;
  mainEntity?: {
    name: string;
    description: string;
    foundingDate: string;
    founders: string[];
    numberOfEmployees: string;
    slogan: string;
  };
}

const AboutPageSchema = ({
  name = "من نحن - توب كلينرز للخدمات المنزلية",
  description = "تعرف على شركة توب كلينرز للخدمات المنزلية، رائدة في تقديم الخدمات المنزلية المتكاملة",
  url = "https://top-cleaners.net/about",
  mainEntity = {
    name: "توب كلينرز للخدمات المنزلية",
    description: "شركة متخصصة في تقديم خدمات المنازل عالية الجودة مع فريق من المتخصصين المدربين",
    foundingDate: "2020-01-01",
    founders: ["فريق توب كلينرز للخدمات المنزلية"],
    numberOfEmployees: "50-100",
    slogan: "جودة في الخدمة، ثقة في الأداء"
  }
}: AboutPageSchemaProps = {}) => {
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": name,
    "description": description,
    "url": url,
    "mainEntity": {
      "@type": "Organization",
      "name": mainEntity.name,
      "description": mainEntity.description,
      "foundingDate": mainEntity.foundingDate,
      "founder": mainEntity.founders.map(founder => ({
        "@type": "Person",
        "name": founder
      })),
      "numberOfEmployees": mainEntity.numberOfEmployees,
      "slogan": mainEntity.slogan,
      "knowsAbout": [
        "تنظيف المنازل المتخصص",
        "مكافحة الحشرات الآمنة",
        "صيانة أنظمة التكييف",
        "إصلاح السباكة",
        "الخدمات الكهربائية",
        "نقل الأثاث الاحترافي"
      ],
      "award": [
        "شهادة الجودة ISO 9001",
        "جائزة أفضل خدمة عملاء 2023",
        "شهادة السلامة المهنية"
      ]
    },
    "about": {
      "@type": "Thing",
      "name": "خدمات المنازل في السعودية",
      "description": "نحن نقدم مجموعة شاملة من الخدمات المنزلية عالية الجودة للعائلات السعودية"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(aboutPageSchema)}
      </script>
    </Helmet>
  );
};

export default AboutPageSchema;
