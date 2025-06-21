import Image from 'next/image';
import Link from 'next/link';
import { Heart, MessageCircle, Info } from 'lucide-react';
import type { Post } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <Avatar>
          <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold">{post.author.name}</p>
          <Link href={`/post/${post.id}`} className="text-sm text-muted-foreground hover:underline">
            {post.createdAt}
          </Link>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm">
              <Info className="mr-2 h-4 w-4" />
              Score: {post.score.toFixed(1)}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Scoring Breakdown</h4>
                <p className="text-sm text-muted-foreground">
                  How this post's score was calculated.
                </p>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Factor</TableHead>
                    <TableHead className="text-right">Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {post.scoreBreakdown.map((item) => (
                    <TableRow key={item.factor}>
                      <TableCell className="font-medium">{item.factor}</TableCell>
                      <TableCell className="text-right">{item.contribution.toFixed(1)}</TableCell>
                    </TableRow>
                  ))}
                   <TableRow className="font-bold">
                      <TableCell>Total</TableCell>
                      <TableCell className="text-right">{post.score.toFixed(1)}</TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </div>
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="mb-4">{post.content}</p>
        {post.imageUrl && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image 
              src={post.imageUrl} 
              alt="Post content" 
              fill 
              className="object-cover" 
              data-ai-hint={post['data-ai-hint']}
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-start gap-4 p-4 pt-0">
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Heart className="h-4 w-4" />
          <span>{post.likes}</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4" />
          <span>{post.comments}</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
