import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {
  State,
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
import { BUCKET, DB, PROFILE } from "../appwrite/names";
import { app } from "../env";

interface Actions {
  register: (credentials: RegisterCredentials) => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
  // updateProfile: (profileData: Partial<UserProfile>) => Promise<void>;
  // uploadAvatar: (file: File) => Promise<string>;
  // sendEmailVerification: () => Promise<void>;
  // confirmEmailVerification: (userId: string, secret: string) => Promise<void>;
  // sendPasswordReset: (email: string) => Promise<void>;
  // confirmPasswordReset: (
  //   userId: string,
  //   secret: string,
  //   password: string
  // ) => Promise<void>;
}

type AuthStore = { hydrated: boolean; setHydrated: () => void } & State &
  Actions;

const useAuthStore = create<AuthStore>()(
  persist(
    immer((set, get) => ({
      // States
      user: null,
      profile: null,
      loading: false,
      isAuthenticated: false,
      hydrated: false,

      // Actions
      setHydrated: () => {
        set({ hydrated: true });
      },
      register: async (credentials) => {
        try {
          set({ loading: true });

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
          const profile = {
            userId: user.$id,
            fullName: credentials.fullName,
            email: credentials.email,
            emailVerification: user.emailVerification,
            passwordUpdate: user.passwordUpdate,
          };

          const createdProfile = await tablesdb.createRow({
            databaseId: DB,
            tableId: PROFILE,
            rowId: ID.unique(),
            data: profile,
          });

          set({
            user: user,
            profile: {
              id: createdProfile.$id,
              userId: createdProfile.userId,
              fullName: createdProfile.fullName,
              email: createdProfile.email,
              emailVerification: createdProfile.emailVerification,
              createdAt: createdProfile.$createdAt,
              updatedAt: createdProfile.$updatedAt,
              passwordUpdate: createdProfile.passwordUpdate,
              reputation: createdProfile.reputation,
              theme: createdProfile.theme,
              bio: createdProfile.bio,
              avatar: createdProfile.avatar,
            },
            isAuthenticated: true,
            loading: false,
          });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },
      login: async (credentials) => {
        try {
          set({ loading: true });

          await account.createEmailPasswordSession({
            email: credentials.email,
            password: credentials.password,
          });
          await get().getCurrentUser();
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },
      logout: async () => {
        try {
          await account.deleteSession({ sessionId: "current" });
        } catch (error) {
          // Even if logout fails, clear local state
        } finally {
          set({
            user: null,
            profile: null,
            isAuthenticated: false,
            loading: false,
          });
        }
      },
      getCurrentUser: async () => {
        try {
          set({ loading: true });

          const user = await account.get();

          // Fetch user profile
          const profileResponse = await tablesdb.listRows({
            databaseId: DB,
            tableId: PROFILE,
            queries: [Query.equal("userId", user.$id)],
          });

          const profileRow = profileResponse.rows[0];
          const profile = {
            id: profileRow.$id,
            userId: profileRow.userId,
            fullName: profileRow.fullName,
            email: profileRow.email,
            emailVerification: profileRow.emailVerification,
            createdAt: profileRow.$createdAt,
            updatedAt: profileRow.$updatedAt,
            passwordUpdate: profileRow.passwordUpdate,
            reputation: profileRow.reputation,
            theme: profileRow.theme,
            bio: profileRow.bio,
            avatar: profileRow.avatar,
          };
          set({
            user: user,
            profile: profileRow ? profile : null,
            isAuthenticated: true,
            loading: false,
          });
        } catch (error) {
          set({
            user: null,
            profile: null,
            isAuthenticated: false,
            loading: false,
          });
        }
      },
      // updateProfile: async (profileData) => {
      //   try {
      //     const { profile } = get();
      //     if (!profile?.userId) throw new Error("No profile found");

      //     set((state) => {
      //       state.loading = true;
      //     });

      //     const updatedProfile = await tablesdb.updateRow({
      //       databaseId: DB,
      //       tableId: PROFILE,
      //       rowId: profile.userId,
      //       data: profileData,
      //     });

      //     set((state) => {
      //       state.profile = updatedProfile as unknown as UserProfile;
      //       state.loading = false;
      //     });
      //   } catch (error) {
      //     set((state) => {
      //       state.loading = false;
      //     });
      //     throw error;
      //   }
      // },
      // uploadAvatar: async (file) => {
      //   try {
      //     const response = await storage.createFile({
      //       bucketId: BUCKET,
      //       fileId: ID.unique(),
      //       file,
      //     });
      //     const fileUrl = storage.getFileView({
      //       bucketId: BUCKET,
      //       fileId: response.$id,
      //     });

      //     return fileUrl.toString();
      //   } catch (error) {
      //     throw error;
      //   }
      // },
      // sendEmailVerification: async () => {
      //   try {
      //     await account.createVerification({
      //       url: `http://${app.demain}/verify-email`,
      //     });
      //   } catch (error) {
      //     throw error;
      //   }
      // },
      // confirmEmailVerification: async (userId, secret) => {
      //   try {
      //     await account.updateVerification({ userId, secret });
      //     await get().getCurrentUser();
      //   } catch (error) {
      //     throw error;
      //   }
      // },
      // sendPasswordReset: async (email) => {
      //   try {
      //     await account.createRecovery({
      //       email,
      //       url: `http://${app.demain}/reset-password`,
      //     });
      //   } catch (error) {
      //     throw error;
      //   }
      // },
      // confirmPasswordReset: async (userId, secret, password) => {
      //   try {
      //     await account.updateRecovery({ userId, password, secret });
      //   } catch (error) {
      //     throw error;
      //   }
      // },
    })),
    {
      name: "auth-store",
      onRehydrateStorage: () => {
        return (state, error) => {
          if (!error) state?.setHydrated();
        };
      },
    }
  )
);

export default useAuthStore;
