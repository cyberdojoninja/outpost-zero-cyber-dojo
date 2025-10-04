
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  AlertTriangle, 
  Shield, 
  Activity,
  MapPin,
  Clock,
  User,
  Eye,
  CheckCircle,
  XCircle
} from "lucide-react";
import { format } from "date-fns";

const severityColors = {
  low: "bg-green-500/20 text-green-300 border-green-500/30",
  medium: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30", 
  high: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  critical: "bg-red-500/20 text-red-300 border-red-500/30"
};

const eventIcons = {
  login_attempt: User,
  malware_detected: Shield,
  network_anomaly: Activity,
  data_exfiltration: AlertTriangle,
  privilege_escalation: AlertTriangle,
  lateral_movement: Activity,
  command_execution: AlertTriangle,
  file_access: Activity
};

export default function RecentEvents({ events, isLoading }) {
  const handleEventAction = (event, action) => {
    const actions = {
      investigate: `🔍 INVESTIGATION STARTED\n\nEvent: ${event.event_type}\nPriority: ${event.severity}\n\nIn production, this would:\n• Create investigation case #INV-${Date.now()}\n• Assign to SOC analyst\n• Gather related logs\n• Timeline analysis\n• Evidence collection`,
      dismiss: `✅ EVENT DISMISSED\n\nEvent marked as reviewed.\n\nIn production, this would:\n• Update event status to 'dismissed'\n• Log analyst decision\n• Update ML model feedback\n• Remove from active queue`,
      escalate: `🚨 EVENT ESCALATED\n\nEscalated to Tier 2 analyst.\n\nIn production, this would:\n• Create high-priority ticket\n• Notify senior analyst\n• Trigger automated playbook\n• Send alert to incident response team`
    };
    
    alert(actions[action]);
  };

  return (
    <Card className="border-gray-600 bg-gray-800/60 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-lg flex items-center gap-3">
          <Activity className="w-6 h-6 text-blue-400" />
          Recent Security Events
          <Badge variant="outline" className="ml-auto text-blue-300 border-blue-400/50">
            Live Feed
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-80 md:max-h-96 overflow-y-auto app-scrollbar">
          {isLoading ? (
            Array(5).fill(0).map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-gray-900/40 border border-gray-700/50">
                <Skeleton className="w-12 h-12 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))
          ) : events.length === 0 ? (
            <div className="text-center py-8">
              <Shield className="w-12 h-12 text-gray-500 mx-auto mb-3" />
              <p className="text-gray-300">No recent security events</p>
            </div>
          ) : (
            events.slice(0, 10).map((event) => {
              const IconComponent = eventIcons[event.event_type] || Activity;
              
              return (
                <div key={event.id} className="group flex items-start gap-4 p-4 rounded-lg bg-gray-900/40 hover:bg-gray-900/60 transition-all duration-200 border border-gray-700/50">
                  <div className={`p-3 rounded-lg ${severityColors[event.severity]?.replace('text-', 'bg-').replace('border-', '').replace('/30', '/10')}`}>
                    <IconComponent className={`w-5 h-5 ${severityColors[event.severity]?.split(' ')[1]}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="text-white font-semibold text-base">
                        {event.event_type?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                      <Badge variant="outline" className={`${severityColors[event.severity]} font-medium`}>
                        {event.severity.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-200 text-sm mb-3 leading-relaxed">
                      {event.description || 'Security event detected - requires analyst review'}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-300 mb-3 flex-wrap">
                      {event.source_ip && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{event.source_ip}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{format(new Date(event.timestamp), 'HH:mm:ss')}</span>
                      </div>
                      {event.ml_risk_score && (
                        <Badge variant="outline" className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/30">
                          Risk Score: {event.ml_risk_score}
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-wrap">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="bg-blue-600/20 border-blue-500/50 text-blue-300 hover:bg-blue-600/30 hover:text-blue-200"
                        onClick={() => handleEventAction(event, 'investigate')}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        <span className="hidden sm:inline">Investigate</span>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="bg-green-600/20 border-green-500/50 text-green-300 hover:bg-green-600/30 hover:text-green-200"
                        onClick={() => handleEventAction(event, 'dismiss')}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        <span className="hidden sm:inline">Dismiss</span>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="bg-red-600/20 border-red-500/50 text-red-300 hover:bg-red-600/30 hover:text-red-200"
                        onClick={() => handleEventAction(event, 'escalate')}
                      >
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        <span className="hidden sm:inline">Escalate</span>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
