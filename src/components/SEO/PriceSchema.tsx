
import { Helmet } from "react-helmet-async";

interface PriceOffer {
  name: string;
  price: string;
  currency: string;
  description: string;
  validFrom?: string;
  validThrough?: string;
}

interface PriceSchemaProps {
  serviceName: string;
  offers: PriceOffer[];
}

const PriceSchema = ({
  serviceName,
  offers
}: PriceSchemaProps) => {
  const priceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "offers": offers.map(offer => ({
      "@type": "Offer",
      "name": offer.name,
      "price": offer.price,
      "priceCurrency": offer.currency,
      "description": offer.description,
      "availability": "https://schema.org/InStock",
      "validFrom": offer.validFrom || new Date().toISOString(),
      "validThrough": offer.validThrough || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      "seller": {
        "@type": "Organization",
        "name": "توب كلينرز للخدمات المنزلية"
      }
    })),
    "provider": {
      "@type": "LocalBusiness",
      "name": "توب كلينرز للخدمات المنزلية",
      "telephone": "+966546331988",
      "url": "https://top-cleaners.net"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(priceSchema)}
      </script>
    </Helmet>
  );
};

export default PriceSchema;
