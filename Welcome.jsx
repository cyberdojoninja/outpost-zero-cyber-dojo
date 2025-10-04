
import React, { useState } from 'react';
import { Shield, BrainCircuit, Rocket, Zap, GitBranch, CheckCircle, ArrowRight, Star, Linkedin, Twitter, Mail, X, Globe, Play, ChevronDown, ChevronUp, Users, Building2, Landmark, Home, Fingerprint, KeyRound, LogIn, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Added for SSO selection
import { User } from '@/api/entities';
import { createCheckoutSession } from '@/api/functions';
import ProductDemoGenerator from '../components/demos/ProductDemoGenerator';

// Stripe Configuration - Replace with your actual Stripe configuration
const STRIPE_CONFIG = {
  // Replace with your actual Stripe Publishable Key
  publishableKey: 'pk_live_51RiignElw5v5E4TGW3oNDVTxbnIP2gLR718WZ75oRtXU6RL60oR7igqp495QaoOJqmZn4GoRO9ql8ZVO4F75no00CtJcIcBp', // Your Stripe Publishable Key
  
  // Product configurations with your actual Stripe Price IDs
  products: {
    axis_rebirth: {
      priceId: 'price_1RpCsQElw5v5E4TGIllFcfEz', // Your Stripe Price ID for AXIS Rebirth (example price_12345)
      name: 'AXIS Rebirth',
      price: '$99/month'
    },
    revsentinel: {
      priceId: 'price_1RpCspElw5v5E4TGKALA2pm9', // Your Stripe Price ID for RevSentinel (example price_67890)
      name: 'RevSentinel',
      price: '$1,500/month' // Updated price
    },
    revsentinel_enterprise: {
      priceId: 'price_1RpCuyElw5v5E4TGh1KnqlT1', // Placeholder for custom pricing
      name: 'RevSentinel Enterprise',
      price: 'Custom'
    },
    outpost_zero_classified: {
      priceId: 'cprice_1RpD0mElw5v5E4TGCBhMP4iOustom', // Placeholder for custom pricing
      name: 'Outpost Zero (Classified)',
      price: 'Contact Sales'
    }
  }
};

const productTiersData = [
  {
    key: "axis_rebirth",
    name: "AXIS Rebirth",
    targetUser: "Home & SOHO",
    logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/9e4a685e9_Screenshot2025-07-24111810.jpg",
    description: "Professional-grade security designed for home users and small home offices.",
    price: "$99/mo",
    features: ['AI-Powered Threat Detection', 'Home Network Monitoring', 'Up to 5 Devices', 'Basic Incident Response', 'Mobile App Integration', '24/7 Autonomous Protection'],
    cta: "Start 7-Day Free Trial",
    demoVideo: "https://demo.outpostzero.com/axis-rebirth",
    featured: false
  },
  {
    key: "revsentinel",
    name: "RevSentinel",
    targetUser: "Small-Medium Business",
    logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/3abd0f5ee_Screenshot2025-07-24112158.jpg",
    description: "Comprehensive, scalable security for growing businesses and enterprises.",
    price: "$1,500/mo", // Updated price
    features: ['Advanced Threat Hunting', 'SOAR Automation Included', 'Up to 150 Endpoints', 'Compliance Frameworks', 'Blockchain Security', 'MDM Integration', 'Predictive Analytics'],
    cta: "Start 7-Day Free Trial",
    featured: true,
    demoVideo: "https://demo.outpostzero.com/revsentinel",
  },
  {
    key: "revsentinel_enterprise",
    name: "RevSentinel Enterprise",
    targetUser: "Large Enterprise",
    logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/3abd0f5ee_Screenshot2025-07-24112158.jpg",
    description: "A custom-scaled solution for large enterprises exceeding 150 endpoints.",
    price: "Custom Quote",
    features: ['Everything in RevSentinel', 'Unlimited Endpoints', 'Dedicated Support & TAM', 'Advanced API Access', 'Quantum-Safe Cryptography', 'Homomorphic Encryption', 'Custom Integrations'],
    cta: "Contact Sales",
    demoVideo: "https://demo.outpostzero.com/enterprise",
    featured: false
  },
  {
    key: "outpost_zero_classified",
    name: "Outpost Zero (Classified)",
    targetUser: "Government & Intelligence",
    logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/174051417_Screenshot2025-07-24110248.jpg",
    description: "The ultimate security platform for government and intelligence operations.",
    price: "Contact Sales",
    features: ['FedRAMP High Authorized', 'Quantum-Safe Cryptography', 'Air-Gapped Capable', 'Counter-Intelligence Tools', 'Blockchain Evidence Chain', 'Classified Data Protection', 'Multi-Level Security'],
    cta: "Request Briefing",
    demoVideo: "https://demo.outpostzero.com/classified",
    featured: false
  },
];


// --- Reusable Components for the Landing Page ---

const FeatureCard = ({ icon: Icon, title, description, tier, demoUrl }) => (
  <div className="text-center p-6 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300">
    <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-blue-500/10 mb-4">
      <Icon className="w-8 h-8 text-blue-400" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 mb-4">{description}</p>
    <div className="flex flex-col gap-2">
      <Badge className="mx-auto bg-blue-500/20 text-blue-300 text-xs">{tier}</Badge>
      {demoUrl && (
        <Button variant="outline" size="sm" className="mx-auto" onClick={() => window.open(demoUrl, '_blank')}>
          <Play className="w-4 h-4 mr-2" />
          Watch Demo
        </Button>
      )}
    </div>
  </div>
);

const ProductTierCard = ({ tier, description, price, features, cta, logo, featured, targetUser, demoVideo, onSelectPlan, planKey }) => (
  <Card className={`flex flex-col ${featured ? 'border-purple-500 ring-2 ring-purple-500 bg-gray-900' : 'border-gray-700 bg-gray-800/50'}`}>
    <CardHeader className="pb-4">
      <div className="flex items-center gap-4 mb-4">
        <img src={logo} alt={`${tier} Logo`} className="h-12 object-contain" />
        <div>
          <CardTitle className="text-2xl font-bold text-white">{tier}</CardTitle>
          <Badge className="bg-blue-500/20 text-blue-300 text-xs">{targetUser}</Badge>
        </div>
      </div>
      <p className="text-gray-400 h-16">{description}</p>
    </CardHeader>
    <CardContent className="flex-1 flex flex-col justify-between">
      <div>
        <p className="text-4xl font-bold text-white mb-4">{price}</p>
        <ul className="space-y-3 mb-8">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-3">
        {/* The demoVideo prop is now a function, so call it directly */}
        {demoVideo && (
          <Button 
            variant="outline" 
            className="w-full border-blue-500/50 text-blue-300 hover:bg-blue-500/20"
            onClick={() => demoVideo()}
          >
            <Play className="w-4 h-4 mr-2" />
            Watch {tier} Demo
          </Button>
        )}
        <Button 
          onClick={() => onSelectPlan(planKey)}
          className={`w-full ${featured ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          <CreditCard className="w-4 h-4 mr-2" />
          {cta}
        </Button>
      </div>
    </CardContent>
  </Card>
);

const TestimonialCard = ({ quote, name, title, company, image, tier }) => (
  <div className="bg-gray-800/50 border border-gray-700/50 p-6 rounded-lg">
    <div className="flex text-yellow-400 mb-4">
      {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
    </div>
    <p className="text-gray-300 mb-6 italic">"{quote}"</p>
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <img className="w-12 h-12 rounded-full mr-4 object-cover" src={image} alt={name} />
        <div>
          <p className="font-bold text-white">{name}</p>
          <p className="text-gray-400">{title}, {company}</p>
        </div>
      </div>
      <Badge className="bg-blue-500/20 text-blue-300 text-xs">{tier}</Badge>
    </div>
  </div>
);

// Leadership Showcase Component
const LeadershipShowcase = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const leaders = [
    {
      name: "Asaad Morman",
      title: "Founder & CEO",
      background: "Intelligence Community Veteran",
      story: "With over 15 years in the intelligence community and cybersecurity operations, Asaad founded Cyber Dojo Solutions with a mission to transform reactive security into predictive defense. His experience in high-stakes environments drives our commitment to building 'cyber immune systems' that anticipate and neutralize threats before they materialize.",
      expertise: ["Strategic Intelligence", "Cyber Operations", "National Security", "Threat Analysis"]
    },
    {
      name: "Ramon Brooks",
      title: "Chief Technology Officer",
      background: "Scalable Systems Architect & AI Innovator",
      story: "Ramon is the architect of our unified platform. With a background in building large-scale, resilient cloud systems, he leads the development of our core AI engine and ensures our technology remains at the cutting edge of performance, security, and scalability.",
      expertise: ["AI/ML Engineering", "Cloud Architecture", "Distributed Systems", "DevSecOps"]
    },
    {
      name: "Barbie Brooks",
      title: "Chief Operating Officer",
      background: "Program & Project Management Expert",
      story: "A master of execution, Barbie translates complex technical roadmaps into achievable milestones. Her expertise in Program and Project Management ensures that our platform deployments are seamless, on-time, and consistently exceed client expectations, delivering operational excellence at every stage.",
      expertise: ["Program Management", "Project Management (PMP)", "Agile Methodologies", "Operational Efficiency"]
    },
    {
      name: "Shauntze Morman",
      title: "Chief Strategy Officer",
      background: "Security Operations & Training Specialist",
      story: "Hailing from the DC government, Shauntze developed high-stakes training for first responders, including 911 dispatchers and EMS/firefighters. She brings invaluable real-world experience, bridging the critical gap between physical and virtual security to shape our strategic direction and product evolution.",
      expertise: ["Security Operations", "Emergency Response", "Training Development", "Physical-Cyber Convergence"]
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl border border-gray-700 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-700 flex justify-between items-center sticky top-0 bg-gray-900 z-10">
          <h2 className="text-2xl font-bold text-white">Our Leadership Team</h2>
          <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </Button>
        </div>
        <div className="p-6 grid md:grid-cols-2 gap-8">
          {leaders.map((leader, index) => (
            <div key={index} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-20 h-20 rounded-full bg-blue-900/50 flex-shrink-0 flex items-center justify-center border-2 border-blue-400">
                    <span className="text-3xl font-bold text-white">{leader.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{leader.name}</h3>
                  <p className="text-blue-400 font-semibold">{leader.title}</p>
                  <p className="text-gray-400 text-sm">{leader.background}</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">{leader.story}</p>
              <div className="flex flex-wrap gap-2">
                {leader.expertise.map((skill, skillIndex) => (
                  <span key={skillIndex} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const OriginStory = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <section className="py-20 px-8 bg-gradient-to-br from-gray-900/50 to-black/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">The Genesis of Outpost Zero</h2>
          <p className="text-xl text-blue-300 font-semibold">From Intelligence Operations to Cyber Immunity</p>
        </div>
        
        <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700/50">
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              In the classified corridors of the intelligence community, Asaad Morman witnessed firsthand the growing sophistication of cyber threats. Traditional security tools were always one step behind—reactive, fragmented, and overwhelmed by the sheer volume of modern attacks.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 my-8">
              <div className="text-center p-6 bg-red-900/20 rounded-lg border border-red-500/30">
                <Shield className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-white font-bold mb-2">The Problem</h3>
                <p className="text-gray-300 text-sm">Reactive security tools, siloed intelligence, and human-speed response to machine-speed attacks</p>
              </div>
              <div className="text-center p-6 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
                <BrainCircuit className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-white font-bold mb-2">The Vision</h3>
                <p className="text-gray-300 text-sm">AI-powered predictive defense that evolves, learns, and anticipates threats before they materialize</p>
              </div>
              <div className="text-center p-6 bg-green-900/20 rounded-lg border border-green-500/30">
                <Rocket className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-white font-bold mb-2">The Solution</h3>
                <p className="text-gray-300 text-sm">Outpost Zero: The world's first cyber immune system that adapts and evolves autonomously</p>
              </div>
            </div>

            {isExpanded && (
              <div className="space-y-6 text-gray-300">
                <p className="leading-relaxed">
                  The breakthrough came during a late-night incident response in 2019. While analyzing a sophisticated APT campaign, Asaad realized that the same patterns had appeared months earlier across different organizations—but no system had connected the dots. <strong className="text-blue-300">What if cybersecurity could work like the human immune system?</strong>
                </p>
                
                <p className="leading-relaxed">
                  Working with his co-founders—Ramon Brooks (AI architecture), Barbie Brooks (operational excellence), and Shauntze Morman (strategic operations)—they began developing what would become the Adaptive Self-Evolving Security (ASES) system, the core technology that powers Outpost Zero.
                </p>

                <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30 my-8">
                  <h4 className="text-blue-300 font-bold mb-3 flex items-center gap-2">
                    <BrainCircuit className="w-5 h-5" />
                    The Revolutionary Breakthrough
                  </h4>
                  <p className="text-gray-300 italic">
                    "We didn't just want to detect threats faster—we wanted to create a system that could predict, adapt, and immunize against attacks that hadn't even been invented yet. Outpost Zero doesn't just defend; it evolves."
                  </p>
                  <p className="text-gray-400 text-sm mt-2">— Asaad Morman, Founder & CEO</p>
                </div>

                <p className="leading-relaxed">
                  Today, Outpost Zero represents the culmination of decades of intelligence community expertise, cutting-edge AI research, and real-world operational experience. From protecting home networks to securing classified government operations, our platform represents the next evolution in cybersecurity—where defense systems learn, adapt, and evolve at the speed of thought.
                </p>

                <div className="grid md:grid-cols-4 gap-4 mt-8">
                  <div className="text-center p-4 bg-gray-900/50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-400">12+</p>
                    <p className="text-gray-300 text-sm">Patents Filed</p>
                  </div>
                  <div className="text-center p-4 bg-gray-900/50 rounded-lg">
                    <p className="text-2xl font-bold text-green-400">50K+</p>
                    <p className="text-gray-300 text-sm">Threats Predicted</p>
                  </div>
                  <div className="text-center p-4 bg-gray-900/50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-400">99.7%</p>
                    <p className="text-gray-300 text-sm">Accuracy Rate</p>
                  </div>
                  <div className="text-center p-4 bg-gray-900/50 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-400">0.3ms</p>
                    <p className="text-gray-300 text-sm">Response Time</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="text-center mt-8">
              <Button 
                variant="outline" 
                onClick={() => setIsExpanded(!isExpanded)}
                className="border-blue-500/50 text-blue-300 hover:bg-blue-500/20"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-2" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-2" />
                    Read Full Origin Story
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper for creating internal page URLs - A placeholder, replace with actual router logic if applicable
const createPageUrl = (pageName) => {
  switch (pageName) {
    case 'Dashboard':
      return '/dashboard'; // Example route for a dashboard
    // Add other cases as needed
    default:
      return `/${pageName.toLowerCase().replace(/\s/g, '')}`;
  }
};


// --- Main Welcome Page Component ---

export default function WelcomePage({ user }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLeadership, setShowLeadership] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [demoType, setDemoType] = useState('');
  const [demoTier, setDemoTier] = useState('smb');
  const [selectedSSO, setSelectedSSO] = useState('google');

  // If user is logged in but doesn't have subscription, show upgrade message
  const needsSubscription = user && (!user.access_level || user.access_level === 'free_user');

  const handleLogin = async () => {
    try {
        setIsProcessing(true);
        await User.login();
        // After login, the page will reload, and the Layout's useEffect will handle redirection.
    } catch(e) {
        alert("Login failed. Please try again.");
        setIsProcessing(false);
    }
  }

  const handleSSO = async (provider) => {
    try {
      setIsProcessing(true);
      // For all SSO providers, including Google, we will use the same unified login flow.
      // The backend should handle the specific provider logic.
      await User.login();
      // The layout's auth check will handle the redirect after successful login.
    } catch (error) {
      console.error('SSO login failed:', error);
      alert('SSO login failed. Please try again or contact support.');
      setIsProcessing(false);
    }
  };


  const handleSelectPlan = async (planKey) => {
    const productConfig = STRIPE_CONFIG.products[planKey];
    
    if (!productConfig || planKey === 'revsentinel_enterprise' || planKey === 'outpost_zero_classified') {
      // Handle contact sales for enterprise/government plans
      const contactMessage = `I'm interested in ${productConfig?.name || 'your enterprise solutions'}. Please contact me to discuss pricing and implementation.`;
      const mailtoLink = `mailto:sales@cyberdojogroup.com?subject=Interest in ${productConfig?.name || 'Enterprise Solutions'}&body=${encodeURIComponent(contactMessage)}`;
      window.location.href = mailtoLink;
      return;
    }

    try {
      setIsProcessing(true);
      
      // Test the backend function
      const response = await createCheckoutSession({
        priceId: productConfig.priceId,
        planName: productConfig.name,
        successUrl: `${window.location.origin}/StripeSuccess?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/Welcome`
      });

      if (response.data && response.data.sessionUrl) {
        // Redirect to Stripe checkout
        window.location.href = response.data.sessionUrl;
      } else {
        throw new Error('No session URL returned');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert(`Checkout failed: ${error.message || 'Please try again or contact support'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Modified handleDemoRequest to accept a tier
  const handleDemoRequest = (type = 'platform-overview', tier = 'smb') => {
    setDemoType(type);
    setDemoTier(tier); // Set the new tier state
    setShowDemo(true);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const message = `Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\nSubject: ${formData.get('subject')}\nMessage: ${formData.get('message')}`;
    const mailtoLink = `mailto:info@cyberdojogroup.com?subject=${encodeURIComponent(formData.get('subject'))}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
  };

  // Feature categories with demo videos
  const coreFeatures = [
    { icon: Shield, title: "Predictive AI Defense", description: "AI that predicts and prevents attacks before they happen", tier: "All Tiers", demoUrl: "https://demo.outpostzero.com/predictive-ai" },
    { icon: BrainCircuit, title: "Autonomous SOAR", description: "Self-learning playbooks that evolve with your team's expertise", tier: "SMB+", demoUrl: "https://demo.outpostzero.com/soar" },
    { icon: Users, title: "Behavioral Analytics", description: "Advanced user behavior analysis with ML anomaly detection", tier: "All Tiers", demoUrl: "https://demo.outpostzero.com/behavior" },
    { icon: Zap, title: "Quantum-Safe Security", description: "Future-proof encryption against quantum computing threats", tier: "Enterprise+", demoUrl: "https://demo.outpostzero.com/quantum" },
  ];

  const advancedFeatures = [
    { icon: GitBranch, title: "Blockchain Security", description: "Immutable audit trails and decentralized threat intelligence", tier: "SMB+", demoUrl: "https://demo.outpostzero.com/blockchain" },
    { icon: Globe, title: "Mobile Device Management", description: "Enterprise MDM with security center integration", tier: "SMB+", demoUrl: "https://demo.outpostzero.com/mdm" },
    { icon: BrainCircuit, title: "Homomorphic Encryption", description: "Analyze encrypted data without decryption", tier: "Enterprise+", demoUrl: "https://demo.outpostzero.com/homomorphic" },
    { icon: Shield, title: "Deception Platforms", description: "AI-powered honeypots that adapt to attacker behavior", tier: "Enterprise+", demoUrl: "https://demo.outpostzero.com/deception" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <header className="py-4 px-8 flex justify-between items-center bg-black/30 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/174051417_Screenshot2025-07-24110248.jpg" alt="Outpost Zero Logo" className="h-8 object-contain" />
          <span className="text-xl font-bold hover:text-blue-400 transition-colors">
            Outpost Zero
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#products" className="hover:text-blue-400 transition-colors">Products</a>
          <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
          <a href="#origin" className="hover:text-blue-400 transition-colors">Our Story</a>
          <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
          <a href="https://cyberdojogroup.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Main Website</a>
        </nav>
        {user ? (
          <Button onClick={handleLogin} className="bg-green-600 hover:bg-green-700 text-white">
            Continue to Platform
          </Button>
        ) : (
          <Button onClick={handleLogin} className="bg-blue-600 hover:bg-blue-700 text-white">
            Sign In
          </Button>
        )}
      </header>

      <main>
        {/* Upgrade Message for Logged In Users Without Subscription */}
        {needsSubscription && (
          <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border-b border-yellow-700/50 py-6 px-8">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Welcome back, {user.full_name}! 👋</h2>
              <p className="text-yellow-200 mb-4">
                You're currently on a free account. Upgrade to unlock the full power of Outpost Zero and protect your organization.
              </p>
              <Button 
                onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                View Plans & Pricing →
              </Button>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section className="text-center py-20 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
            <div className="relative z-10">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6358de6e2_188ec1ee-2ae7-4d9b-aacd-de581b4988ff.png" 
                    alt="Cyber Dojo Solutions" 
                    className="h-12 object-contain"
                  />
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-sm">
                    🚀 Welcome to Outpost Zero - The World's First Cyber Immune System
                  </Badge>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">
                  The Future of <span className="text-blue-400">Autonomous</span> Cybersecurity
                </h1>
                <p className="text-xl md::text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
                    Experience the next evolution in cybersecurity. Our AI-powered, quantum-ready defense systems protect everything from home networks to classified government operations.
                </p>
                
                {/* Product Logos Preview */}
                <div className="flex justify-center items-center gap-8 mb-8 flex-wrap">
                    <div className="flex items-center gap-2">
                        <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/9e4a685e9_Screenshot2025-07-24111810.jpg" alt="AXIS Rebirth" className="h-8 object-contain" />
                        <span className="text-sm text-gray-300">AXIS Rebirth</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/3abd0f5ee_Screenshot2025-07-24112158.jpg" alt="RevSentinel" className="h-8 object-contain" />
                        <span className="text-sm text-gray-300">RevSentinel</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/174051417_Screenshot2025-07-24110248.jpg" alt="Outpost Zero" className="h-8 object-contain" />
                        <span className="text-sm text-gray-300">Outpost Zero (Classified)</span>
                    </div>
                </div>

                <div className="flex justify-center gap-4 mb-12">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => handleDemoRequest('platform-overview', 'smb')} disabled={isProcessing}>
                        Request Live Demo <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <Button 
                        size="lg" 
                        className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-600" 
                        onClick={() => document.getElementById('login-section').scrollIntoView({ behavior: 'smooth' })}
                    >
                        <LogIn className="mr-2 w-5 h-5" />
                        Access Platform
                    </Button>
                </div>

                <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
                  <div className="p-4">
                    <p className="text-2xl font-bold text-blue-400">99.7%</p>
                    <p className="text-gray-300 text-sm">Threat Prediction Accuracy</p>
                  </div>
                  <div className="p-4">
                    <p className="text-2xl font-bold text-green-400">0.3ms</p>
                    <p className="text-gray-300 text-sm">Average Response Time</p>
                  </div>
                  <div className="p-4">
                    <p className="text-2xl font-bold text-purple-400">12+</p>
                    <p className="text-gray-300 text-sm">Patented Technologies</p>
                  </div>
                  <div className="p-4">
                    <p className="text-2xl font-bold text-yellow-400">24/7</p>
                    <p className="text-gray-300 text-sm">Autonomous Protection</p>
                  </div>
                </div>
            </div>
        </section>

        {/* Show demo if requested */}
        {showDemo && (
          <section className="py-20 px-8 bg-gray-900/50">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/174051417_Screenshot2025-07-24110248.jpg" alt="Outpost Zero Logo" className="h-12 object-contain" />
                  <h1 className="text-3xl font-bold text-white">Live Product Demo</h1>
                </div>
                <Button variant="outline" onClick={() => setShowDemo(false)} className="border-gray-700 text-gray-300 hover:bg-gray-700/50">
                  ← Back to Welcome
                </Button>
              </div>
              
              <ProductDemoGenerator 
                demoType={demoType} 
                tier={demoTier}
                onDemoReady={(demo) => console.log('Demo ready:', demo)} 
              />
            </div>
          </section>
        )}

        {/* Only show the rest of the content if not showing demo */}
        {!showDemo && (
          <>
            {/* Product Tiers Section */}
            <section id="products" className="py-20 px-8 bg-gray-900/50">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-4">Our Complete Product Suite</h2>
                <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
                  Four distinct platforms designed for every security need—from residential protection to classified government operations.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {productTiersData.map((tier) => (
                    <ProductTierCard
                      key={tier.key}
                      tier={tier.name}
                      description={tier.description}
                      price={tier.price}
                      features={tier.features}
                      cta={tier.cta}
                      logo={tier.logo}
                      featured={tier.featured}
                      targetUser={tier.targetUser}
                      demoVideo={() => handleDemoRequest('platform-overview', tier.key === 'axis_rebirth' ? 'residential' : tier.key === 'revsentinel' ? 'smb' : tier.key === 'revsentinel_enterprise' ? 'enterprise' : 'government')}
                      onSelectPlan={handleSelectPlan}
                      planKey={tier.key}
                    />
                  ))}
                </div>
                
                {/* Stripe Badge */}
                <div className="text-center mt-8">
                  <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-800/50 rounded-full border border-gray-700/50">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-green-400" />
                      <span className="text-white font-medium">Secured by Stripe</span>
                    </div>
                    <div className="w-px h-4 bg-gray-600"></div>
                    <span className="text-gray-400 text-sm">7-day free trial • Cancel anytime</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Origin Story Section */}
            <div id="origin">
              <OriginStory />
            </div>

            {/* Core Features Section */}
            <section id="features" className="py-20 px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                      <h2 className="text-4xl font-bold text-white mb-4">Revolutionary Security Capabilities</h2>
                      <p className="text-xl text-gray-300">Experience the future of cybersecurity with live demos</p>
                    </div>
                    
                    <Tabs defaultValue="core" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 mb-8">
                        <TabsTrigger value="core">Core Features (All Tiers)</TabsTrigger>
                        <TabsTrigger value="advanced">Advanced Features (SMB+)</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="core">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                          {coreFeatures.map((feature, index) => (
                            <FeatureCard key={index} {...feature} />
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="advanced">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                          {advancedFeatures.map((feature, index) => (
                            <FeatureCard key={index} {...feature} />
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>

                    {/* Live Demo Section */}
                    <div className="mt-16 text-center bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-8 border border-blue-500/30">
                      <h3 className="text-2xl font-bold text-white mb-4">Experience Real Security Scenarios</h3>
                      <p className="text-gray-300 mb-6">Interactive demos with working dashboards, real threat simulations, and live AI responses</p>
                      <div className="grid md:grid-cols-3 gap-4">
                        <Button 
                          className="bg-red-600 hover:bg-red-700" 
                          onClick={() => handleDemoRequest('ransomware-simulation', 'enterprise')}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Ransomware Response Demo
                        </Button>
                        <Button 
                          className="bg-yellow-600 hover:bg-yellow-700" 
                          onClick={() => handleDemoRequest('insider-threat', 'smb')}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Insider Threat Detection
                        </Button>
                        <Button 
                          className="bg-purple-600 hover:bg-purple-700" 
                          onClick={() => handleDemoRequest('ai-response', 'enterprise')}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          AI Autonomous Response
                        </Button>
                      </div>
                    </div>
                </div>
            </section>
            
            {/* Testimonials Section */}
            <section className="py-20 px-8 bg-gray-900/50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">Trusted by Industry Leaders</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <TestimonialCard 
                            quote="Outpost Zero didn't just meet our security needs; it anticipated them. The predictive analytics are a game-changer for our SOC."
                            name="Jane Doe"
                            title="CISO"
                            company="Global Tech Inc."
                            image="https://randomuser.me/api/portraits/women/44.jpg"
                            tier="Enterprise"
                        />
                         <TestimonialCard 
                            quote="The transition to a quantum-safe posture was daunting. Outpost Zero made it a clear, manageable process. We are years ahead of our competition."
                            name="John Smith"
                            title="Director of IT"
                            company="Secure Finance Corp"
                            image="https://randomuser.me/api/portraits/men/32.jpg"
                            tier="RevSentinel Enterprise"
                        />
                        <TestimonialCard 
                            quote="As a small business, we never thought we could afford enterprise-grade security. RevSentinel changed everything—now we're protected like a Fortune 500."
                            name="Maria Rodriguez"
                            title="CEO"
                            company="TechStart Solutions"
                            image="https://randomuser.me/api/portraits/women/68.jpg"
                            tier="RevSentinel"
                        />
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section id="about" className="py-20 px-8">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">Pioneering the Next Frontier of Defense</h2>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div>
                                <h3 className="2xl font-bold text-blue-400 mb-3">Our Mission</h3>
                                <p className="text-gray-300">
                                    To empower organizations with autonomous, predictive, and adaptive cybersecurity, transforming their defense from a reactive posture to a proactive state of cyber immunity. We build intelligent systems that anticipate threats and evolve, ensuring our clients stay ahead of the most sophisticated adversaries.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-blue-400 mb-3">The Innovation Core</h3>
                                <p className="text-gray-300">
                                    At the heart of Cyber Dojo Solutions lies a portfolio of patented, next-generation technologies. As the creators of the unified **AXIS Rebirth, RevSentinel, and Outpost Zero** platforms, our innovations in predictive AI, quantum-resistant cryptography, and autonomous response are the backbone of a new generation of security.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <Button 
                                    onClick={() => setShowLeadership(true)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    Meet Our Leadership Team
                                </Button>
                                <Button 
                                    className="bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
                                    onClick={() => window.open('https://cyberdojogroup.com/about', '_blank', 'noopener noreferrer')}
                                >
                                    Full Company Story
                                </Button>
                            </div>
                        </div>
                        <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700/50">
                            <h3 className="text-2xl font-bold text-white mb-4">Led by Visionaries</h3>
                            <p className="text-gray-400 mb-6">
                                Our leadership team comprises veterans from the world's most demanding intelligence and cybersecurity communities. This deep, real-world experience is infused into our platform, delivering security that is not just theoretically sound, but battle-hardened and proven.
                            </p>
                            <div className="space-y-3">
                                <Button 
                                    onClick={() => setShowLeadership(true)}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    Meet Our Leadership Team
                                </Button>
                                <Button 
                                    className="w-full bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
                                    onClick={() => window.open('https://cyberdojogroup.com/careers', '_blank', 'noopener noreferrer')}
                                >
                                    Join Our Team
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Enhanced Login Section with SSO - Only show if not logged in */}
            {!user && (
              <section id="login-section" className="py-20 px-8 bg-gray-900/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                <div className="max-w-md mx-auto relative z-10">
                  <div className="bg-black/60 backdrop-blur-lg p-8 rounded-2xl border border-blue-500/20 shadow-2xl shadow-blue-900/50">
                      <div className="text-center mb-8">
                        <Fingerprint className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-white">Enterprise Authentication</h2>
                        <p className="text-gray-400 mt-2">Access the Outpost Zero Platform</p>
                      </div>
                      
                      <div className="space-y-4">
                        {/* SSO Provider Selection */}
                        <div>
                          <Label className="text-gray-300 text-sm font-medium">Authentication Provider</Label>
                          <Select value={selectedSSO} onValueChange={setSelectedSSO}>
                            <SelectTrigger className="mt-2 bg-gray-900/50 border-gray-700 text-white">
                              <SelectValue placeholder="Choose authentication method" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700">
                              <SelectItem value="google">Google Workspace</SelectItem>
                              <SelectItem value="okta">Okta</SelectItem>
                              <SelectItem value="salesforce">Salesforce</SelectItem>
                              <SelectItem value="azure">Microsoft Azure AD</SelectItem>
                              <SelectItem value="saml">Custom SAML 2.0</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Primary SSO Button */}
                        <Button 
                          onClick={() => handleSSO(selectedSSO)}
                          disabled={isProcessing}
                          className="w-full h-12 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                        >
                          {isProcessing ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          ) : (
                            <LogIn className="mr-2 h-5 w-5" />
                          )}
                          Continue with {selectedSSO === 'google' ? 'Google' : selectedSSO === 'okta' ? 'Okta' : selectedSSO === 'salesforce' ? 'Salesforce' : selectedSSO === 'azure' ? 'Azure AD' : 'SAML SSO'}
                        </Button>

                        <div className="relative flex py-2 items-center">
                            <div className="flex-grow border-t border-gray-600"></div>
                            <span className="flex-shrink mx-4 text-gray-400 text-xs">OR USE EMAIL</span>
                            <div className="flex-grow border-t border-gray-600"></div>
                        </div>

                        {/* Traditional Email Login - Submits via the modified handleLogin, which triggers SSO */}
                        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-6">
                          <div>
                            <Label htmlFor="email" className="text-gray-300 text-sm font-medium">Email Address</Label>
                            <div className="relative mt-2">
                               <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500"/>
                               <Input 
                                 id="email" 
                                 type="email" 
                                 value={email} 
                                 onChange={(e) => setEmail(e.target.value)} 
                                 className="pl-10 h-12 bg-gray-900/50 border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500" 
                                 placeholder="your@company.com" 
                                 disabled={isProcessing}
                               />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="password" className="text-gray-300 text-sm font-medium">Password</Label>
                             <div className="relative mt-2">
                               <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500"/>
                               <Input 
                                 id="password" 
                                 type="password" 
                                 value={password} 
                                 onChange={(e) => setPassword(e.target.value)} 
                                 className="pl-10 h-12 bg-gray-900/50 border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500" 
                                 placeholder="••••••••••••••" 
                                 disabled={isProcessing}
                               />
                            </div>
                          </div>
                          <Button 
                            type="submit" 
                            disabled={isProcessing}
                            variant="outline"
                            className="w-full h-12 text-lg border-gray-600 text-gray-300 hover:bg-gray-700/50 disabled:opacity-50"
                          >
                            {isProcessing ? (
                              <div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin mr-2" />
                            ) : (
                              <LogIn className="mr-2 h-5 w-5" />
                            )}
                            Sign In with Email
                          </Button>
                        </form>
                      </div>

                      <div className="text-center mt-6 text-sm">
                          <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Forgot Password?</a>
                          <span className="text-gray-600 mx-2">|</span>
                          <a href="#products" className="text-blue-400 hover:text-blue-300 transition-colors">Start Free Trial</a>
                      </div>

                      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <p className="text-blue-200 text-xs text-center">
                          🔒 Enterprise SSO available. Contact sales@cyberdojogroup.com to configure your organization's identity provider.
                        </p>
                      </div>
                  </div>
                </div>
              </section>
            )}

            {/* Contact Section */}
            <section id="contact" className="py-20 px-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-12">Get In Touch</h2>
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Mail className="w-6 h-6 text-blue-400" />
                        <div>
                          <p className="font-semibold">Email</p>
                          <p className="text-gray-400">info@cyberdojogroup.com</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Shield className="w-6 h-6 text-blue-400" />
                        <div>
                          <p className="font-semibold">Sales</p>
                          <p className="text-gray-400">sales@cyberdojogroup.com</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Globe className="w-6 h-6 text-blue-400" />
                        <div>
                          <p className="font-semibold">Main Website</p>
                          <a href="https://cyberdojogroup.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                            cyberdojogroup.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="contact-name" className="text-white">Your Name</Label>
                        <Input id="contact-name" name="name" type="text" required className="bg-gray-800 border-gray-600 text-white" />
                      </div>
                      <div>
                        <Label htmlFor="contact-email" className="text-white">Email</Label>
                        <Input id="contact-email" name="email" type="email" required className="bg-gray-800 border-gray-600 text-white" />
                      </div>
                      <div>
                        <Label htmlFor="subject" className="text-white">Subject</Label>
                        <Input id="subject" name="subject" required className="bg-gray-800 border-gray-600 text-white" />
                      </div>
                      <div>
                        <Label htmlFor="message" className="text-white">Message</Label>
                        <textarea id="message" name="message" rows={4} required className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
                      </div>
                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">Send Message</Button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      {!showDemo && (
        <footer className="bg-black py-12 px-8">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <img 
                          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6358de6e2_188ec1ee-2ae7-4d9b-aacd-de581b4988ff.png" 
                          alt="Cyber Dojo Solutions" 
                          className="h-8 object-contain"
                        />
                    </div>
                    <h3 className="font-bold text-lg text-white mb-4">Cyber Dojo Solutions</h3>
                    <p className="text-gray-400 mb-4">The Future of Autonomous Cybersecurity.</p>
                    <a href="https://cyberdojogroup.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors text-sm">
                        Visit our main website →
                    </a>
                     <div className="flex gap-4 mt-4">
                        <a href="https://cyberdojogroup.com/social" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><Twitter /></a>
                        <a href="https://cyberdojogroup.com/social" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><Linkedin /></a>
                        <a href="mailto:info@cyberdojogroup.com" className="text-gray-400 hover:text-white"><Mail /></a>
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-lg text-white mb-4">Products</h3>
                    <ul className="space-y-2">
                        <li><a href="#products" className="text-gray-400 hover:text-white">AXIS Rebirth</a></li>
                        <li><a href="#products" className="text-gray-400 hover:text-white">RevSentinel</a></li>
                        <li><a href="#products" className="text-gray-400 hover:text-white">RevSentinel Enterprise</a></li>
                        <li><a href="#products" className="text-gray-400 hover:text-white">Outpost Zero (Classified)</a></li>
                    </ul>
                </div>
                 <div>
                    <h3 className="font-bold text-lg text-white mb-4">Company</h3>
                    <ul className="space-y-2">
                        <li><a href="https://cyberdojogroup.com/about" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">About Us</a></li>
                        <li><a href="https://cyberdojogroup.com/careers" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Careers</a></li>
                        <li><a href="https://cyberdojogroup.com/news" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Press</a></li>
                        <li><a href="https://cyberdojogroup.com/investors" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Investors</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-lg text-white mb-4">Legal</h3>
                    <ul className="space-y-2">
                        <li><a href="/TermsOfService" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                        <li><a href="/PrivacyPolicy" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                        <li><a href="https://cyberdojogroup.com/patents" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Patent Portfolio</a></li>
                    </ul>
                </div>
            </div>
            <div className="text-center text-gray-500 mt-12 border-t border-gray-800 pt-8 flex items-center justify-center gap-4">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6358de6e2_188ec1ee-2ae7-4d9b-aacd-de581b4988ff.png" 
                  alt="Cyber Dojo Solutions" 
                  className="h-5 object-contain"
                />
                <span>
                  &copy; {new Date().getFullYear()} Cyber Dojo Solutions. All rights reserved. | 
                  <a href="https://cyberdojogroup.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 ml-2">
                      cyberdojogroup.com
                  </a>
                </span>
            </div>
        </footer>
      )}
      {/* Leadership Modal */}
      <LeadershipShowcase isOpen={showLeadership} onClose={() => setShowLeadership(false)} />
    </div>
  );
}
