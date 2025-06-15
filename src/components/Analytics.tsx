import { Users, Activity, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AnalyticsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  iconColor: string;
}

function AnalyticsCard({ icon, title, value, change, changeType, iconColor }: AnalyticsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 ${iconColor} rounded-lg flex items-center justify-center`}>
            {icon}
          </div>
          <span className={`text-sm font-medium ${
            changeType === 'positive' ? 'text-green-600' : 'text-red-600'
          }`}>
            {change}
          </span>
        </div>
        <div className="text-2xl font-bold text-slate-800 mb-1">{value}</div>
        <div className="text-sm text-slate-600">{title}</div>
      </CardContent>
    </Card>
  );
}

interface ProgressBarProps {
  label: string;
  value: string;
  percentage: number;
  color: string;
}

function ProgressBar({ label, value, percentage, color }: ProgressBarProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-slate-600">{label}</span>
        <span className="text-sm font-medium text-slate-800">{value}</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div 
          className={`${color} h-2 rounded-full`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default function Analytics() {
  const analyticsData = [
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Active Users",
      value: "2,347",
      change: "+12%",
      changeType: "positive" as const,
      iconColor: "bg-blue-600/10"
    },
    {
      icon: <Activity className="w-6 h-6 text-emerald-600" />,
      title: "Sessions",
      value: "1,234",
      change: "+8%",
      changeType: "positive" as const,
      iconColor: "bg-emerald-600/10"
    },
    {
      icon: <Clock className="w-6 h-6 text-purple-600" />,
      title: "Avg. Session",
      value: "4:32",
      change: "-2%",
      changeType: "negative" as const,
      iconColor: "bg-purple-600/10"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-amber-500" />,
      title: "Conversion Rate",
      value: "23.1%",
      change: "+15%",
      changeType: "positive" as const,
      iconColor: "bg-amber-500/10"
    }
  ];

  const performanceMetrics = [
    {
      label: "Bundle Size",
      value: "245 KB",
      percentage: 65,
      color: "bg-blue-600"
    },
    {
      label: "Load Time",
      value: "1.2s",
      percentage: 85,
      color: "bg-emerald-600"
    },
    {
      label: "Lighthouse Score",
      value: "94/100",
      percentage: 94,
      color: "bg-purple-600"
    }
  ];

  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Application Analytics
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Monitor your React application performance and user engagement.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {analyticsData.map((item, index) => (
            <AnalyticsCard key={index} {...item} />
          ))}
        </div>
        
        <Card>
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold text-slate-800 mb-6">Performance Metrics</h3>
            <div className="grid lg:grid-cols-3 gap-8">
              {performanceMetrics.map((metric, index) => (
                <ProgressBar key={index} {...metric} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
