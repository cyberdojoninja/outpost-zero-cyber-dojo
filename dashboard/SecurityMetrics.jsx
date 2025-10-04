import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Shield,
  AlertTriangle,
  Users,
  Activity,
  Brain,
  Globe,
  TrendingUp
} from "lucide-react";

export default function SecurityMetrics({ events, incidents, threatIntel, userBehavior, advisories, isLoading }) {
  const criticalEvents = events.filter(e => e.severity === 'critical').length;
  const openIncidents = incidents.filter(i => ['open', 'investigating'].includes(i.status)).length;
  const highConfidenceThreats = threatIntel.filter(t => t.confidence > 80).length;
  const anomalousUsers = userBehavior.filter(u => u.anomaly_score > 70).length;
  const criticalAdvisories = advisories ? advisories.filter(a => a.severity === 'critical').length : 0;


  const metrics = [
    {
      title: "Critical Events",
      value: criticalEvents,
      icon: AlertTriangle,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      trend: "+12%",
      description: "Last 24h"
    },
    {
      title: "Active Incidents",
      value: openIncidents,
      icon: Shield,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      trend: "-8%",
      description: "Open cases"
    },
    {
      title: "AI Advisories",
      value: criticalAdvisories,
      icon: Brain,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      trend: "+5",
      description: "Critical & High"
    },
    {
      title: "Anomalous Users",
      value: anomalousUsers,
      icon: Users,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      trend: "+5%",
      description: "Unusual behavior"
    },
    {
      title: "Threat Intel",
      value: highConfidenceThreats,
      icon: Globe,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      trend: "+18%",
      description: "High confidence"
    },
    {
        title: "ML Risk Score",
        value: userBehavior.length > 0 ?
          Math.round(userBehavior.reduce((sum, b) => sum + (b.anomaly_score || 0), 0) / userBehavior.length) : 0,
        icon: Activity,
        color: "text-green-400",
        bgColor: "bg-green-500/10",
        trend: "-3%",
        description: "Average score"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6 md:mb-8">
      {metrics.map((metric, index) => {
        const IconComponent = metric.icon;

        return (
          <Card key={index} className="border-gray-700 bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                  <IconComponent className={`w-4 h-4 ${metric.color}`} />
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-green-400">{metric.trend}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div>
                <div className={`text-xl md:text-2xl font-bold ${metric.color} mb-1`}>
                  {isLoading ? <Skeleton className="h-6 md:h-8 w-12" /> : metric.value}
                </div>
                <p className="text-xs font-medium text-white mb-1 truncate">{metric.title}</p>
                <p className="text-xs text-gray-400 truncate">{metric.description}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}