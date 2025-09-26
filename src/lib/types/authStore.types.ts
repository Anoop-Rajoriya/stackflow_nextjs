import { Models } from "appwrite";

export interface UserProfile {
  userId: string;
  fullName: string;
  email: string;
  emailVerification: boolean;
  createdAt: string;
  updatedAt: string;
  passwordUpdate: string;
  reputation: Number;
  theme?: "dark" | "light" | "system";
  bio?: string;
  avatar?: string;
}

export interface State {
  user: Models.User | null;
  profile: UserProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  fullName: string;
}
