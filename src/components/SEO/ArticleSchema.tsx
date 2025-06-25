
import { Helmet } from "react-helmet-async";

interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  publishedDate?: string;
  modifiedDate?: string;
  author?: string;
  image?: string;
  category?: string;
}

const ArticleSchema = ({
  title,
  description,
  url,
  publishedDate = new Date().toISOString(),
  modifiedDate = new Date().toISOString(),
  author = "فريق توب كلينرز للخدمات المنزلية",
  image = "https://top-cleaners.net/images/default-article.jpg",
  category = "خدمات منزلية"
}: ArticleSchemaProps) => {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "url": url,
    "datePublished": publishedDate,
    "dateModified": modifiedDate,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "توب كلينرز للخدمات المنزلية",
      "logo": {
        "@type": "ImageObject",
        "url": "https://top-cleaners.net/logo.png"
      }
    },
    "image": {
      "@type": "ImageObject",
      "url": image
    },
    "articleSection": category,
    "wordCount": description.length,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
    </Helmet>
  );
};

export default ArticleSchema;
