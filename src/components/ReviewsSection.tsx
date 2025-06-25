
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, User } from "lucide-react";

interface ReviewsSectionProps {
  serviceName: string;
}

const ReviewsSection = ({ serviceName }: ReviewsSectionProps) => {
  const reviews = [
    {
      id: 1,
      name: "محمد أحمد",
      rating: 5,
      comment: `خدمة ${serviceName} ممتازة وسريعة. فريق محترف جداً`,
      date: "منذ أسبوع"
    },
    {
      id: 2,
      name: "فاطمة سالم",
      rating: 4,
      comment: "خدمة جيدة والسعر مناسب",
      date: "منذ أسبوعين"
    },
    {
      id: 3,
      name: "عبدالله محمد",
      rating: 5,
      comment: "أنصح بالتعامل معهم. خدمة احترافية",
      date: "منذ شهر"
    }
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">تقييمات العملاء</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-full">
                  <User className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{review.name}</h4>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
