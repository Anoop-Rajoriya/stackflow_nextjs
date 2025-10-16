import { Models } from "appwrite";
import { account, tablesdb, ID, Query } from "@/appwrite/client.config";
import { StateCreator } from "zustand";
import { DB, PROFILE } from "@/appwrite/names";

type Profile = {
  id: string;
  name: string;
  email: string;
  about: string | null;
  avatar: string | null;
  reputation: number;
  joinedAt: string;
};

type SignupProps = {
  name: string;
  email: string;
  password: string;
};
type LoginProps = {
  email: string;
  password: string;
};

type SendPasswordRecoveryProps = {
  email: string;
  url: string;
};
type ConfirmPasswordRecoveryProps = {
  secret: string;
  userId: string;
  password: string;
};

type AuthSlice = {
  user: Models.User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean;
  login: (value: LoginProps) => Promise<void>;
  signUp: (value: SignupProps) => Promise<void>;
  logout: () => Promise<void>;
  sendPasswordRecovery: (value: SendPasswordRecoveryProps) => Promise<void>;
  ConfirmPasswordRecovery: (
    value: ConfirmPasswordRecoveryProps
  ) => Promise<void>;
};

const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  user: null,
  profile: null,
  isAuthenticated: false,
  _hasHydrated: false,

  signUp: async ({ name, email, password }) => {
    const user = await account.create({
      userId: ID.unique(),
      email,
      password,
      name,
    });

    await account.createEmailPasswordSession({
      email,
      password,
    });

    const profileData = {
      userId: user.$id,
      name: user.name,
      email: user.email,
      joinedAt: user.$createdAt,
    };

    const profile = await tablesdb.createRow({
      databaseId: DB,
      tableId: PROFILE,
      rowId: ID.unique(),
      data: profileData,
    });

    set({
      user,
      profile: {
        id: profile.$id,
        name: profile.name,
        email: profile.email,
        about: profile.about ?? null,
        avatar: profile.avatar ?? null,
        reputation: profile.reputation,
        joinedAt: profile.joinedAt,
      },
      isAuthenticated: true,
    });
  },
  login: async ({ email, password }) => {
    const userSession = await account.createEmailPasswordSession({
      email,
      password,
    });

    const profileResponse = await tablesdb.listRows({
      databaseId: DB,
      tableId: PROFILE,
      queries: [Query.equal("userId", userSession.userId)],
    });

    const profileData = profileResponse.rows[0];
    set({
      profile: {
        id: profileData.$id,
        name: profileData.name,
        email: profileData.email,
        avatar: profileData.avatar || null,
        about: profileData.about || null,
        reputation: profileData.reputation,
        joinedAt: profileData.joinedAt,
      },
      isAuthenticated: true,
    });
  },
  logout: async () => {
    await account.deleteSession({ sessionId: "current" });
    set({
      user: null,
      profile: null,
      isAuthenticated: false,
    });
  },
  sendPasswordRecovery: async ({ email, url }) => {
    await account.createRecovery({
      email,
      url,
    });
  },
  ConfirmPasswordRecovery: async ({ userId, secret, password }) => {
    await account.updateRecovery({
      userId,
      secret,
      password,
    });
  },
});

export { createAuthSlice, type AuthSlice, type Profile };
