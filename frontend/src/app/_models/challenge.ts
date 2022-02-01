import { User } from ".";

export interface ChallengeCategory {
  id: number;
  name: string;
  total_challenges: number;
  total_challenges_resolved: number;
}

export interface Challenge {
  id: number;
  title: string;
  description: string | null;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'EXTREME';
  category: ChallengeCategory;
  points: number;
  resource_link: string;
  hint: string | null;
  created_at: string;
  is_resolved: boolean;
}

export interface ChallengeResolve {
  id: number;
  user?: User;
  challenge: Challenge;
  points: number;
  resolved_at: string;
}
