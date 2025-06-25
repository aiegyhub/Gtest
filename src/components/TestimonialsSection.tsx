
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  location: string;
  service: string;
  rating: number;
  comment: string;
  date: string;
}

interface TestimonialsSectionProps {
  title?: string;
  testimonials: Testimonial[];
}

const TestimonialsSection = ({ 
  title = "آراء العملاء", 
  testimonials 
}: TestimonialsSectionProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="bg-white rounded-lg shadow p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex">{renderStars(testimonial.rating)}</div>
                <Quote className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-gray-600 mb-4 text-right leading-relaxed">
                "{testimonial.comment}"
              </p>
              <div className="border-t pt-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-blue-600 font-medium">{testimonial.service}</p>
                    <p className="text-xs text-gray-500">{testimonial.date}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
