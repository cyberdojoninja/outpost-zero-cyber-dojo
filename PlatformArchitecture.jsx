import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Network, Server, Database, Cloud } from 'lucide-react';

export default function PlatformArchitecturePage() {
    return (
        <div className="min-h-screen p-4 md:p-8" style={{ background: 'var(--primary-bg)' }}>
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <Network className="w-8 h-8 text-blue-400" /> System & Network Architecture
                </h1>
                
                <Card className="border-gray-700 bg-gray-800/50">
                    <CardHeader><CardTitle className="text-white">Hybrid Cloud Network Topology</CardTitle></CardHeader>
                    <CardContent>
                        <div className="relative p-8 bg-gray-900/50 rounded-lg text-center">
                            <p className="text-white font-mono">
                                This is a visual representation of the network architecture. 
                                In a real application, this would be an interactive diagram (e.g., using D3.js or react-flow).
                            </p>
                            <div className="mt-8 flex justify-around items-center">
                                <div className="text-center">
                                    <Server className="w-12 h-12 mx-auto text-green-400" />
                                    <p className="text-white mt-2">On-Prem Data Center</p>
                                </div>
                                <div className="text-white font-bold text-2xl h-px w-1/4 bg-blue-500 border-t-2 border-dashed border-blue-400">VPN</div>
                                <div className="text-center">
                                    <Cloud className="w-12 h-12 mx-auto text-cyan-400" />
                                    <p className="text-white mt-2">GovCloud Environment</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}