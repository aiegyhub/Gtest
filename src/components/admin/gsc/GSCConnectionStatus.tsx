
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";

interface GSCConnectionStatusProps {
  isConfigured: boolean;
  connectionStatus: 'success' | 'error' | null;
}

const GSCConnectionStatus = ({ isConfigured, connectionStatus }: GSCConnectionStatusProps) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h4 className="font-semibold mb-3">حالة الاتصال</h4>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span>التكوين</span>
          {isConfigured ? (
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 ml-1" />
              مُكوَّن
            </Badge>
          ) : (
            <Badge variant="destructive">
              <XCircle className="h-3 w-3 ml-1" />
              غير مُكوَّن
            </Badge>
          )}
        </div>

        {connectionStatus && (
          <div className="flex items-center justify-between">
            <span>الاتصال</span>
            {connectionStatus === 'success' ? (
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 ml-1" />
                متصل
              </Badge>
            ) : (
              <Badge variant="destructive">
                <XCircle className="h-3 w-3 ml-1" />
                غير متصل
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GSCConnectionStatus;
