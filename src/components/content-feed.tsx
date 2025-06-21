import type { Post } from '@/lib/types';
import { PostCard } from './post-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { currentAlgorithm } from '@/lib/data';

interface ContentFeedProps {
  posts: Post[];
  currentAlgorithmDescription: string;
}

export function ContentFeed({ posts, currentAlgorithmDescription }: ContentFeedProps) {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Current Algorithm</CardTitle>
            <Badge variant="secondary">v{currentAlgorithm.version}</Badge>
          </div>
          <CardDescription>{currentAlgorithmDescription}</CardDescription>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
