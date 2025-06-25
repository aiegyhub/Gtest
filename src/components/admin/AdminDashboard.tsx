import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PhoneNumbersAdmin from "@/components/admin/PhoneNumbersAdmin";
import GSCAnalytics from "@/components/admin/GSCAnalytics";
import KeywordAnalyzer from "@/components/admin/KeywordAnalyzer";
import SEOAuditDashboard from "@/components/admin/SEOAuditDashboard";
import AIContentOptimizer from "@/components/admin/AIContentOptimizer";
import PredictiveAnalyticsDashboard from "@/components/admin/PredictiveAnalyticsDashboard";
import PerformanceMonitor from "../PerformanceMonitor";
import ContentManagement from "@/components/admin/ContentManagement";
import AdminSettings from "@/components/admin/AdminSettings";
import GSCSettings from "@/components/admin/GSCSettings";
import XMLSitemapGenerator from "@/components/admin/XMLSitemapGenerator";
import SEOHealthMonitor from "@/components/SEOHealthMonitor";
import LLMSManager from "@/components/admin/LLMSManager";
import GeminiSettings from "@/components/admin/GeminiSettings";
import GoogleAnalyticsSettings from "@/components/admin/GoogleAnalyticsSettings";
import SchemaMarkupManager from "@/components/admin/SchemaMarkupManager";
import SmartCaching from "@/components/admin/SmartCaching";
import PreloadedSEOData from "@/components/admin/PreloadedSEOData";
import CacheManagement from "@/components/admin/CacheManagement";
import ImageOptimization from "@/components/admin/ImageOptimization";
import DataProcessor from "@/components/admin/DataProcessor";
import DashboardStats from "./DashboardStats";
import CRMDashboard from "./CRMDashboard";
import ManualContentEditor from "./ManualContentEditor";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة التحكم الإدارية</h1>
        <p className="text-gray-600">إدارة شاملة لموقع توب كلينرز للخدمات المنزلية</p>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          <TabsTrigger value="dashboard">الرئيسية</TabsTrigger>
          <TabsTrigger value="content">المحتوى</TabsTrigger>
          <TabsTrigger value="seo">تحسين محركات البحث</TabsTrigger>
          <TabsTrigger value="crm">إدارة العملاء</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <DashboardStats />
          {/* Removed the redundant components here. This data is in other dashboards. */}
          <PredictiveAnalyticsDashboard /> 
        </TabsContent>

        <TabsContent value="content">
          <Tabs defaultValue="ai-content" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ai-content">المحتوى الذكي (AI)</TabsTrigger>
              <TabsTrigger value="manual-content">المحتوى اليدوي</TabsTrigger>
            </TabsList>
            <TabsContent value="ai-content"><AIContentOptimizer /></TabsContent>
            <TabsContent value="manual-content"><ManualContentEditor /></TabsContent>
          </Tabs>
        </TabsContent>
        
        <TabsContent value="seo">
          <Tabs defaultValue="seo-audit" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="seo-audit">تدقيق SEO</TabsTrigger>
              <TabsTrigger value="keywords">تحليل الكلمات</TabsTrigger>
              <TabsTrigger value="sitemap">خريطة الموقع</TabsTrigger>
              <TabsTrigger value="llm">ملف LLM</TabsTrigger>
            </TabsList>
            <TabsContent value="seo-audit"><SEOAuditDashboard /></TabsContent>
            <TabsContent value="keywords"><KeywordAnalyzer /></TabsContent>
            <TabsContent value="sitemap"><XMLSitemapGenerator /></TabsContent>
            <TabsContent value="llm"><LLMSManager /></TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="crm"><CRMDashboard /></TabsContent>

        <TabsContent value="analytics">
          <Tabs defaultValue="gsc" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="gsc">تحليلات البحث (GSC)</TabsTrigger>
              <TabsTrigger value="performance">أداء الموقع</TabsTrigger>
            </TabsList>
            <TabsContent value="gsc"><GSCAnalytics /></TabsContent>
            <TabsContent value="performance"><PerformanceMonitor /></TabsContent>
          </Tabs>
        </TabsContent>
        
        <TabsContent value="settings">
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="general">عام</TabsTrigger>
              <TabsTrigger value="ai">إعدادات AI</TabsTrigger>
              <TabsTrigger value="integrations">التكاملات</TabsTrigger>
              <TabsTrigger value="performance-opt">تحسين الأداء</TabsTrigger>
            </TabsList>
            <TabsContent value="general"><AdminSettings /></TabsContent>
            <TabsContent value="ai"><GeminiSettings /></TabsContent>
            <TabsContent value="integrations">
              <div className="space-y-6">
                <GSCSettings />
                <GoogleAnalyticsSettings />
                <SchemaMarkupManager />
              </div>
            </TabsContent>
            <TabsContent value="performance-opt">
              <div className="space-y-6">
                <SmartCaching />
                <ImageOptimization />
                <PreloadedSEOData />
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;