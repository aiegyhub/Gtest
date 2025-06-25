
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

interface GSCQuery {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface GSCQueriesTabProps {
  queries: GSCQuery[];
}

const GSCQueriesTab = ({ queries }: GSCQueriesTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          أفضل الكلمات المفتاحية
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {queries.slice(0, 10).map((query, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium">{query.query}</p>
                <div className="flex items-center gap-4 mt-1">
                  <Badge variant="outline" className="text-blue-600">
                    {query.clicks} نقرة
                  </Badge>
                  <Badge variant="outline" className="text-green-600">
                    {query.impressions} ظهور
                  </Badge>
                  <Badge variant="outline" className="text-yellow-600">
                    {query.ctr.toFixed(2)}% نقر
                  </Badge>
                  <Badge variant="outline" className="text-purple-600">
                    المرتبة {query.position.toFixed(1)}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GSCQueriesTab;
