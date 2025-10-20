import { Models } from "appwrite";
import { account, tablesdb, ID, Query } from "@/appwrite/client.config";
import { StateCreator } from "zustand";
import { DB, PROFILE } from "@/appwrite/names";

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

type Profile = {
  id: string;
  name: string;
  email: string;
  about: string | null;
  avatar: string | null;
  reputation: number;
  joinedAt: string;
};

type Jwt = {
  token: string | null;
  expiry: number;
};

type AuthSlice = {
  user: Models.User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  jwt: Jwt;
  _hasHydrated: boolean;
  login: (value: LoginProps) => Promise<void>;
  signUp: (value: SignupProps) => Promise<void>;
  logout: () => Promise<void>;
  sendPasswordRecovery: (value: SendPasswordRecoveryProps) => Promise<void>;
  ConfirmPasswordRecovery: (
    value: ConfirmPasswordRecoveryProps
  ) => Promise<void>;
  getValidJWT: () => Promise<string>;
};

const createAuthSlice: StateCreator<AuthSlice> = (set, get) => ({
  user: null,
  profile: null,
  isAuthenticated: false,
  jwt: { token: null, expiry: 0 },
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
        joinedAt: profile.$createdAt,
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
        joinedAt: profileData.$createdAt,
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
      jwt: { token: null, expiry: 0 },
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
  getValidJWT: async () => {
    const { token, expiry } = get().jwt;
    const now = Math.floor(Date.now() / 1000);
    if (token && now < expiry - 30) {
      return token;
    }

    const { jwt } = await account.createJWT();
    const decode = JSON.parse(atob(jwt.split(".")[1]));
    set({ jwt: { token: jwt, expiry: decode.exp } });
    return jwt;
  },
});

export { createAuthSlice, type AuthSlice, type Profile };
