import { Models } from "appwrite";
import { account, tablesdb, ID } from "@/appwrite/client.config";
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

type AuthSlice = {
  user: Models.User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  login: (value: LoginProps) => Promise<void>;
  signUp: (value: SignupProps) => Promise<void>;
  logout: () => Promise<void>;
};

const createAuthSlice: StateCreator<AuthSlice> = (set, get) => ({
  user: null,
  profile: null,
  isAuthenticated: false,
  signUp: async ({ name, email, password }) => {
    const user = await account.create({
      userId: ID.unique(),
      email,
      password,
      name,
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

    await account.createEmailPasswordSession({
      email,
      password,
    });

    set(() => ({
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
    }));
  },
  login: async ({ email, password }) => {},
  logout: async () => {},
});

export { createAuthSlice, type AuthSlice, type Profile };
