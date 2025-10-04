import Layout from "./Layout.jsx";

import Dashboard from "./Dashboard";

import Incidents from "./Incidents";

import ThreatIntel from "./ThreatIntel";

import UserAnalytics from "./UserAnalytics";

import SOAR from "./SOAR";

import Compliance from "./Compliance";

import Reporting from "./Reporting";

import Settings from "./Settings";

import Training from "./Training";

import CloudSecurity from "./CloudSecurity";

import Investigations from "./Investigations";

import ThreatFeeds from "./ThreatFeeds";

import Subscription from "./Subscription";

import NetworkDashboard from "./NetworkDashboard";

import CloudDashboard from "./CloudDashboard";

import ProjectManagement from "./ProjectManagement";

import DevSecOps from "./DevSecOps";

import PlatformArchitecture from "./PlatformArchitecture";

import CommunityHub from "./CommunityHub";

import VulnerabilityManagement from "./VulnerabilityManagement";

import Quarantine from "./Quarantine";

import VendorAdvisories from "./VendorAdvisories";

import Notifications from "./Notifications";

import SIEMComparison from "./SIEMComparison";

import PhysicalSecurity from "./PhysicalSecurity";

import GapAnalysis from "./GapAnalysis";

import CounterIntelligenceHub from "./CounterIntelligenceHub";

import PredictiveAlerts from "./PredictiveAlerts";

import Guides from "./Guides";

import DataSources from "./DataSources";

import Sandbox from "./Sandbox";

import SystemRequirements from "./SystemRequirements";

import AIModelManagement from "./AIModelManagement";

import Observability from "./Observability";

import AIAdvisoryCenter from "./AIAdvisoryCenter";

import MobileSecurity from "./MobileSecurity";

import ExecutiveDashboard from "./ExecutiveDashboard";

import ZeroTrustDashboard from "./ZeroTrustDashboard";

import PrivacyPolicy from "./PrivacyPolicy";

import TermsOfService from "./TermsOfService";

import HealthcareCompliance from "./HealthcareCompliance";

import InfrastructureManagement from "./InfrastructureManagement";

import PatentedTechnology from "./PatentedTechnology";

import PatentedTechnologyImplementation from "./PatentedTechnologyImplementation";

import ThreatPredictionMarket from "./ThreatPredictionMarket";

import CyberInsuranceHub from "./CyberInsuranceHub";

import DeepfakeProtection from "./DeepfakeProtection";

import CyberCreditScore from "./CyberCreditScore";

import AttackSimulations from "./AttackSimulations";

import QuantumSafeSecurity from "./QuantumSafeSecurity";

import DeceptionPlatforms from "./DeceptionPlatforms";

import HomomorphicEncryption from "./HomomorphicEncryption";

import DecentralizedIdentity from "./DecentralizedIdentity";

import CyberResilience from "./CyberResilience";

import CyberAwarenessTraining from "./CyberAwarenessTraining";

import QueryStudio from "./QueryStudio";

import MultiPlatformDashboard from "./MultiPlatformDashboard";

import LicensingPlatform from "./LicensingPlatform";

import APIDocumentation from "./APIDocumentation";

import StrategicRiskCenter from "./StrategicRiskCenter";

import IntegrationMarketplace from "./IntegrationMarketplace";

import DeploymentPlan from "./DeploymentPlan";

import SecurityToolIntegrations from "./SecurityToolIntegrations";

import InsiderThreatCenter from "./InsiderThreatCenter";

import Welcome from "./Welcome";

import MobileDeviceManagement from "./MobileDeviceManagement";

import WelcomeRedirect from "./WelcomeRedirect";

import StripeSuccess from "./StripeSuccess";

import NextSteps from "./NextSteps";

import DomainSetup from "./DomainSetup";

import AutomatedSecurity from "./AutomatedSecurity";

import DomainDebug from "./DomainDebug";

import DiagnosticTest from "./DiagnosticTest";

import EmergencyDashboard from "./EmergencyDashboard";

import About from "./About";

import AndroidIntegrationGuide from "./AndroidIntegrationGuide";

import AndroidStepByStep from "./AndroidStepByStep";

import MobileAppDownloads from "./MobileAppDownloads";

import RemotionSetupGuide from "./RemotionSetupGuide";

import MicrosoftISVIntegration from "./MicrosoftISVIntegration";

import StrategicRoadmap from "./StrategicRoadmap";

import ImplementationPrioritization from "./ImplementationPrioritization";

import AdvancedStrategy from "./AdvancedStrategy";

import HighImpactInitiatives from "./HighImpactInitiatives";

import CerebraSecIntegration from "./CerebraSecIntegration";

import CapabilitiesGuide from "./CapabilitiesGuide";

import SDWANIntegration from "./SDWANIntegration";

import SecureGatewayServices from "./SecureGatewayServices";

import SoftwareDefinedBranch from "./SoftwareDefinedBranch";

import InfrastructureAsCodeManagementPlatform from "./InfrastructureAsCodeManagementPlatform";

import SystemStatus from "./SystemStatus";

import KnowledgeCenter from "./KnowledgeCenter";

import SDKMarketplace from "./SDKMarketplace";

import CustomSDKRequest from "./CustomSDKRequest";

import MySDKs from "./MySDKs";

import AgentDeployment from "./AgentDeployment";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Dashboard: Dashboard,
    
    Incidents: Incidents,
    
    ThreatIntel: ThreatIntel,
    
    UserAnalytics: UserAnalytics,
    
    SOAR: SOAR,
    
    Compliance: Compliance,
    
    Reporting: Reporting,
    
    Settings: Settings,
    
    Training: Training,
    
    CloudSecurity: CloudSecurity,
    
    Investigations: Investigations,
    
    ThreatFeeds: ThreatFeeds,
    
    Subscription: Subscription,
    
    NetworkDashboard: NetworkDashboard,
    
    CloudDashboard: CloudDashboard,
    
    ProjectManagement: ProjectManagement,
    
    DevSecOps: DevSecOps,
    
    PlatformArchitecture: PlatformArchitecture,
    
    CommunityHub: CommunityHub,
    
    VulnerabilityManagement: VulnerabilityManagement,
    
    Quarantine: Quarantine,
    
    VendorAdvisories: VendorAdvisories,
    
    Notifications: Notifications,
    
    SIEMComparison: SIEMComparison,
    
    PhysicalSecurity: PhysicalSecurity,
    
    GapAnalysis: GapAnalysis,
    
    CounterIntelligenceHub: CounterIntelligenceHub,
    
    PredictiveAlerts: PredictiveAlerts,
    
    Guides: Guides,
    
    DataSources: DataSources,
    
    Sandbox: Sandbox,
    
    SystemRequirements: SystemRequirements,
    
    AIModelManagement: AIModelManagement,
    
    Observability: Observability,
    
    AIAdvisoryCenter: AIAdvisoryCenter,
    
    MobileSecurity: MobileSecurity,
    
    ExecutiveDashboard: ExecutiveDashboard,
    
    ZeroTrustDashboard: ZeroTrustDashboard,
    
    PrivacyPolicy: PrivacyPolicy,
    
    TermsOfService: TermsOfService,
    
    HealthcareCompliance: HealthcareCompliance,
    
    InfrastructureManagement: InfrastructureManagement,
    
    PatentedTechnology: PatentedTechnology,
    
    PatentedTechnologyImplementation: PatentedTechnologyImplementation,
    
    ThreatPredictionMarket: ThreatPredictionMarket,
    
    CyberInsuranceHub: CyberInsuranceHub,
    
    DeepfakeProtection: DeepfakeProtection,
    
    CyberCreditScore: CyberCreditScore,
    
    AttackSimulations: AttackSimulations,
    
    QuantumSafeSecurity: QuantumSafeSecurity,
    
    DeceptionPlatforms: DeceptionPlatforms,
    
    HomomorphicEncryption: HomomorphicEncryption,
    
    DecentralizedIdentity: DecentralizedIdentity,
    
    CyberResilience: CyberResilience,
    
    CyberAwarenessTraining: CyberAwarenessTraining,
    
    QueryStudio: QueryStudio,
    
    MultiPlatformDashboard: MultiPlatformDashboard,
    
    LicensingPlatform: LicensingPlatform,
    
    APIDocumentation: APIDocumentation,
    
    StrategicRiskCenter: StrategicRiskCenter,
    
    IntegrationMarketplace: IntegrationMarketplace,
    
    DeploymentPlan: DeploymentPlan,
    
    SecurityToolIntegrations: SecurityToolIntegrations,
    
    InsiderThreatCenter: InsiderThreatCenter,
    
    Welcome: Welcome,
    
    MobileDeviceManagement: MobileDeviceManagement,
    
    WelcomeRedirect: WelcomeRedirect,
    
    StripeSuccess: StripeSuccess,
    
    NextSteps: NextSteps,
    
    DomainSetup: DomainSetup,
    
    AutomatedSecurity: AutomatedSecurity,
    
    DomainDebug: DomainDebug,
    
    DiagnosticTest: DiagnosticTest,
    
    EmergencyDashboard: EmergencyDashboard,
    
    About: About,
    
    AndroidIntegrationGuide: AndroidIntegrationGuide,
    
    AndroidStepByStep: AndroidStepByStep,
    
    MobileAppDownloads: MobileAppDownloads,
    
    RemotionSetupGuide: RemotionSetupGuide,
    
    MicrosoftISVIntegration: MicrosoftISVIntegration,
    
    StrategicRoadmap: StrategicRoadmap,
    
    ImplementationPrioritization: ImplementationPrioritization,
    
    AdvancedStrategy: AdvancedStrategy,
    
    HighImpactInitiatives: HighImpactInitiatives,
    
    CerebraSecIntegration: CerebraSecIntegration,
    
    CapabilitiesGuide: CapabilitiesGuide,
    
    SDWANIntegration: SDWANIntegration,
    
    SecureGatewayServices: SecureGatewayServices,
    
    SoftwareDefinedBranch: SoftwareDefinedBranch,
    
    InfrastructureAsCodeManagementPlatform: InfrastructureAsCodeManagementPlatform,
    
    SystemStatus: SystemStatus,
    
    KnowledgeCenter: KnowledgeCenter,
    
    SDKMarketplace: SDKMarketplace,
    
    CustomSDKRequest: CustomSDKRequest,
    
    MySDKs: MySDKs,
    
    AgentDeployment: AgentDeployment,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Dashboard />} />
                
                
                <Route path="/Dashboard" element={<Dashboard />} />
                
                <Route path="/Incidents" element={<Incidents />} />
                
                <Route path="/ThreatIntel" element={<ThreatIntel />} />
                
                <Route path="/UserAnalytics" element={<UserAnalytics />} />
                
                <Route path="/SOAR" element={<SOAR />} />
                
                <Route path="/Compliance" element={<Compliance />} />
                
                <Route path="/Reporting" element={<Reporting />} />
                
                <Route path="/Settings" element={<Settings />} />
                
                <Route path="/Training" element={<Training />} />
                
                <Route path="/CloudSecurity" element={<CloudSecurity />} />
                
                <Route path="/Investigations" element={<Investigations />} />
                
                <Route path="/ThreatFeeds" element={<ThreatFeeds />} />
                
                <Route path="/Subscription" element={<Subscription />} />
                
                <Route path="/NetworkDashboard" element={<NetworkDashboard />} />
                
                <Route path="/CloudDashboard" element={<CloudDashboard />} />
                
                <Route path="/ProjectManagement" element={<ProjectManagement />} />
                
                <Route path="/DevSecOps" element={<DevSecOps />} />
                
                <Route path="/PlatformArchitecture" element={<PlatformArchitecture />} />
                
                <Route path="/CommunityHub" element={<CommunityHub />} />
                
                <Route path="/VulnerabilityManagement" element={<VulnerabilityManagement />} />
                
                <Route path="/Quarantine" element={<Quarantine />} />
                
                <Route path="/VendorAdvisories" element={<VendorAdvisories />} />
                
                <Route path="/Notifications" element={<Notifications />} />
                
                <Route path="/SIEMComparison" element={<SIEMComparison />} />
                
                <Route path="/PhysicalSecurity" element={<PhysicalSecurity />} />
                
                <Route path="/GapAnalysis" element={<GapAnalysis />} />
                
                <Route path="/CounterIntelligenceHub" element={<CounterIntelligenceHub />} />
                
                <Route path="/PredictiveAlerts" element={<PredictiveAlerts />} />
                
                <Route path="/Guides" element={<Guides />} />
                
                <Route path="/DataSources" element={<DataSources />} />
                
                <Route path="/Sandbox" element={<Sandbox />} />
                
                <Route path="/SystemRequirements" element={<SystemRequirements />} />
                
                <Route path="/AIModelManagement" element={<AIModelManagement />} />
                
                <Route path="/Observability" element={<Observability />} />
                
                <Route path="/AIAdvisoryCenter" element={<AIAdvisoryCenter />} />
                
                <Route path="/MobileSecurity" element={<MobileSecurity />} />
                
                <Route path="/ExecutiveDashboard" element={<ExecutiveDashboard />} />
                
                <Route path="/ZeroTrustDashboard" element={<ZeroTrustDashboard />} />
                
                <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
                
                <Route path="/TermsOfService" element={<TermsOfService />} />
                
                <Route path="/HealthcareCompliance" element={<HealthcareCompliance />} />
                
                <Route path="/InfrastructureManagement" element={<InfrastructureManagement />} />
                
                <Route path="/PatentedTechnology" element={<PatentedTechnology />} />
                
                <Route path="/PatentedTechnologyImplementation" element={<PatentedTechnologyImplementation />} />
                
                <Route path="/ThreatPredictionMarket" element={<ThreatPredictionMarket />} />
                
                <Route path="/CyberInsuranceHub" element={<CyberInsuranceHub />} />
                
                <Route path="/DeepfakeProtection" element={<DeepfakeProtection />} />
                
                <Route path="/CyberCreditScore" element={<CyberCreditScore />} />
                
                <Route path="/AttackSimulations" element={<AttackSimulations />} />
                
                <Route path="/QuantumSafeSecurity" element={<QuantumSafeSecurity />} />
                
                <Route path="/DeceptionPlatforms" element={<DeceptionPlatforms />} />
                
                <Route path="/HomomorphicEncryption" element={<HomomorphicEncryption />} />
                
                <Route path="/DecentralizedIdentity" element={<DecentralizedIdentity />} />
                
                <Route path="/CyberResilience" element={<CyberResilience />} />
                
                <Route path="/CyberAwarenessTraining" element={<CyberAwarenessTraining />} />
                
                <Route path="/QueryStudio" element={<QueryStudio />} />
                
                <Route path="/MultiPlatformDashboard" element={<MultiPlatformDashboard />} />
                
                <Route path="/LicensingPlatform" element={<LicensingPlatform />} />
                
                <Route path="/APIDocumentation" element={<APIDocumentation />} />
                
                <Route path="/StrategicRiskCenter" element={<StrategicRiskCenter />} />
                
                <Route path="/IntegrationMarketplace" element={<IntegrationMarketplace />} />
                
                <Route path="/DeploymentPlan" element={<DeploymentPlan />} />
                
                <Route path="/SecurityToolIntegrations" element={<SecurityToolIntegrations />} />
                
                <Route path="/InsiderThreatCenter" element={<InsiderThreatCenter />} />
                
                <Route path="/Welcome" element={<Welcome />} />
                
                <Route path="/MobileDeviceManagement" element={<MobileDeviceManagement />} />
                
                <Route path="/WelcomeRedirect" element={<WelcomeRedirect />} />
                
                <Route path="/StripeSuccess" element={<StripeSuccess />} />
                
                <Route path="/NextSteps" element={<NextSteps />} />
                
                <Route path="/DomainSetup" element={<DomainSetup />} />
                
                <Route path="/AutomatedSecurity" element={<AutomatedSecurity />} />
                
                <Route path="/DomainDebug" element={<DomainDebug />} />
                
                <Route path="/DiagnosticTest" element={<DiagnosticTest />} />
                
                <Route path="/EmergencyDashboard" element={<EmergencyDashboard />} />
                
                <Route path="/About" element={<About />} />
                
                <Route path="/AndroidIntegrationGuide" element={<AndroidIntegrationGuide />} />
                
                <Route path="/AndroidStepByStep" element={<AndroidStepByStep />} />
                
                <Route path="/MobileAppDownloads" element={<MobileAppDownloads />} />
                
                <Route path="/RemotionSetupGuide" element={<RemotionSetupGuide />} />
                
                <Route path="/MicrosoftISVIntegration" element={<MicrosoftISVIntegration />} />
                
                <Route path="/StrategicRoadmap" element={<StrategicRoadmap />} />
                
                <Route path="/ImplementationPrioritization" element={<ImplementationPrioritization />} />
                
                <Route path="/AdvancedStrategy" element={<AdvancedStrategy />} />
                
                <Route path="/HighImpactInitiatives" element={<HighImpactInitiatives />} />
                
                <Route path="/CerebraSecIntegration" element={<CerebraSecIntegration />} />
                
                <Route path="/CapabilitiesGuide" element={<CapabilitiesGuide />} />
                
                <Route path="/SDWANIntegration" element={<SDWANIntegration />} />
                
                <Route path="/SecureGatewayServices" element={<SecureGatewayServices />} />
                
                <Route path="/SoftwareDefinedBranch" element={<SoftwareDefinedBranch />} />
                
                <Route path="/InfrastructureAsCodeManagementPlatform" element={<InfrastructureAsCodeManagementPlatform />} />
                
                <Route path="/SystemStatus" element={<SystemStatus />} />
                
                <Route path="/KnowledgeCenter" element={<KnowledgeCenter />} />
                
                <Route path="/SDKMarketplace" element={<SDKMarketplace />} />
                
                <Route path="/CustomSDKRequest" element={<CustomSDKRequest />} />
                
                <Route path="/MySDKs" element={<MySDKs />} />
                
                <Route path="/AgentDeployment" element={<AgentDeployment />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}