export interface GitHubConfig {
  username: string;
  profileUrl: string;
  fallbackData: {
    publicRepos: number;
    followers: number;
    following: number;
    bio: string;
  };
}

export const GITHUB_CONFIG: GitHubConfig = {
  username: "whiteghost0001",
  profileUrl: "https://github.com/whiteghost0001",
  fallbackData: {
    publicRepos: 18,
    followers: 12,
    following: 15,
    bio: "Full-Stack Developer & Blockchain Engineer building Web3 protocols, smart contracts, and web applications.",
  },
};
