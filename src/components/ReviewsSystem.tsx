
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Star, Plus, Filter, ThumbsUp, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  service: string;
  city: string;
  verified: boolean;
  helpful: number;
}

interface ReviewsSystemProps {
  serviceName?: string;
  cityName?: string;
}

const ReviewsSystem = ({ serviceName, cityName }: ReviewsSystemProps) => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      customerName: "أحمد محمد",
      rating: 5,
      comment: "خدمة ممتازة والفريق محترف جداً. تم إنجاز العمل في الوقت المحدد بجودة عالية.",
      date: "2024-01-20",
      service: serviceName || "تنظيف المنازل",
      city: cityName || "الرياض",
      verified: true,
      helpful: 12
    },
    {
      id: "2",
      customerName: "فاطمة علي",
      rating: 4,
      comment: "خدمة جيدة لكن يمكن تحسين المواعيد. بشكل عام راضية عن النتيجة.",
      date: "2024-01-18",
      service: serviceName || "تنظيف المنازل",
      city: cityName || "الرياض",
      verified: true,
      helpful: 8
    },
    {
      id: "3",
      customerName: "خالد السعد",
      rating: 5,
      comment: "أفضل شركة تعاملت معها. سرعة في الاستجابة وأسعار مناسبة.",
      date: "2024-01-15",
      service: serviceName || "تنظيف المنازل",
      city: cityName || "الرياض",
      verified: false,
      helpful: 15
    }
  ]);

  const [showAddReview, setShowAddReview] = useState(false);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [newReview, setNewReview] = useState({
    customerName: "",
    rating: 5,
    comment: ""
  });

  const filteredReviews = filterRating 
    ? reviews.filter(review => review.rating === filterRating)
    : reviews;

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  const addReview = () => {
    if (!newReview.customerName || !newReview.comment) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const review: Review = {
      id: Date.now().toString(),
      customerName: newReview.customerName,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      service: serviceName || "تنظيف المنازل",
      city: cityName || "الرياض",
      verified: false,
      helpful: 0
    };

    setReviews(prev => [review, ...prev]);
    setNewReview({ customerName: "", rating: 5, comment: "" });
    setShowAddReview(false);

    toast({
      title: "تم إضافة المراجعة",
      description: "شكراً لك على تقييمك، سيتم مراجعته قريباً",
    });
  };

  const markHelpful = (reviewId: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ));
  };

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">آراء العملاء</h2>
        <Button onClick={() => setShowAddReview(true)}>
          <Plus className="h-4 w-4 ml-2" />
          إضافة مراجعة
        </Button>
      </div>

      {/* إحصائيات المراجعات */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= averageRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">متوسط التقييم</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{reviews.length}</div>
              <p className="text-sm text-gray-600">إجمالي المراجعات</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {Math.round((reviews.filter(r => r.verified).length / reviews.length) * 100)}%
              </div>
              <p className="text-sm text-gray-600">مراجعات موثقة</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* فلتر التقييمات */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={filterRating === null ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterRating(null)}
        >
          <Filter className="h-4 w-4 ml-2" />
          جميع التقييمات
        </Button>
        {[5, 4, 3, 2, 1].map((rating) => (
          <Button
            key={rating}
            variant={filterRating === rating ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterRating(rating)}
          >
            {rating} نجوم
          </Button>
        ))}
      </div>

      {/* نموذج إضافة مراجعة */}
      {showAddReview && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>إضافة مراجعة جديدة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">الاسم</label>
                <Input
                  value={newReview.customerName}
                  onChange={(e) => setNewReview(prev => ({ ...prev, customerName: e.target.value }))}
                  placeholder="اسمك الكامل"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">التقييم</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                      className="p-1"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">تعليقك</label>
                <Textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="شاركنا تجربتك مع الخدمة..."
                  rows={4}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={addReview}>إضافة المراجعة</Button>
                <Button variant="outline" onClick={() => setShowAddReview(false)}>
                  إلغاء
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* قائمة المراجعات */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{review.customerName}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          موثق
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  {review.service} • {review.city}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => markHelpful(review.id)}
                  className="text-gray-500 hover:text-blue-600"
                >
                  <ThumbsUp className="h-4 w-4 ml-1" />
                  مفيد ({review.helpful})
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSystem;
