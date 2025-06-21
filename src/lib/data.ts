import type { Post, AlgorithmVersion, Proposal } from './types';

export const currentAlgorithm = {
  version: '2.1.0',
  description: `The current ranking algorithm (v2.1.0) calculates a post's score based on a weighted sum of several factors. The formula is: Score = (Likes * 0.4) + (Comments * 0.6) + (Recency * 0.2) - (Downvotes * 0.5). Recency is a score from 1 to 10 based on how new the post is. Newer posts get a higher score.`
};

export const posts: Post[] = [
  {
    id: '1',
    author: { name: 'Alice', avatarUrl: 'https://placehold.co/40x40.png' },
    content: 'Just discovered an amazing new paradigm for state management in large-scale apps. It simplifies everything! #dev #react',
    imageUrl: 'https://i.postimg.cc/6yPSPYzd/tackling-state-management-in-large-react-applications-best-practices-and-testing-strategies-0-fba2c5.jpg',
    'data-ai-hint': 'react code',
    likes: 120,
    comments: 45,
    createdAt: '2 hours ago',
    score: 75.8,
    scoreBreakdown: [
      { factor: 'Likes', value: 120, weight: 0.4, contribution: 48 },
      { factor: 'Comments', value: 45, weight: 0.6, contribution: 27 },
      { factor: 'Recency', value: 9, weight: 0.2, contribution: 1.8 },
      { factor: 'Downvotes', value: 2, weight: -0.5, contribution: -1 }
    ]
  },
  {
    id: '2',
    author: { name: 'Bob', avatarUrl: 'https://placehold.co/40x40.png' },
    content: 'Exploring the ethics of AI in content generation. It\'s a fascinating and complex topic with huge implications for the future.',
    imageUrl: 'https://i.postimg.cc/DWkNv090/1685646786793.png',
    'data-ai-hint': 'AI ethics',
    likes: 88,
    comments: 62,
    createdAt: '1 day ago',
    score: 71.2,
    scoreBreakdown: [
      { factor: 'Likes', value: 88, weight: 0.4, contribution: 35.2 },
      { factor: 'Comments', value: 62, weight: 0.6, contribution: 37.2 },
      { factor: 'Recency', value: 4, weight: 0.2, contribution: 0.8 },
      { factor: 'Downvotes', value: 4, weight: -0.5, contribution: -2 }
    ]
  },
  {
    id: '3',
    author: { name: 'Charlie', avatarUrl: 'https://placehold.co/40x40.png' },
    content: 'Check out this beautiful photo I took during my hike this morning. Nature is the best artist.',
    imageUrl: 'https://i.postimg.cc/svxqKtPj/istockphoto-1403500817-612x612.jpg',
    'data-ai-hint': "nature landscape",
    likes: 250,
    comments: 30,
    createdAt: '5 hours ago',
    score: 119.4,
    scoreBreakdown: [
      { factor: 'Likes', value: 250, weight: 0.4, contribution: 100 },
      { factor: 'Comments', value: 30, weight: 0.6, contribution: 18 },
      { factor: 'Recency', value: 7, weight: 0.2, contribution: 1.4 },
      { factor: 'Downvotes', value: 0, weight: -0.5, contribution: 0 }
    ]
  }
];

export const sampleContent = posts;

export const algorithmVersions: AlgorithmVersion[] = [
  { id: '1', version: '2.1.0', date: '2024-07-15', description: 'Current version', changes: ['Increased comment weight.'] },
  { id: '2', version: '2.0.0', date: '2024-06-01', description: 'Major overhaul', changes: ['Introduced weighted factors.', 'Added recency score.'] },
  { id: '3', version: '1.5.2', date: '2024-04-20', description: 'Bug fixes', changes: ['Fixed score calculation error.'] },
  { id: '4', version: '1.5.0', date: '2024-03-10', description: 'Initial balanced', changes: ['Likes and comments weighted equally.'] },
];

export const proposals: Proposal[] = [
  {
    id: 'prop1',
    title: 'Boost New Content',
    description: 'Increase the weight of the "Recency" factor from 0.2 to 0.5 to give new posts a better chance of being seen.',
    proposer: { name: 'Diana', avatarUrl: 'https://placehold.co/40x40.png' },
    votes: { up: 42, down: 5 },
    status: 'open'
  },
  {
    id: 'prop2',
    title: 'Value User Images More',
    description: 'Add a new factor "HasImage" that adds 10 points to the score if a post includes an image.',
    proposer: { name: 'Eve', avatarUrl: 'https://placehold.co/40x40.png' },
    votes: { up: 15, down: 28 },
    status: 'open'
  },
  {
    id: 'prop3',
    title: 'Reduce Like Impact',
    description: 'Lower the weight of "Likes" from 0.4 to 0.3 to encourage more meaningful discussions over simple reactions.',
    proposer: { name: 'Frank', avatarUrl: 'https://placehold.co/40x40.png' },
    votes: { up: 112, down: 34 },
    status: 'approved'
  },
];
