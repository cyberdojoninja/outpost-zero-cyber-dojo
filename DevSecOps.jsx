import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CIPipeline } from '@/api/entities';
import { GitBranch, CheckCircle, XCircle, AlertTriangle, FileJson } from 'lucide-react';

const mockPipelines = [
    { pipeline_id: 'pipe01', name: 'Production API Deployment', status: 'success', stages: [{ name: 'SAST Scan', status: 'success' }, { name: 'Deploy', status: 'success' }], tool: 'GitHub Actions' },
    { pipeline_id: 'pipe02', name: 'Data Lake Ingestion', status: 'failed', stages: [{ name: 'Dependency Check', status: 'failed' }], tool: 'GitLab CI' },
    { pipeline_id: 'pipe03', name: 'IaC Environment Provisioning', status: 'running', stages: [{ name: 'Terraform Plan', status: 'running' }], tool: 'Ansible' },
];

export default function DevSecOpsPage() {
    const [pipelines, setPipelines] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await CIPipeline.list();
            setPipelines(data.length > 0 ? data : mockPipelines);
        };
        fetchData();
    }, []);

    const getStatusIcon = (status) => {
        switch(status) {
            case 'success': return <CheckCircle className="text-green-400"/>;
            case 'failed': return <XCircle className="text-red-400"/>;
            case 'running': return <GitBranch className="text-blue-400 animate-pulse"/>;
            default: return <AlertTriangle className="text-yellow-400"/>;
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8" style={{ background: 'var(--primary-bg)' }}>
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <GitBranch className="w-8 h-8 text-green-400" /> Secure CI/CD & DevSecOps
                </h1>
                
                <Card className="border-gray-700 bg-gray-800/50">
                    <CardHeader><CardTitle className="text-white">Active Pipelines</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {pipelines.map(pipe => (
                            <div key={pipe.pipeline_id} className="p-4 bg-gray-900/40 rounded-lg border border-gray-700 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    {getStatusIcon(pipe.status)}
                                    <div>
                                        <h4 className="font-semibold text-white">{pipe.name}</h4>
                                        <p className="text-sm text-gray-400">Tool: {pipe.tool}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {pipe.stages.map(stage => (
                                        <Badge key={stage.name} variant="outline" className="flex items-center gap-1">
                                            {getStatusIcon(stage.status)} {stage.name}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}