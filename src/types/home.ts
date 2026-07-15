export type ActiveDelivery = {
  title: string;
  route: string;
  status: string;
};

export type MatchingRequest = {
  id: number;
  title: string;
  route: string;
  timeLeft: string;
};

export type RecentHistory = {
  id: number;
  title: string;
  date: string;
  status: string;
};

export type HomeContent = {
  name: string;
  headline: string;
  activeDelivery: ActiveDelivery;
  matchingRequests: MatchingRequest[];
  recentHistories: RecentHistory[];
  actionLabel?: string;
};
