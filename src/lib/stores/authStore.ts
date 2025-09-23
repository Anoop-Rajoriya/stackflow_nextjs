import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {
  State,
  UserProfile,
  LoginCredentials,
  RegisterCredentials,
} from "../types/authStore.types";
import {
  account,
  ID,
  Query,
  tablesdb,
  storage,
} from "../appwrite/client.config";
import { BUCKET, DB, USR_PROFILE } from "../appwrite/names";
import { app } from "../env";

interface Actions {
  register: (credentials: RegisterCredentials) => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
  updateProfile: (profileData: Partial<UserProfile>) => Promise<void>;
  uploadAvatar: (file: File) => Promise<string>;
  sendEmailVerification: () => Promise<void>;
  confirmEmailVerification: (userId: string, secret: string) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  confirmPasswordReset: (
    userId: string,
    secret: string,
    password: string
  ) => Promise<void>;
  setLoading: (loading: boolean) => void;
}

type AuthStore = State & Actions;

const useAuthStore = create<AuthStore>()(
  persist(
    immer((set, get) => ({
      // States
      user: null,
      profile: null,
      loading: false,
      isAuthenticated: false,

      // Actions
      register: async (credentials) => {
        try {
          set((state) => {
            state.loading = true;
          });

          // Create account
          const user = await account.create({
            userId: ID.unique(),
            email: credentials.email,
            password: credentials.password,
            name: credentials.fullName,
          });

          // Create email session
          await account.createEmailPasswordSession({
            email: credentials.email,
            password: credentials.password,
          });

          // Create user profile document
          const profile: UserProfile = {
            userId: user.$id,
            fullName: credentials.fullName,
            email: credentials.email,
            bio: "",
            avatar: "",
          };

          const createdProfile = await tablesdb.createRow({
            databaseId: DB,
            tableId: USR_PROFILE,
            rowId: ID.unique(),
            data: profile,
          });

          set((state) => {
            state.user = user;
            state.profile = createdProfile as unknown as UserProfile;
            state.isAuthenticated = true;
            state.loading = false;
          });
        } catch (error) {
          set((state) => {
            state.loading = false;
          });
          throw error;
        }
      },
      login: async (credentials) => {
        try {
          set((state) => {
            state.loading = true;
          });

          await account.createEmailPasswordSession({
            email: credentials.email,
            password: credentials.password,
          });
          await get().getCurrentUser();
        } catch (error) {
          set((state) => {
            state.loading = false;
          });
          throw error;
        }
      },
      logout: async () => {
        try {
          await account.deleteSession({ sessionId: "current" });
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
      getCurrentUser: async () => {
        try {
          set((state) => {
            state.loading = true;
          });

          const user = await account.get();

          // Fetch user profile
          const profileResponse = await tablesdb.listRows({
            databaseId: DB,
            tableId: USR_PROFILE,
            queries: [Query.equal("userId", user.$id)],
          });

          const profile = profileResponse.rows[0] as unknown as UserProfile;

          set((state) => {
            state.user = user;
            state.profile = profile || null;
            state.isAuthenticated = true;
            state.loading = false;
          });
        } catch (error) {
          set((state) => {
            state.user = null;
            state.profile = null;
            state.isAuthenticated = false;
            state.loading = false;
          });
        }
      },
      updateProfile: async (profileData) => {
        try {
          const { profile } = get();
          if (!profile?.userId) throw new Error("No profile found");

          set((state) => {
            state.loading = true;
          });

          const updatedProfile = await tablesdb.updateRow({
            databaseId: DB,
            tableId: USR_PROFILE,
            rowId: profile.userId,
            data: profileData,
          });

          set((state) => {
            state.profile = updatedProfile as unknown as UserProfile;
            state.loading = false;
          });
        } catch (error) {
          set((state) => {
            state.loading = false;
          });
          throw error;
        }
      },
      uploadAvatar: async (file) => {
        try {
          const response = await storage.createFile({
            bucketId: BUCKET,
            fileId: ID.unique(),
            file,
          });
          const fileUrl = storage.getFileView({
            bucketId: BUCKET,
            fileId: response.$id,
          });

          return fileUrl.toString();
        } catch (error) {
          throw error;
        }
      },
      sendEmailVerification: async () => {
        try {
          await account.createVerification({
            url: `http://${app.demain}/verify-email`,
          });
        } catch (error) {
          throw error;
        }
      },
      confirmEmailVerification: async (userId, secret) => {
        try {
          await account.updateVerification({ userId, secret });
          await get().getCurrentUser();
        } catch (error) {
          throw error;
        }
      },
      sendPasswordReset: async (email) => {
        try {
          await account.createRecovery({
            email,
            url: `http://${app.demain}/reset-password`,
          });
        } catch (error) {
          throw error;
        }
      },
      confirmPasswordReset: async (userId, secret, password) => {
        try {
          await account.updateRecovery({ userId, password, secret });
        } catch (error) {
          throw error;
        }
      },
      setLoading: (loading) => {
        set((state) => {
          state.loading = loading;
        });
      },
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
