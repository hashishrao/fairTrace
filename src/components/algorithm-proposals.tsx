import type { Proposal } from '@/lib/types';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

interface AlgorithmProposalsProps {
  proposals: Proposal[];
}

const statusColors = {
  open: 'bg-blue-500',
  approved: 'bg-green-500',
  rejected: 'bg-red-500',
};

export function AlgorithmProposals({ proposals }: AlgorithmProposalsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Community Proposals</CardTitle>
        <CardDescription>Vote on changes to the algorithm.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {proposals.map((proposal) => {
          const totalVotes = proposal.votes.up + proposal.votes.down;
          const upVotePercentage = totalVotes > 0 ? (proposal.votes.up / totalVotes) * 100 : 0;
          return (
            <div key={proposal.id} className="rounded-lg border p-4 space-y-3">
              <Link href={`/proposal/${proposal.id}`} className="block space-y-3">
                <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{proposal.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Avatar className="h-5 w-5">
                              <AvatarImage src={proposal.proposer.avatarUrl} alt={proposal.proposer.name} />
                              <AvatarFallback>{proposal.proposer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{proposal.proposer.name}</span>
                      </div>
                    </div>
                  <Badge variant={proposal.status === 'open' ? 'default' : 'secondary'} className={proposal.status !== 'open' ? 'capitalize' : `capitalize ${statusColors[proposal.status]} text-primary-foreground`}>{proposal.status}</Badge>
                </div>

                <p className="text-sm text-muted-foreground">{proposal.description}</p>
                
                <div>
                  <Progress value={upVotePercentage} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{proposal.votes.up} Upvotes</span>
                    <span>{proposal.votes.down} Downvotes</span>
                  </div>
                </div>
              </Link>

              {proposal.status === 'open' && (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="w-full">
                    <ThumbsUp className="h-4 w-4 mr-2" /> Vote Up
                  </Button>
                  <Button size="sm" variant="outline" className="w-full">
                    <ThumbsDown className="h-4 w-4 mr-2" /> Vote Down
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
