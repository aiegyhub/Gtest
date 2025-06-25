import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Database, TrendingUp, FileText, AlertTriangle, CheckCircle, Clock, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ProcessingTask {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  lastRun?: string;
}

const DataProcessor = () => {
  const [tasks, setTasks] = useState<ProcessingTask[]>([
    { id: '1', name: 'جلب بيانات Google Analytics', status: 'completed', progress: 100, lastRun: '2024-01-15 14:30' },
    { id: '2', name: 'تحليل أداء الصفحات', status: 'completed', progress: 100, lastRun: '2024-01-15 14:25' },
    { id: '3', name: 'إنتاج تقارير SEO', status: 'pending', progress: 0 },
    { id: '4', name: 'تحديث المحتوى التلقائي', status: 'pending', progress: 0 },
    { id: '5', name: 'تحليل المنافسين', status: 'error', progress: 0, lastRun: '2024-01-15 12:00' },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const startProcessing = async () => {
    setIsProcessing(true);
    toast.info("بدء معالجة البيانات المجدولة...");

    for (const task of tasks) {
      if (task.status === 'pending' || task.status === 'error') {
        setTasks(prev => prev.map(t => 
          t.id === task.id ? { ...t, status: 'processing', progress: 0 } : t
        ));

        for (let progress = 0; progress <= 100; progress += 20) {
          await new Promise(resolve => setTimeout(resolve, 300));
          setTasks(prev => prev.map(t => 
            t.id === task.id ? { ...t, progress } : t
          ));
        }

        setTasks(prev => prev.map(t => 
          t.id === task.id ? { 
            ...t, 
            status: 'completed', 
            progress: 100,
            lastRun: new Date().toLocaleString('ar-SA')
          } : t
        ));
      }
    }

    setIsProcessing(false);
    toast.success("اكتملت معالجة البيانات بنجاح.");
  };

  const getStatusInfo = (status: ProcessingTask['status']) => {
    switch (status) {
      case 'completed': return { icon: CheckCircle, color: 'text-green-600', badge: 'bg-green-100 text-green-800', label: 'مكتمل' };
      case 'processing': return { icon: Loader2, color: 'text-blue-600', badge: 'bg-blue-100 text-blue-800', label: 'قيد المعالجة' };
      case 'error': return { icon: AlertTriangle, color: 'text-red-600', badge: 'bg-red-100 text-red-800', label: 'خطأ' };
      default: return { icon: Clock, color: 'text-gray-600', badge: 'bg-gray-100 text-gray-800', label: 'في الانتظار' };
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            معالج البيانات المتقدم
          </div>
          <Button onClick={startProcessing} disabled={isProcessing} className="gap-2">
            <RefreshCw className={`h-4 w-4 ${isProcessing ? 'animate-spin' : ''}`} />
            {isProcessing ? 'جاري المعالجة...' : 'بدء المعالجة الآن'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => {
            const { icon: Icon, color, badge, label } = getStatusInfo(task.status);
            return (
              <div key={task.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-5 w-5 ${color} ${task.status === 'processing' ? 'animate-spin' : ''}`} />
                    <span className="font-medium">{task.name}</span>
                  </div>
                  <Badge className={badge}>{label}</Badge>
                </div>
                
                <Progress value={task.progress} className="mb-2 h-2" />
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{task.progress}%</span>
                  {task.lastRun && <span>آخر تشغيل: {task.lastRun}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataProcessor;