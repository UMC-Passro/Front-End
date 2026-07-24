import type { UserRole } from "../types/user";

const AUTH_USER_KEY = "passro.authUser";
const SELECTED_USER_ROLE_KEY = "passro.selectedUserRole";

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

function isUserRole(value: string | null): value is UserRole {
  return value === "sender" || value === "carrier";
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
  localStorage.removeItem(SELECTED_USER_ROLE_KEY);
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

export function getSelectedUserRole(): UserRole | null {
  const storedRole = localStorage.getItem(SELECTED_USER_ROLE_KEY);
  return isUserRole(storedRole) ? storedRole : null;
}

export function setCurrentUserRole(role: UserRole) {
  localStorage.setItem(SELECTED_USER_ROLE_KEY, role);

  const currentUser = getCurrentUser();
  if (!currentUser) {
    return null;
  }

  const updatedUser: AuthUser = {
    ...currentUser,
    role,
  };

  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(updatedUser));
  return updatedUser;
}
