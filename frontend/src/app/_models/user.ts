import { ChallengeResolve } from ".";

export interface User {
  id: number;
  email: string;
  username: string;
  created_at: string;
  role: 'CLASSIC' | 'ADMIN';
  total_points: number;
  total_points_solved: number;
  challenges_resolved: ChallengeResolve[];
  token?: string;
}

export interface UserLeaderboard {
  id: number;
  username: string;
  created_at: string;
  total_points_solved: number;
  challenges_resolved: ChallengeResolve[];
}
