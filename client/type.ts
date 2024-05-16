export type LoginForm = {
  email: string;
  password: string;
};

export type RegisterForm = {
  username: string;
  email: string;
  password: string;
};
export type UserData = {
  id: number | null;
  username: string | null;
  email: string | null;
};

export type UserCredential = {
  token: string;
  user: UserData;
};

export type BlogData = {
  id: number;
  title: string;
  username: string;
  email: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export type AuthContextType = {
  authState: UserCredential;
  setUserAuthInfo: (data: UserCredential) => void;
  isUserAuthenticated: () => boolean;
};
