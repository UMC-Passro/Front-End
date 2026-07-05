export type UserRole = "sender" | "carrier";

export type SchoolVerificationStatus = "verified" | "pending" | "rejected" | "none";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  schoolName: string;
  department?: string;
  avatarUrl?: string;
  role: UserRole;
  verificationStatus: SchoolVerificationStatus;
  rating: number;
  reviewCount: number;
  pointBalance: number;
}

export interface CommuteRouteSummary {
  id: string;
  name: string;
  origin: string;
  destination: string;
  timeRange: string;
}

export interface ProfileStats {
  deliveryRequests: number;
  completedDeliveries: number;
  savedRoutes: number;
  acceptanceRate?: number;
}

export interface ProfilePageData {
  profile: UserProfile;
  primaryRoute?: CommuteRouteSummary;
  stats: ProfileStats;
}
