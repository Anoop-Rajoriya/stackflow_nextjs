export interface User {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  email: string;
  emailVerification: boolean;
  phone: string;
  phoneVerification: boolean;
  prefs: Record<string, any>;
}

export interface UserProfile {
  $id?: string;
  userId: string;
  fullName: string;
  bio?: string;
  avatar?: string;
  email: string;
  $createdAt?: string;
  $updatedAt?: string;
}

export interface AuthState {
  user: User | null;
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
