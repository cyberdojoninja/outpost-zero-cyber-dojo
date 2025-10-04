import React from 'react';
import { Card } from '@/components/ui/card';
import { 
    Cloud, 
    Server, 
    Database, 
    Shield, 
    Zap, 
    GitBranch,
    HardDrive,
    Network,
    Lock,
    Activity
} from 'lucide-react';

export default function ArchitectureDiagram() {
    return (
        <div className="bg-gray-900/50 rounded-lg p-8 border border-gray-700">
            <div className="space-y-8">
                {/* Top Layer - CI/CD */}
                <div className="flex justify-center">
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 flex items-center gap-3 w-64">
                        <GitBranch className="w-8 h-8 text-purple-400" />
                        <div>
                            <div className="text-white font-semibold">GitHub Actions</div>
                            <div className="text-xs text-gray-400">CI/CD Pipeline</div>
                        </div>
                    </div>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center">
                    <div className="w-px h-8 bg-gray-600"></div>
                </div>

                {/* Middle Layer - Cloud Providers */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <Cloud className="w-6 h-6 text-orange-400" />
                            <div className="text-white font-semibold">AWS</div>
                        </div>
                        <div className="space-y-1 text-xs text-gray-400">
                            <div>• EKS Cluster</div>
                            <div>• VPC Configuration</div>
                            <div>• Load Balancers</div>
                        </div>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <Cloud className="w-6 h-6 text-blue-400" />
                            <div className="text-white font-semibold">Azure</div>
                        </div>
                        <div className="space-y-1 text-xs text-gray-400">
                            <div>• AKS Cluster</div>
                            <div>• Virtual Networks</div>
                            <div>• Application Gateway</div>
                        </div>
                    </div>

                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <Cloud className="w-6 h-6 text-green-400" />
                            <div className="text-white font-semibold">GCP</div>
                        </div>
                        <div className="space-y-1 text-xs text-gray-400">
                            <div>• GKE Cluster</div>
                            <div>• VPC Network</div>
                            <div>• Cloud Load Balancing</div>
                        </div>
                    </div>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center">
                    <div className="w-px h-8 bg-gray-600"></div>
                </div>

                {/* Kubernetes Layer */}
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-cyan-500/20 rounded-lg">
                            <Server className="w-8 h-8 text-cyan-400" />
                        </div>
                        <div>
                            <div className="text-white font-semibold text-lg">Kubernetes Orchestration</div>
                            <div className="text-xs text-gray-400">Container Management & Auto-Scaling</div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-gray-800/50 rounded p-3 border border-gray-700">
                            <Shield className="w-5 h-5 text-blue-400 mb-2" />
                            <div className="text-white text-sm font-medium">API Server</div>
                            <div className="text-xs text-gray-500">3 replicas</div>
                        </div>
                        <div className="bg-gray-800/50 rounded p-3 border border-gray-700">
                            <Activity className="w-5 h-5 text-green-400 mb-2" />
                            <div className="text-white text-sm font-medium">AI Workers</div>
                            <div className="text-xs text-gray-500">Auto-scaling</div>
                        </div>
                        <div className="bg-gray-800/50 rounded p-3 border border-gray-700">
                            <Database className="w-5 h-5 text-purple-400 mb-2" />
                            <div className="text-white text-sm font-medium">Database</div>
                            <div className="text-xs text-gray-500">Clustered</div>
                        </div>
                        <div className="bg-gray-800/50 rounded p-3 border border-gray-700">
                            <Zap className="w-5 h-5 text-yellow-400 mb-2" />
                            <div className="text-white text-sm font-medium">Cache Layer</div>
                            <div className="text-xs text-gray-500">Redis</div>
                        </div>
                    </div>
                </div>

                {/* Bottom Layer - Infrastructure */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <HardDrive className="w-6 h-6 text-blue-400" />
                            <div className="text-white font-semibold">Storage</div>
                        </div>
                        <div className="space-y-1 text-xs text-gray-400">
                            <div>• Persistent Volumes</div>
                            <div>• Object Storage</div>
                            <div>• Backup Systems</div>
                        </div>
                    </div>

                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <Network className="w-6 h-6 text-green-400" />
                            <div className="text-white font-semibold">Networking</div>
                        </div>
                        <div className="space-y-1 text-xs text-gray-400">
                            <div>• Service Mesh</div>
                            <div>• Ingress Controllers</div>
                            <div>• DNS Management</div>
                        </div>
                    </div>

                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <Lock className="w-6 h-6 text-red-400" />
                            <div className="text-white font-semibold">Security</div>
                        </div>
                        <div className="space-y-1 text-xs text-gray-400">
                            <div>• Network Policies</div>
                            <div>• Secret Management</div>
                            <div>• RBAC Controls</div>
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 justify-center pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="w-3 h-3 bg-cyan-500/30 rounded"></div>
                        <span>Kubernetes Layer</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="w-3 h-3 bg-blue-500/30 rounded"></div>
                        <span>Cloud Infrastructure</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="w-3 h-3 bg-purple-500/30 rounded"></div>
                        <span>CI/CD Pipeline</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="w-3 h-3 bg-gray-700 rounded"></div>
                        <span>Supporting Services</span>
                    </div>
                </div>
            </div>
        </div>
    );
}