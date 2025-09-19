import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

import { AppwriteException, ID, Models } from "node-appwrite";
import { account } from "@/appwrite/client.config";

interface AuthStore {
  user: Models.User<Models.Preferences> | null;
  session: Models.Session | null;
  jwt: Models.Jwt | null;
  hydrated: boolean;

  setHydrated: () => void;

  signup: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: AppwriteException | null }>;

  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: AppwriteException | null }>;

  logout: () => Promise<{ success: boolean; error?: AppwriteException | null }>;

  verifySession: () => Promise<void>;
}

export const useAuth = create<AuthStore>()(
  persist(
    immer((set) => ({
      user: null,
      session: null,
      jwt: null,
      hydrated: false,

      setHydrated() {
        set({ hydrated: true });
      },

      async signup(name: string, email: string, password: string) {
        try {
          await account.create({ userId: ID.unique(), email, password, name });
          return { success: true };
        } catch (error) {
          console.log("File/Method:- Auth/signup error: ", error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },
      async login(email: string, password: string) {
        try {
          const session = await account.createEmailPasswordSession({
            email,
            password,
          });
          const [user, jwt] = await Promise.all([
            account.get(),
            account.createJWT(),
          ]);

          if (!user.prefs?.reputation)
            await account.updatePrefs({
              prefs: {
                reputation: 0,
              },
            });

          set({ session, user, jwt });
          return { success: true };
        } catch (error) {
          console.log("File/Method:- Auth/login error: ", error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },
      async logout() {
        try {
          await account.deleteSession({
            sessionId: "current",
          });
          set({ session: null, user: null, jwt: null });
          return { success: true };
        } catch (error) {
          console.log("File/Method:- Auth/logout error: ", error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },
      async verifySession() {
        try {
          const session = await account.getSession({
            sessionId: "current",
          });
          set({ session });
        } catch (error) {
          console.log("File/Method:- Auth/verifySession error: ", error);
        }
      },
    })),
    {
      name: "",
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
        };
      },
    }
  )
);
