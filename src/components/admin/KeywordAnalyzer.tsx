import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  TrendingUp, 
  Target, 
  BarChart3,
  Lightbulb,
  Loader2,
  RefreshCw,
  Filter
} from "lucide-react";
import { toast } from "sonner";

interface KeywordData {
  keyword: string;
  volume: number;
  difficulty: number;
  position: number;
  clicks: number;
  impressions: number;
  ctr: number;
  trend: 'up' | 'down' | 'stable';
  opportunity: 'high' | 'medium' | 'low';
}

interface SuggestedKeyword {
  keyword: string;
  relevance: number;
  competitionLevel: 'low' | 'medium' | 'high';
  suggestedAction: string;
}

const KeywordAnalyzer = () => {
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [keywordData, setKeywordData] = useState<KeywordData[]>([]);
  const [suggestedKeywords, setSuggestedKeywords] = useState<SuggestedKeyword[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filterBy, setFilterBy] = useState<'all' | 'opportunity' | 'position'>('all');

  const pages = [
    'https://top-cleaners.net/sa/khamis-mushait/pest-control',
    'https://top-cleaners.net/sa/abha/home-cleaning',
    'https://top-cleaners.net/services/insulation-services',
    'https://top-cleaners.net/sa/hafr-al-batin/ac-maintenance'
  ];

  useEffect(() => {
    if (selectedPage) {
      loadKeywordAnalysis();
    }
  }, [selectedPage]);

  const loadKeywordAnalysis = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockKeywordData: KeywordData[] = [
        {
          keyword: 'مكافحة الرمة خميس مشيط',
          volume: 1200,
          difficulty: 45,
          position: 3.1,
          clicks: 250,
          impressions: 4500,
          ctr: 5.56,
          trend: 'up',
          opportunity: 'high'
        },
        {
          keyword: 'شركة رش دفان بخميس مشيط',
          volume: 900,
          difficulty: 55,
          position: 5.4,
          clicks: 110,
          impressions: 2100,
          ctr: 5.24,
          trend: 'stable',
          opportunity: 'high'
        },
        {
          keyword: 'أفضل شركة مكافحة حشرات',
          volume: 2500,
          difficulty: 75,
          position: 11.2,
          clicks: 80,
          impressions: 3200,
          ctr: 2.5,
          trend: 'stable',
          opportunity: 'medium'
        },
        {
          keyword: 'سعر رش الدفان',
          volume: 400,
          difficulty: 30,
          position: 7.8,
          clicks: 45,
          impressions: 900,
          ctr: 5.0,
          trend: 'up',
          opportunity: 'high'
        }
      ];

      const mockSuggestions: SuggestedKeyword[] = [
        {
          keyword: 'علاج النمل الابيض في الجدار',
          relevance: 95,
          competitionLevel: 'medium',
          suggestedAction: 'إنشاء مقال أو قسم مخصص في الصفحة الحالية'
        },
        {
          keyword: 'ضمان رش الدفان',
          relevance: 85,
          competitionLevel: 'low',
          suggestedAction: 'إبراز معلومات الضمان بشكل أوضح في المحتوى'
        },
        {
          keyword: 'مبيد الرمة الاصلي',
          relevance: 78,
          competitionLevel: 'medium',
          suggestedAction: 'ذكر أنواع المبيدات المستخدمة وفعاليتها'
        }
      ];

      setKeywordData(mockKeywordData);
      setSuggestedKeywords(mockSuggestions);
    } catch (error) {
      toast.error('فشل في جلب تحليل الكلمات المفتاحية');
    } finally {
      setIsLoading(false);
    }
  };

  const getOpportunityColor = (opportunity: string) => {
    switch (opportunity) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
      case 'stable': return <BarChart3 className="h-4 w-4 text-gray-600" />;
      default: return null;
    }
  };

  const filteredKeywords = keywordData.filter(keyword => {
    const matchesSearch = keyword.keyword.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterBy === 'all' || 
      (filterBy === 'opportunity' && keyword.opportunity === 'high') ||
      (filterBy === 'position' && keyword.position > 10);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">محلل الكلمات المفتاحية</h2>
          <p className="text-gray-600">تحليل ذكي لأداء الكلمات المفتاحية واقتراح التحسينات</p>
        </div>
        <Button variant="outline" onClick={loadKeywordAnalysis} disabled={!selectedPage || isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            اختر الصفحة للتحليل
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="pageSelect">الصفحة المراد تحليلها</Label>
              <Select value={selectedPage} onValueChange={setSelectedPage}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر صفحة" />
                </SelectTrigger>
                <SelectContent>
                  {pages.map((page) => (
                    <SelectItem key={page} value={page}>
                      {page.replace('https://top-cleaners.net', '').substring(0, 40)}...
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="searchKeywords">البحث في الكلمات</Label>
              <Input
                id="searchKeywords"
                placeholder="ابحث عن كلمة مفتاحية..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="filterBy">تصفية النتائج</Label>
              <Select value={filterBy} onValueChange={(value: any) => setFilterBy(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الكلمات</SelectItem>
                  <SelectItem value="opportunity">الفرص العالية</SelectItem>
                  <SelectItem value="position">{'الترتيب > 10'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedPage && (
        <Tabs defaultValue="analysis" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="analysis">تحليل الكلمات الحالية</TabsTrigger>
            <TabsTrigger value="suggestions">اقتراحات جديدة</TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="space-y-4">
            {isLoading ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                  <p>جاري تحليل الكلمات المفتاحية...</p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>تحليل الكلمات المفتاحية الحالية</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredKeywords.map((keyword, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <h4 className="font-semibold">{keyword.keyword}</h4>
                            {getTrendIcon(keyword.trend)}
                            <Badge className={getOpportunityColor(keyword.opportunity)}>
                              {keyword.opportunity === 'high' ? 'فرصة عالية' : 
                               keyword.opportunity === 'medium' ? 'فرصة متوسطة' : 'فرصة منخفضة'}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600">
                            المرتبة: {keyword.position.toFixed(1)}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">حجم البحث:</span>
                            <p className="font-medium">{keyword.volume.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">الصعوبة:</span>
                            <p className="font-medium">{keyword.difficulty}%</p>
                          </div>
                          <div>
                            <span className="text-gray-600">النقرات:</span>
                            <p className="font-medium">{keyword.clicks}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">الظهور:</span>
                            <p className="font-medium">{keyword.impressions}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">معدل النقر:</span>
                            <p className="font-medium">{keyword.ctr.toFixed(2)}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="suggestions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  اقتراحات كلمات مفتاحية جديدة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suggestedKeywords.map((suggestion, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-blue-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{suggestion.keyword}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">صلة: {suggestion.relevance}%</Badge>
                          <Badge 
                            variant={suggestion.competitionLevel === 'low' ? 'default' : 'secondary'}
                          >
                            منافسة {suggestion.competitionLevel === 'low' ? 'قليلة' : 
                                    suggestion.competitionLevel === 'medium' ? 'متوسطة' : 'عالية'}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{suggestion.suggestedAction}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default KeywordAnalyzer;