import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { account, ID, tablesdb } from "../appwrite/client.config";
import type {
  User,
  AuthState,
  RegisterCredentials,
  LoginCredentials,
  UserProfile,
} from "../types/authStore.types";
import { AppwriteException, Query, Models } from "appwrite";
import names from "../appwrite/names";
import { stat } from "fs";

const { T_DB, PROFILE_TABLE } = names;

interface AuthActions {
  setLoading: (loading: boolean) => void;
  getCurrentUser: () => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  //   updateProfile: (profileData: Partial<UserProfile>) => Promise<void>;
  //   uploadAvatar: (file: File) => Promise<string>;
  //   sendEmailVerification: () => Promise<void>;
  //   confirmEmailVerification: (userId: string, secret: string) => Promise<void>;
  //   sendPasswordReset: (email: string) => Promise<void>;
  //   confirmPasswordReset: (
  //     userId: string,
  //     secret: string,
  //     password: string
  //   ) => Promise<void>;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    immer((set, get) => ({
      // Initial States
      user: null,
      profile: null,
      loading: false,
      isAuthenticated: false,

      // Actions
      setLoading: (loading: boolean) => {
        set((state) => {
          state.loading = loading;
        });
      },
      getCurrentUser: async () => {
        try {
          set((state) => {
            state.loading = true;
          });
          const user = await account.get();
          // Fetch user profile
          const profileResponse = await tablesdb.listRows({
            databaseId: T_DB,
            tableId: PROFILE_TABLE,
            queries: [Query.equal("userId", user.$id)],
          });

          const profile = profileResponse.rows[0] as unknown as UserProfile;

          set((state) => {
            state.user = user;
            state.profile = profile || null;
            state.isAuthenticated = true;
            state.loading = false;
          });
        } catch (err) {
          set((state) => {
            state.user = null;
            state.profile = null;
            state.isAuthenticated = false;
            state.loading = false;
          });
        }
      },
      login: async (credentials: LoginCredentials) => {
        try {
          const { email, password } = credentials;

          set((state) => {
            state.loading = true;
          });

          await account.createEmailPasswordSession({ email, password });
          await get().getCurrentUser();
        } catch (error) {
          set((state) => {
            state.loading = false;
          });
          throw error;
        }
      },
      register: async (credentials: RegisterCredentials) => {
        try {
          const { fullName, email, password } = credentials;

          // Create user
          const user = await account.create({
            userId: ID.unique(),
            email,
            password,
            name: fullName,
          });

          // Create email session
          await account.createEmailPasswordSession({ email, password });

          // Create user profile
          const profile: Omit<
            UserProfile,
            "$id" | "$createdAt" | "$updatedAT"
          > = {
            userId: user.$id,
            fullName,
            email,
          };

          const createdProfile = await tablesdb.createRow({
            databaseId: T_DB,
            tableId: PROFILE_TABLE,
            rowId: ID.unique(),
            data: profile,
          });

          set((state) => {
            state.user = user;
            (state.profile = createdProfile as unknown as UserProfile),
              (state.isAuthenticated = true),
              (state.loading = false);
          });
        } catch (error) {
          set((state) => {
            state.loading = false;
          });
          throw error;
        }
      },
      logout: async () => {
        try {
          await account.deleteSession("current");
        } catch (error) {
          // Even if logout fails, clear local state
        } finally {
          set((state) => {
            state.user = null;
            state.profile = null;
            state.isAuthenticated = false;
            state.loading = false;
          });
        }
      },
      //   updateProfile: async () => {},
      //   uploadAvatar: async (f) => {},
      //   sendEmailVerification: async () => {},
      //   confirmEmailVerification: async () => {},
      //   sendPasswordReset: async () => {},
      //   confirmPasswordReset: async () => {},
    })),
    {
      name: "auth-store",
      partialize: (state) => ({
        user: state.user,
        profile: state.profile,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
