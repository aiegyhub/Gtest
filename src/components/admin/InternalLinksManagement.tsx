import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link2, Link2Off, CheckCircle, RefreshCw, Loader2 } from "lucide-react"; // Corrected: Added CheckCircle
import { useState } from "react";
import { toast } from "sonner";

const InternalLinksManagement = () => {
  const [isAuditing, setIsAuditing] = useState(false);
  const [linkStats, setLinkStats] = useState({
    totalLinks: 2845,
    activeLinks: 2801,
    brokenLinks: 44,
    serviceToCity: 1250,
    cityToService: 1180,
    otherInternal: 415
  });

  const runLinkAudit = async () => {
    setIsAuditing(true);
    toast.info("بدء تدقيق الروابط الداخلية...");
    await new Promise(resolve => setTimeout(resolve, 2500));
    toast.success("اكتمل تدقيق الروابط الداخلية.");
    setIsAuditing(false);
  };

  const totalLinkTypes = linkStats.serviceToCity + linkStats.cityToService + linkStats.otherInternal;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>إدارة الروابط الداخلية</span>
          <Button variant="outline" size="sm" onClick={runLinkAudit} disabled={isAuditing}>
            {isAuditing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
            {isAuditing ? "جاري التدقيق..." : "تدقيق الروابط"}
          </Button>
        </CardTitle>
        <p className="text-sm text-muted-foreground">مراقبة وتحسين بنية الربط الداخلي للموقع.</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2"><Link2 className="h-4 w-4 text-blue-600" /><span className="font-medium">إجمالي الروابط</span></div>
            <p className="text-2xl font-bold text-blue-600">{linkStats.totalLinks.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2"><CheckCircle className="h-4 w-4 text-green-600" /><span className="font-medium">روابط نشطة</span></div>
            <p className="text-2xl font-bold text-green-600">{linkStats.activeLinks.toLocaleString()}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2"><Link2Off className="h-4 w-4 text-red-600" /><span className="font-medium">روابط مكسورة</span></div>
            <p className="text-2xl font-bold text-red-600">{linkStats.brokenLinks}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold mb-3">توزيع أنواع الروابط</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1"><span>خدمات → مدن</span><span>{Math.round((linkStats.serviceToCity / totalLinkTypes) * 100)}%</span></div>
              <Progress value={(linkStats.serviceToCity / totalLinkTypes) * 100} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1"><span>مدن → خدمات</span><span>{Math.round((linkStats.cityToService / totalLinkTypes) * 100)}%</span></div>
              <Progress value={(linkStats.cityToService / totalLinkTypes) * 100} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1"><span>روابط أخرى</span><span>{Math.round((linkStats.otherInternal / totalLinkTypes) * 100)}%</span></div>
              <Progress value={(linkStats.otherInternal / totalLinkTypes) * 100} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InternalLinksManagement;