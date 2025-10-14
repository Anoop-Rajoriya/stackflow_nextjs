import { Models } from "appwrite";
import { StateCreator } from "zustand";

type Profile = {
  id: string;
  name: string;
  email: string;
  about: string;
  avatar: string | null;
  reputation: number;
  joinedAt: string;
};

type AuthSlice = {
  user: Models.User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  signUp: () => Promise<void>;
  logout: () => Promise<void>;
};

const createAuthSlice: StateCreator<AuthSlice> = (set, get) => ({
  user: null,
  profile: null,
  isAuthenticated: false,
  signUp: async () => {},
  login: async () => {},
  logout: async () => {},
});

export { createAuthSlice, type AuthSlice, type Profile };
