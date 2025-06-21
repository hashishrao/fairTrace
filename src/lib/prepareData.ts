import { posts } from './data';
import { Post } from './types';

interface TrainingData {
  likes: number;
  comments: number;
  recency: number;
  downvotes: number;
  score: number;
}

export function prepareTrainingData(): TrainingData[] {
  return posts.map((post: Post) => {
    // Simple recency calculation based on sample string format
    let recencyScore: number = 0;
    if (post.createdAt.includes('hours ago')) {
      const hours = parseInt(post.createdAt.replace(' hours ago', ''), 10);
      // Assign higher score for fewer hours ago (more recent)
      recencyScore = 10 - Math.min(hours / 2, 10); // Scale hours to a 0-10 score
    } else if (post.createdAt.includes('day ago')) {
      const days = parseInt(post.createdAt.replace(' day ago', ''), 10);
      // Assign lower score for days ago
      recencyScore = Math.max(0, 5 - days); // Scale days to a lower 0-5 score
    }

    return {
      likes: post.likes,
      comments: post.comments,
      recency: recencyScore,
      downvotes: post.scoreBreakdown?.find(item => item.factor === 'Downvotes')?.value || 0,
      score: post.score,
    };
  });
}