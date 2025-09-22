import { Models } from "node-appwrite";

export interface UserPref {}

export interface UserProfile {
  userId: string;
  fullName: string;
  email: string;
  bio?: string | null;
  avatar?: string | null;
}

export interface State {
  user: Models.User<UserPref> | null;
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
