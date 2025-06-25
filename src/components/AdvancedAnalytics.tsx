import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, Users, Phone, MessageCircle, Globe, MapPin, Clock } from "lucide-react";

const AdvancedAnalytics = () => {
  const [trafficData, setTrafficData] = useState([
    { month: "يناير", organic: 4000, direct: 2400, social: 800, referral: 600 },
    { month: "فبراير", organic: 4500, direct: 2600, social: 900, referral: 700 },
    { month: "مارس", organic: 5200, direct: 2800, social: 1100, referral: 850 },
    { month: "أبريل", organic: 5800, direct: 3100, social: 1300, referral: 900 },
    { month: "مايو", organic: 6400, direct: 3400, social: 1450, referral: 950 },
    { month: "يونيو", organic: 7200, direct: 3700, social: 1600, referral: 1100 }
  ]);

  const [conversionData, setConversionData] = useState([
    { service: "تنظيف المنازل", calls: 156, whatsapp: 89, forms: 34, conversion: 8.2 },
    { service: "مكافحة الحشرات", calls: 132, whatsapp: 76, forms: 28, conversion: 7.1 },
    { service: "خدمات التكييف", calls: 98, whatsapp: 54, forms: 21, conversion: 6.8 },
    { service: "خدمات السباكة", calls: 87, whatsapp: 45, forms: 18, conversion: 5.9 },
    { service: "خدمات الكهرباء", calls: 76, whatsapp: 38, forms: 15, conversion: 5.4 }
  ]);

  const [cityPerformance, setCityPerformance] = useState([
    { city: "الرياض", visits: 12543, conversions: 512, rate: 4.1 },
    { city: "جدة", visits: 9876, conversions: 389, rate: 3.9 },
    { city: "الدمام", visits: 7234, conversions: 267, rate: 3.7 },
    { city: "مكة", visits: 5432, conversions: 198, rate: 3.6 },
    { city: "المدينة", visits: 4321, conversions: 147, rate: 3.4 }
  ]);

  const [deviceData, setDeviceData] = useState([
    { name: "الجوال", value: 68, color: "#0ea5e9" },
    { name: "سطح المكتب", value: 24, color: "#10b981" },
    { name: "التابلت", value: 8, color: "#f59e0b" }
  ]);

  return (
    <div className="space-y-6" dir="rtl">
      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي الزيارات</p>
                <p className="text-2xl font-bold">45,678</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 ml-1" />
                  <span className="text-sm text-green-600">+12.5%</span>
                </div>
              </div>
              <Globe className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي المكالمات</p>
                <p className="text-2xl font-bold">1,234</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 ml-1" />
                  <span className="text-sm text-green-600">+8.3%</span>
                </div>
              </div>
              <Phone className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">رسائل واتساب</p>
                <p className="text-2xl font-bold">876</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 ml-1" />
                  <span className="text-sm text-green-600">+15.2%</span>
                </div>
              </div>
              <MessageCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">معدل التحويل</p>
                <p className="text-2xl font-bold">7.2%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 ml-1" />
                  <span className="text-sm text-green-600">+2.1%</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Sources Chart */}
      <Card>
        <CardHeader>
          <CardTitle>مصادر الزيارات</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="organic" stackId="1" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.6} />
              <Area type="monotone" dataKey="direct" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
              <Area type="monotone" dataKey="social" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
              <Area type="monotone" dataKey="referral" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Service Performance and City Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>أداء الخدمات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversionData.map((service, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{service.service}</span>
                    <Badge variant="outline">{service.conversion}%</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      <span>{service.calls}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>{service.whatsapp}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{service.forms}</span>
                    </div>
                  </div>
                  <Progress value={service.conversion * 10} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>أداء المدن</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cityPerformance.map((city, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="font-medium">{city.city}</p>
                      <p className="text-sm text-gray-600">{city.visits.toLocaleString()} زيارة</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{city.conversions}</p>
                    <p className="text-sm text-gray-600">{city.rate}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Device Usage and Real-time Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>توزيع الأجهزة</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={(entry) => `${entry.name}: ${entry.value}%`}
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>المقاييس الفورية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span>الزوار النشطون الآن</span>
                </div>
                <span className="text-xl font-bold text-blue-600">127</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-green-600" />
                  <span>المكالمات اليوم</span>
                </div>
                <span className="text-xl font-bold text-green-600">45</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-purple-600" />
                  <span>رسائل واتساب اليوم</span>
                </div>
                <span className="text-xl font-bold text-purple-600">32</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;
