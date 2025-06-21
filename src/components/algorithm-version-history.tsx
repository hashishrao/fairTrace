import type { AlgorithmVersion } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from './ui/badge';
import { GitCommitHorizontal } from 'lucide-react';

interface AlgorithmVersionHistoryProps {
  versions: AlgorithmVersion[];
}

export function AlgorithmVersionHistory({ versions }: AlgorithmVersionHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Algorithm History</CardTitle>
        <CardDescription>The evolution of our ranking.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {versions.map((version) => (
            <div key={version.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-muted">
                    <GitCommitHorizontal className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 w-px bg-border my-2"></div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                    <p className="font-semibold">Version {version.version}</p>
                    {version.description === 'Current version' && <Badge>{version.description}</Badge>}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{version.date}</p>
                <ul className="list-disc pl-4 text-sm text-muted-foreground">
                    {version.changes.map((change, index) => (
                        <li key={index}>{change}</li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
