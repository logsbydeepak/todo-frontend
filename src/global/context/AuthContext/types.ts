export type AuthContextType = {
  auth: boolean | null;
  changeAuth: (value: boolean) => void;
} | null;

export type ChangeAuthType = (authStatus: boolean) => void;
