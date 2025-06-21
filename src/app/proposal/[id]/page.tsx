import { Header } from '@/components/header';
import { proposals } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ThumbsDown, ThumbsUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ProposalImpactCharts } from '@/components/proposal-impact-charts';

const statusColors = {
  open: 'bg-blue-500',
  approved: 'bg-green-500',
  rejected: 'bg-red-500',
};

export default function ProposalPage({ params }: { params: { id: string } }) {
  const proposal = proposals.find((p) => p.id === params.id);

  if (!proposal) {
    notFound();
  }
  
  const totalVotes = proposal.votes.up + proposal.votes.down;
  const upVotePercentage = totalVotes > 0 ? (proposal.votes.up / totalVotes) * 100 : 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button asChild variant="ghost" className="mb-4 -ml-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to feed
            </Link>
          </Button>

          <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-2xl">{proposal.title}</CardTitle>
                    <Badge variant={proposal.status === 'open' ? 'default' : 'secondary'} className={proposal.status !== 'open' ? 'capitalize' : `capitalize ${statusColors[proposal.status]} text-primary-foreground`}>{proposal.status}</Badge>
                </div>
                <CardDescription>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={proposal.proposer.avatarUrl} alt={proposal.proposer.name} />
                            <AvatarFallback>{proposal.proposer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>Proposed by {proposal.proposer.name}</span>
                    </div>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-base">{proposal.description}</p>

                <div className="my-6">
                    <Progress value={upVotePercentage} className="h-3" />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>{proposal.votes.up} Upvotes</span>
                        <span>{proposal.votes.down} Downvotes</span>
                    </div>
                </div>

                {proposal.status === 'open' && (
                    <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                            <ThumbsUp className="h-4 w-4 mr-2" /> Vote Up
                        </Button>
                        <Button size="sm" variant="outline">
                            <ThumbsDown className="h-4 w-4 mr-2" /> Vote Down
                        </Button>
                    </div>
                )}
            </CardContent>
          </Card>

          <ProposalImpactCharts />
          
        </div>
      </main>
    </div>
  );
}
