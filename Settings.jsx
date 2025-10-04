
import React, { useState, useEffect } from "react";
import { UserRole } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GitMerge, CheckCircle, XCircle, Plus, Lock, Users, KeyRound, Clock, Shield, Database,
  Eye, FileLock2, Settings as SettingsIcon, Building, Palette
} from 'lucide-react';

import SSOIntegrationManager from '../components/settings/SSOIntegrationManager';

// Mock data, in a real app this would come from entities or user state
const currentSubscription = {
  tier: 'enterprise',
  integrations_limit: 20,
  current_integrations: 4
};

const RoleManager = () => {
  const [roles, setRoles] = useState([]);
  
  useEffect(() => {
    const fetchRoles = async () => {
      const mockRoles = [
        { id: '1', role_name: 'Administrator', description: 'Full access to all system features and settings.', permissions: ['all'] },
        { id: '2', role_name: 'Security Analyst', description: 'View and manage security incidents, alerts, and threat intelligence.', permissions: ['view_incidents', 'manage_alerts', 'view_threat_intel'] },
        { id: '3', role_name: 'Auditor', description: 'Read-only access to logs and reports for compliance.', permissions: ['view_logs', 'view_reports'] },
      ];
      setRoles(mockRoles);
    };
    fetchRoles();
  }, []);

  return (
    <Card className="border-gray-700 bg-gray-800/50">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center gap-2"><Users className="w-5 h-5" /> Role-Based Access Control (RBAC)</div>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />New Role
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {roles.map(role => (
            <div key={role.id} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/50">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">{role.role_name}</h3>
                <span className="text-sm text-gray-400">{role.permissions.length} permissions</span>
              </div>
              <p className="text-sm text-gray-400 mt-1">{role.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const IntegrationManager = () => {
    const canAddMore = currentSubscription.current_integrations < currentSubscription.integrations_limit;
    return (
        <Card className="border-gray-700 bg-gray-800/50">
            <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <GitMerge className="w-5 h-5" /> Active Integrations
                </div>
                 <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                        <div className="relative">
                            <Button disabled={!canAddMore} className="bg-blue-600 hover:bg-blue-700">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Integration
                            </Button>
                            {!canAddMore && (
                            <div className="absolute inset-0 bg-transparent cursor-not-allowed rounded-md"></div>
                            )}
                        </div>
                        </TooltipTrigger>
                        {!canAddMore && (
                        <TooltipContent>
                            <p className="flex items-center gap-2"><Lock className="w-4 h-4"/> Upgrade plan to add more integrations.</p>
                        </TooltipContent>
                        )}
                    </Tooltip>
                </TooltipProvider>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-400">Manage connections to third-party services like Jira, ServiceNow, and VirusTotal. You are using {currentSubscription.current_integrations} of {currentSubscription.integrations_limit} available integrations.</p>
            </CardContent>
        </Card>
    )
}

const SecuritySettings = () => {
    const [sessionTimeout, setSessionTimeout] = useState(30);
    
    return (
        <Card className="border-gray-700 bg-gray-800/50">
            <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="w-5 h-5" /> Security & Authentication
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                        <Eye className="w-5 h-5" /> Multi-Factor Authentication (MFA)
                    </h3>
                    <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700/50">
                        <p className="text-white font-medium">Enforce MFA for all users</p>
                        <Switch defaultChecked={true} />
                    </div>
                </div>
                 <div>
                    <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                        <Clock className="w-5 h-5" /> Session Management
                    </h3>
                    <div className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700/50">
                        <label className="text-white font-medium">Lock session after</label>
                        <Input 
                            type="number" 
                            value={sessionTimeout} 
                            onChange={e => setSessionTimeout(e.target.value)} 
                            className="w-20 bg-gray-800 border-gray-600 text-white" 
                        />
                        <span className="text-white">minutes of inactivity.</span>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                        <FileLock2 className="w-5 h-5" /> Data Protection
                    </h3>
                     <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/50 space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="font-medium text-white">Log Encryption (at rest)</span>
                            <span className="text-green-400 font-mono text-sm">FIPS 140-2 Validated</span>
                        </div>
                         <div className="flex items-center justify-between">
                            <span className="font-medium text-white">Log Immutability (WORM)</span>
                            <span className="text-green-400 font-mono text-sm">Enabled</span>
                        </div>
                         <p className="text-xs text-gray-400 pt-2">All logs are encrypted end-to-end and stored in a Write-Once, Read-Many format to prevent tampering and ensure data integrity for forensic analysis.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

const OrganizationSettings = () => {
    const [logoUrl, setLogoUrl] = useState("https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/174051417_Screenshot2025-07-24110248.jpg");
    const [primaryColor, setPrimaryColor] = useState("#4f46e5");

    return (
        <Card className="border-gray-700 bg-gray-800/50">
            <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                    <Building className="w-5 h-5" /> Organization & Branding
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold text-white mb-2">White-Labeling (Enterprise)</h3>
                    <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/50 space-y-4">
                        <div>
                            <label className="block text-white font-medium mb-2">Company Logo URL</label>
                            <Input
                                value={logoUrl}
                                onChange={(e) => setLogoUrl(e.target.value)}
                                placeholder="https://your-domain.com/logo.png"
                                className="bg-gray-800 border-gray-600 text-white"
                            />
                        </div>
                         <div>
                            <label className="block text-white font-medium mb-2 flex items-center gap-2"><Palette/> Primary Color</label>
                            <Input
                                type="color"
                                value={primaryColor}
                                onChange={(e) => setPrimaryColor(e.target.value)}
                                className="w-24 h-10 p-1 bg-gray-800 border-gray-600"
                            />
                        </div>
                        <p className="text-xs text-gray-400">These settings will apply to reports, notifications, and the login page for your users.</p>
                        <Button className="bg-blue-600 hover:bg-blue-700">Save Branding</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default function SettingsPage() {
  return (
    <div className="min-h-screen p-4 md:p-8" style={{ background: 'var(--primary-bg)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <SettingsIcon className="w-8 h-8 text-blue-400" />
              System Settings
            </h1>
            <p className="text-gray-300">Configure security, integrations, and user management</p>
          </div>
        </div>

        <Tabs defaultValue="security" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="security">Security & Auth</TabsTrigger>
            <TabsTrigger value="sso">SSO Integration</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="organization">Organization</TabsTrigger>
          </TabsList>

          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>

          <TabsContent value="sso">
            <SSOIntegrationManager />
          </TabsContent>
          
          <TabsContent value="users">
            <RoleManager />
          </TabsContent>

          <TabsContent value="integrations">
            <IntegrationManager />
          </TabsContent>

          <TabsContent value="organization">
            <OrganizationSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
