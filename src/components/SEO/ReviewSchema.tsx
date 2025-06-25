
import { Helmet } from "react-helmet-async";

interface Review {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}

interface ReviewSchemaProps {
  serviceName: string;
  reviews: Review[];
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}

const ReviewSchema = ({
  serviceName,
  reviews,
  aggregateRating = {
    ratingValue: 4.7,
    reviewCount: reviews.length
  }
}: ReviewSchemaProps) => {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": serviceName,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": aggregateRating.ratingValue,
      "reviewCount": aggregateRating.reviewCount,
      "bestRating": 5,
      "worstRating": 1
    },
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": 5,
        "worstRating": 1
      },
      "reviewBody": review.reviewBody,
      "datePublished": review.datePublished
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(reviewSchema)}
      </script>
    </Helmet>
  );
};

export default ReviewSchema;
