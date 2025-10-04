import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Menu,
    Bell,
    User as UserIcon,
    Settings,
    LogOut,
    Shield,
    Activity,
    Search,
    Eye,
    Users,
    AlertTriangle,
    PlayCircle,
    Brain,
    Target,
    CheckCircle,
    BarChart3,
    Cloud,
    Server,
    Smartphone,
    Globe,
    Share2,
    FileText,
    BookOpen,
    BrainCircuit
} from 'lucide-react';
import { User } from '@/api/entities';

const iconMap = {
    Dashboard: BarChart3,
    Incidents: AlertTriangle,
    Investigations: Search,
    ThreatIntel: Eye,
    UserAnalytics: Users,
    InsiderThreatCenter: Users,
    SOAR: PlayCircle,
    AIAdvisoryCenter: Brain,
    AttackSimulations: Shield,
    AutomatedSecurity: Shield,
    ExecutiveDashboard: BarChart3,
    StrategicRiskCenter: Target,
    ImplementationPrioritization: Target,
    AdvancedStrategy: Target,
    HighImpactInitiatives: Target,
    Compliance: CheckCircle,
    CyberCreditScore: Target,
    ProjectManagement: FileText,
    QuantumSafeSecurity: Cloud,
    HomomorphicEncryption: Shield,
    DeceptionPlatforms: Eye,
    DecentralizedIdentity: Users,
    DeepfakeProtection: Eye,
    CyberResilience: Shield,
    DataSources: Server,
    InfrastructureManagement: Server,
    CloudSecurity: Cloud,
    SDWANIntegration: Globe,
    SoftwareDefinedBranch: Globe,
    MobileSecurity: Smartphone,
    Observability: Activity,
    DevSecOps: Shield,
    SecureGatewayServices: Globe,
    IntegrationMarketplace: Share2,
    LicensingPlatform: FileText,
    CapabilitiesGuide: BookOpen,
    CerebraSecIntegration: BrainCircuit,
    PatentedTechnology: Shield,
    Settings: Settings
};

export default function MobileNavigation({ user, navigationGroups, onNotificationClick }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [expandedGroups, setExpandedGroups] = useState({});
    const [notificationCount] = useState(3);
    const location = useLocation();

    const toggleGroup = (groupName) => {
        setExpandedGroups(prev => ({
            ...prev,
            [groupName]: !prev[groupName]
        }));
    };

    const handleLogout = async () => {
        await User.logout();
        window.location.href = createPageUrl('Welcome');
    };

    const getIcon = (itemName) => {
        const Icon = iconMap[itemName] || Shield;
        return Icon;
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50 md:hidden bg-gray-900 border-b border-gray-800">
            <div className="flex items-center justify-between h-16 px-4">
                <div className="flex items-center gap-3">
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-white">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-80 bg-gray-900 border-gray-800 p-0">
                            <SheetHeader className="p-4 border-b border-gray-800">
                                <div className="flex items-center gap-2">
                                    <img 
                                        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/174051417_Screenshot2025-07-24110248.jpg" 
                                        alt="Outpost Zero" 
                                        className="h-8 object-contain" 
                                    />
                                    <SheetTitle className="text-white text-lg">Outpost Zero</SheetTitle>
                                </div>
                            </SheetHeader>

                            <div className="overflow-y-auto h-[calc(100vh-80px)] p-4">
                                {navigationGroups.map(group => {
                                    const isExpanded = expandedGroups[group.name];
                                    return (
                                        <div key={group.name} className="mb-4">
                                            <button
                                                onClick={() => toggleGroup(group.name)}
                                                className="w-full flex items-center justify-between text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2 py-1"
                                            >
                                                {group.name}
                                                <span className="text-lg">{isExpanded ? '−' : '+'}</span>
                                            </button>
                                            {isExpanded && (
                                                <div className="space-y-1">
                                                    {group.items.map(item => {
                                                        const Icon = getIcon(item.name);
                                                        const isActive = location.pathname === item.href;
                                                        return (
                                                            <Link
                                                                key={item.name}
                                                                to={item.href}
                                                                onClick={() => setIsMobileMenuOpen(false)}
                                                                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                                                                    isActive
                                                                        ? 'bg-gray-800 text-white'
                                                                        : 'text-gray-300 hover:bg-gray-800/50'
                                                                }`}
                                                            >
                                                                <Icon className="w-5 h-5 flex-shrink-0" />
                                                                <span className="truncate">{item.name}</span>
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}

                                <div className="pt-4 border-t border-gray-800 mt-4">
                                    <Link
                                        to={createPageUrl('Settings')}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-800/50"
                                    >
                                        <Settings className="w-5 h-5" />
                                        Settings
                                    </Link>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>

                    <span className="text-white font-bold">Outpost Zero</span>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative text-gray-400"
                        onClick={onNotificationClick}
                    >
                        <Bell className="h-5 w-5" />
                        {notificationCount > 0 && (
                            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                                {notificationCount}
                            </Badge>
                        )}
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-gray-400">
                                <UserIcon className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 bg-gray-800 border-gray-700 text-white">
                            <DropdownMenuLabel>
                                <p className="font-medium">{user?.full_name || 'User'}</p>
                                <p className="text-xs text-gray-400 truncate">{user?.email || ''}</p>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-gray-700" />
                            <DropdownMenuItem asChild>
                                <Link to={createPageUrl('Settings')} className="cursor-pointer flex items-center">
                                    <Settings className="mr-2 h-4 w-4" />
                                    Settings
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to={createPageUrl('Subscription')} className="cursor-pointer flex items-center">
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Subscription
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-gray-700" />
                            <DropdownMenuItem 
                                onClick={handleLogout} 
                                className="cursor-pointer text-red-300 focus:bg-red-900/50 focus:text-red-200"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Sign Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}