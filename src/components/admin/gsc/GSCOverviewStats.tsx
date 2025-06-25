
import { Card, CardContent } from "@/components/ui/card";
import { MousePointer, Eye, Target, BarChart3 } from "lucide-react";

interface GSCOverviewStatsProps {
  totalClicks: number;
  totalImpressions: number;
  averageCTR: number;
  averagePosition: number;
}

const GSCOverviewStats = ({ 
  totalClicks, 
  totalImpressions, 
  averageCTR, 
  averagePosition 
}: GSCOverviewStatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <MousePointer className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">إجمالي النقرات</p>
              <p className="text-xl font-bold">{totalClicks.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">إجمالي الظهور</p>
              <p className="text-xl font-bold">{totalImpressions.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="text-sm text-gray-600">متوسط النقر</p>
              <p className="text-xl font-bold">{averageCTR.toFixed(2)}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">متوسط الترتيب</p>
              <p className="text-xl font-bold">{averagePosition.toFixed(1)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GSCOverviewStats;
