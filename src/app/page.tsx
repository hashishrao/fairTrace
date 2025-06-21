'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { ContentFeed } from '@/components/content-feed';
import { AlgorithmProposals } from '@/components/algorithm-proposals';
import { ScoringPreferences } from '@/components/scoring-preferences';
import { posts as initialPosts, proposals, currentAlgorithm } from '@/lib/data';
import type { Post } from '@/lib/types';

export default function Home() {
  const [weights, setWeights] = useState({
    likes: 0.4,
    comments: 0.6,
    recency: 0.2,
  });

  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);

  useEffect(() => {
    const updatedPosts = initialPosts.map(post => {
      const recencyScore = post.scoreBreakdown.find(item => item.factor === 'Recency')?.value ?? 0;
      const downvotesValue = post.scoreBreakdown.find(item => item.factor === 'Downvotes')?.value ?? 0;
      
      const newScore =
        (post.likes * weights.likes) +
        (post.comments * weights.comments) +
        (recencyScore * weights.recency) -
        (downvotesValue * 0.5); // Keep downvote penalty constant

      const newScoreBreakdown = [
        { factor: 'Likes', value: post.likes, weight: weights.likes, contribution: post.likes * weights.likes },
        { factor: 'Comments', value: post.comments, weight: weights.comments, contribution: post.comments * weights.comments },
        { factor: 'Recency', value: recencyScore, weight: weights.recency, contribution: recencyScore * weights.recency },
        { factor: 'Downvotes', value: downvotesValue, weight: -0.5, contribution: -downvotesValue * 0.5 },
      ];

      return { ...post, score: newScore, scoreBreakdown: newScoreBreakdown };
    }).sort((a, b) => b.score - a.score);

    setDisplayedPosts(updatedPosts);
  }, [weights]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <ScoringPreferences weights={weights} onWeightsChange={setWeights} />
            </div>
          </aside>
          <div className="col-span-12 lg:col-span-6">
            <ContentFeed posts={displayedPosts} currentAlgorithmDescription={currentAlgorithm.description} />
          </div>
          <aside className="hidden lg:block lg:col-span-3">
             <div className="sticky top-24">
              <AlgorithmProposals proposals={proposals} />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
