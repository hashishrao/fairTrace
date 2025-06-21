export type Post = {
  id: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  content: string;
  imageUrl?: string;
  'data-ai-hint'?: string;
  likes: number;
  comments: number;
  createdAt: string;
  score: number;
  scoreBreakdown: {
    factor: string;
    value: number;
    weight: number;
    contribution: number;
  }[];
};

export type AlgorithmVersion = {
  id: string;
  version: string;
  date: string;
  description: string;
  changes: string[];
};

export type Proposal = {
  id: string;
  title: string;
  description: string;
  proposer: {
    name: string;
    avatarUrl: string;
  };
  votes: {
    up: number;
    down: number;
  };
  status: 'open' | 'approved' | 'rejected';
};
