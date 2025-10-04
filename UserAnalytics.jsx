import React, { useState, useEffect, useCallback } from "react";
import { UserBehavior } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, AlertTriangle, Activity } from "lucide-react";
import UserBehaviorCard from "../components/user-analytics/UserBehaviorCard";
import AnomalyDetails from "../components/user-analytics/AnomalyDetails";
import MobileDrawer from "../components/shared/MobileDrawer";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import EmptyState from "../components/shared/EmptyState";
import ResponsiveCard from "../components/shared/ResponsiveCard";

export default function UserAnalyticsPage() {
  const [behaviors, setBehaviors] = useState([]);
  const [selectedBehavior, setSelectedBehavior] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileDetails, setShowMobileDetails] = useState(false);

  const mockBehaviors = [
      { id: '1', user_id: 'john.doe@example.com', session_id: 'sess_123', activity_type: 'login', timestamp: new Date().toISOString(), source_ip: '203.0.113.55', device_type: 'unknown', location: 'Russia', anomaly_score: 95, baseline_deviation: 3.5, risk_factors: ['login_from_unusual_country', 'impossible_travel'], normal_pattern: false },
      { id: '2', user_id: 'jane.smith@example.com', session_id: 'sess_456', activity_type: 'data_transfer', timestamp: new Date().toISOString(), source_ip: '192.168.1.50', device_type: 'corporate_laptop', location: 'USA', anomaly_score: 82, baseline_deviation: 2.1, risk_factors: ['large_data_upload_off_hours'], normal_pattern: false },
      { id: '3', user_id: 'admin@corp.local', session_id: 'sess_789', activity_type: 'privilege_usage', timestamp: new Date().toISOString(), source_ip: '10.0.0.5', device_type: 'server', location: 'Data Center 1', anomaly_score: 75, baseline_deviation: 1.8, risk_factors: ['new_admin_command_used'], normal_pattern: false }
  ];

  const loadBehaviorData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await UserBehavior.list("-anomaly_score");
      setBehaviors(data.length > 0 ? data : mockBehaviors);
    } catch (error) {
      console.error("Error loading user behavior data:", error);
      setBehaviors(mockBehaviors);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadBehaviorData();
  }, [loadBehaviorData]);
  
  const highRiskUsers = behaviors.filter(b => b.anomaly_score > 80).length;

  const handleSelectBehavior = (behavior) => {
    setSelectedBehavior(behavior);
    setShowMobileDetails(true);
  };

  return (
    <div className="min-h-screen p-4 md:p-8" style={{background: 'var(--primary-bg)'}}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8">User Behavior Analytics (UEBA)</h1>
        
        {isLoading ? (
          <LoadingSpinner message="Loading user behavior data..." />
        ) : (
          <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-1 space-y-4">
              <ResponsiveCard className="p-4 md:p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    High-Risk Users
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="text-3xl md:text-4xl font-bold text-red-400">{highRiskUsers}</div>
                  <p style={{color: 'var(--text-secondary)'}} className="text-sm mt-2">Users with anomaly scores &gt; 80</p>
                </CardContent>
              </ResponsiveCard>

              <div className="space-y-3 md:space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {behaviors.length === 0 ? (
                  <EmptyState
                    type="behaviors"
                    title="No Behavioral Data"
                    description="No user behavior anomalies detected"
                    showRefresh
                    onRefresh={loadBehaviorData}
                  />
                ) : (
                  behaviors.map(behavior => (
                    <UserBehaviorCard 
                      key={behavior.id} 
                      behavior={behavior} 
                      onClick={() => handleSelectBehavior(behavior)}
                      isSelected={selectedBehavior?.id === behavior.id}
                    />
                  ))
                )}
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-2">
              <AnomalyDetails behavior={selectedBehavior} />
            </div>
          </div>
        )}

        <MobileDrawer
          isOpen={showMobileDetails}
          onClose={() => setShowMobileDetails(false)}
          title="Anomaly Details"
        >
          <AnomalyDetails behavior={selectedBehavior} />
        </MobileDrawer>
      </div>
    </div>
  );
}