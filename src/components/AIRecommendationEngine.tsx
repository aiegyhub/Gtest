import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Lightbulb, Star, TrendingUp, Users, MapPin } from "lucide-react";
import { servicesData } from "@/data/servicesData";

interface Recommendation {
  service: string;
  reason: string;
  confidence: number;
  savings: string;
  priority: 'high' | 'medium' | 'low';
}

interface AIRecommendationEngineProps {
  isOpen?: boolean;
  onClose?: () => void;
  userLocation?: string;
  userPreferences?: string[];
  pastBookings?: string[];
}

const AIRecommendationEngine = ({ 
  isOpen,
  onClose,
  userLocation = "الرياض", 
  userPreferences = [], 
  pastBookings = [] 
}: AIRecommendationEngineProps) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [insights, setInsights] = useState<any[]>([]);

  // Simulate AI analysis
  const generateRecommendations = async () => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const aiRecommendations: Recommendation[] = [
      {
        service: "تنظيف المنازل",
        reason: "بناءً على الموسم الحالي وتفضيلاتك، ننصح بالتنظيف العميق",
        confidence: 95,
        savings: "وفر 25%",
        priority: 'high'
      },
      {
        service: "خدمات التكييف",
        reason: "مع اقتراب فصل الصيف، صيانة المكيف ضرورية",
        confidence: 88,
        savings: "وفر 15%",
        priority: 'high'
      },
      {
        service: "كشف التسريبات",
        reason: "الكشف المبكر يوفر تكاليف الإصلاحات الكبيرة",
        confidence: 75,
        savings: "وفر حتى 500 ريال",
        priority: 'medium'
      }
    ];

    const marketInsights = [
      { icon: TrendingUp, title: "أكثر الخدمات طلباً", value: "تنظيف المنازل (+45%)" },
      { icon: Users, title: "رضا العملاء", value: "4.8/5 نجوم" },
      { icon: MapPin, title: "متوسط وقت الوصول", value: "30 دقيقة في منطقتك" },
      { icon: Star, title: "خصم حصري", value: "20% للعملاء الجدد" }
    ];
    
    setRecommendations(aiRecommendations);
    setInsights(marketInsights);
    setIsAnalyzing(false);
  };

  useEffect(() => {
    generateRecommendations();
  }, [userLocation, userPreferences, pastBookings]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Brain className="h-6 w-6" />
            مساعد الذكي الاصطناعي للخدمات
          </CardTitle>
          <p className="text-gray-600">توصيات مخصصة بناءً على احتياجاتك وموقعك</p>
        </CardHeader>
        <CardContent>
          {isAnalyzing ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="mr-3 text-blue-600">يتم تحليل احتياجاتك...</span>
            </div>
          ) : (
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{rec.service}</h4>
                      <p className="text-sm text-gray-600 mb-2">{rec.reason}</p>
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(rec.priority)}>
                          {rec.priority === 'high' ? 'أولوية عالية' : 
                           rec.priority === 'medium' ? 'أولوية متوسطة' : 'أولوية منخفضة'}
                        </Badge>
                        <Badge variant="outline" className="text-green-600">
                          {rec.savings}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          ثقة {rec.confidence}%
                        </span>
                      </div>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      احجز الآن
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Market Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            رؤى السوق الذكية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {insights.map((insight, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <insight.icon className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{insight.title}</p>
                  <p className="text-xs text-gray-600">{insight.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Actions */}
      <div className="flex gap-2">
        <Button 
          onClick={generateRecommendations} 
          disabled={isAnalyzing}
          className="flex-1"
        >
          <Brain className="h-4 w-4 ml-2" />
          إعادة تحليل التوصيات
        </Button>
        <Button variant="outline" className="flex-1">
          <Star className="h-4 w-4 ml-2" />
          احفظ التفضيلات
        </Button>
      </div>
    </div>
  );
};

export default AIRecommendationEngine;
