
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Globe, Loader2, Search } from "lucide-react";
import { gscService } from "@/services/gscService";
import { toast } from "sonner";
import GSCOverviewStats from "./gsc/GSCOverviewStats";
import GSCQueriesTab from "./gsc/GSCQueriesTab";

interface GSCQuery {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface GSCPage {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface GSCPerformanceData {
  queries: GSCQuery[];
  pages: GSCPage[];
  totalClicks: number;
  totalImpressions: number;
  averageCTR: number;
  averagePosition: number;
}

const GSCAnalytics = () => {
  const [performanceData, setPerformanceData] = useState<GSCPerformanceData | null>(null);
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [pageQueries, setPageQueries] = useState<GSCQuery[]>([]);
  const [dateRange, setDateRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPageQueries, setIsLoadingPageQueries] = useState(false);

  useEffect(() => {
    checkConfigurationAndLoadData();
  }, [dateRange]);

  const checkConfigurationAndLoadData = async () => {
    const settings = gscService.getSettings();
    if (!settings.isConfigured) {
      toast.error('يرجى تكوين Google Search Console في الإعدادات أولاً');
      return;
    }
    await loadPerformanceData();
  };

  const loadPerformanceData = async () => {
    setIsLoading(true);
    try {
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date(Date.now() - (parseInt(dateRange) * 24 * 60 * 60 * 1000))
        .toISOString().split('T')[0];
      
      const data = await gscService.getPerformanceData(startDate, endDate);
      setPerformanceData(data);
    } catch (error) {
      toast.error('فشل في جلب بيانات الأداء');
      console.error('Error loading GSC data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadPageQueries = async (page: string) => {
    if (!page) return;
    
    setIsLoadingPageQueries(true);
    try {
      const queries = await gscService.getTopQueriesForPage(page);
      setPageQueries(queries);
    } catch (error) {
      toast.error('فشل في جلب الكلمات المفتاحية للصفحة');
      console.error('Error loading page queries:', error);
    } finally {
      setIsLoadingPageQueries(false);
    }
  };

  const handlePageSelect = (page: string) => {
    setSelectedPage(page);
    loadPageQueries(page);
  };

  const formatUrl = (url: string) => {
    return url.replace('https://musaaed.com', '').substring(0, 50) + '...';
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  if (!gscService.getSettings().isConfigured) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Google Search Console غير مُكوَّن</h3>
          <p className="text-gray-600 mb-4">
            يرجى تكوين إعدادات Google Search Console أولاً لعرض بيانات الأداء
          </p>
          <Button onClick={() => window.location.hash = '#settings'}>
            الانتقال إلى الإعدادات
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">تحليلات البحث</h2>
          <p className="text-gray-600">بيانات الأداء من Google Search Console</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 أيام</SelectItem>
              <SelectItem value="30">30 يوم</SelectItem>
              <SelectItem value="90">90 يوم</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={loadPerformanceData} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      {performanceData && (
        <GSCOverviewStats
          totalClicks={performanceData.totalClicks}
          totalImpressions={performanceData.totalImpressions}
          averageCTR={performanceData.averageCTR}
          averagePosition={performanceData.averagePosition}
        />
      )}

      <Tabs defaultValue="queries" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="queries">أفضل الكلمات المفتاحية</TabsTrigger>
          <TabsTrigger value="pages">أفضل الصفحات</TabsTrigger>
          <TabsTrigger value="analysis">تحليل الصفحات</TabsTrigger>
        </TabsList>

        <TabsContent value="queries" className="space-y-4">
          {performanceData && <GSCQueriesTab queries={performanceData.queries} />}
        </TabsContent>

        <TabsContent value="pages" className="space-y-4">
          {performanceData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  أفضل الصفحات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {performanceData.pages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{formatUrl(page.page)}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <Badge variant="outline" className="text-blue-600">
                            {page.clicks} نقرة
                          </Badge>
                          <Badge variant="outline" className="text-green-600">
                            {page.impressions} ظهور
                          </Badge>
                          <Badge variant="outline" className="text-yellow-600">
                            {page.ctr.toFixed(2)}% نقر
                          </Badge>
                          <Badge variant="outline" className="text-purple-600">
                            المرتبة {page.position.toFixed(1)}
                          </Badge>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handlePageSelect(page.page)}
                      >
                        تحليل
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>تحليل كلمات الصفحة المحددة</CardTitle>
            </CardHeader>
            <CardContent>
              {!selectedPage ? (
                <div className="text-center py-8">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">اختر صفحة من التبويب "أفضل الصفحات" لعرض تحليل الكلمات المفتاحية</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800">الصفحة المختارة:</h4>
                    <p className="text-sm text-blue-600">{selectedPage}</p>
                  </div>

                  {isLoadingPageQueries ? (
                    <div className="text-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                      <p>جاري جلب الكلمات المفتاحية...</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <h4 className="font-semibold">أفضل الكلمات المفتاحية لهذه الصفحة:</h4>
                      {pageQueries.map((query, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium">{query.query}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-sm text-gray-600">{query.clicks} نقرة</span>
                              <span className="text-sm text-gray-600">{query.impressions} ظهور</span>
                              <span className="text-sm text-gray-600">المرتبة {query.position.toFixed(1)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GSCAnalytics;
