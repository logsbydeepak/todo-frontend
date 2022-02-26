import { Updater } from "use-immer";

export type SetFormStateType = Updater<{
  isLoading: boolean;
  isError: {
    email: boolean;
    password: boolean;
  };
  helper: {
    email: string;
    password: string;
  };
  value: {
    email: string;
    password: string;
  };
}>;
