// Simple authentication utility using localStorage
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123", // In production, this should be hashed and stored securely
};

const AUTH_KEY = "attaqonyy_admin_auth";

export interface AuthState {
  isAuthenticated: boolean;
  username: string;
  timestamp: number;
}

export const login = (username: string, password: string): boolean => {
  if (
    username === ADMIN_CREDENTIALS.username &&
    password === ADMIN_CREDENTIALS.password
  ) {
    const authState: AuthState = {
      isAuthenticated: true,
      username,
      timestamp: Date.now(),
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(authState));
    return true;
  }
  return false;
};

export const logout = (): void => {
  localStorage.removeItem(AUTH_KEY);
};

export const isAuthenticated = (): boolean => {
  try {
    const authData = localStorage.getItem(AUTH_KEY);
    if (!authData) return false;

    const authState: AuthState = JSON.parse(authData);

    // Check if session is less than 24 hours old
    const hoursSinceLogin =
      (Date.now() - authState.timestamp) / (1000 * 60 * 60);
    if (hoursSinceLogin > 24) {
      logout();
      return false;
    }

    return authState.isAuthenticated;
  } catch {
    return false;
  }
};

export const getAuthState = (): AuthState | null => {
  try {
    const authData = localStorage.getItem(AUTH_KEY);
    if (!authData) return null;
    return JSON.parse(authData);
  } catch {
    return null;
  }
};
