import type { UserProfile, UserRole } from "../types/user";

const AUTH_USER_KEY = "passro.authUser";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;

}

function createUserId(email: string) {
  return email.trim().toLowerCase();
}

function getNameFromEmail(email: string) {
  const localPart = email.split("@")[0]?.trim();
  return localPart || "패스로 사용자";
}

function getRoleFromEmail(email: string): UserRole {
  const normalizedEmail = email.toLowerCase();
  return normalizedEmail.includes("carrier") || normalizedEmail.includes("delivery")
    ? "carrier"
    : "sender";
}

export function login(email: string): AuthUser {
  const normalizedEmail = email.trim().toLowerCase();
  const authUser: AuthUser = {
    id: createUserId(normalizedEmail),
    email: normalizedEmail,
    name: getNameFromEmail(normalizedEmail),
    role: getRoleFromEmail(normalizedEmail),
  };

  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authUser));
  return authUser;
}

export function logout() {
  localStorage.removeItem(AUTH_USER_KEY);
}

export function getCurrentUser(): AuthUser | null {
  const storedUser = localStorage.getItem(AUTH_USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as AuthUser;
  } catch {
    logout();
    return null;
  }
}

export function isAuthenticated() {
  return getCurrentUser() !== null;
}
