import { SetFormStateType } from "./types";

export const setInputEmptyError = (
  input: "email" | "password",
  setFormState: SetFormStateType
) => {
  setFormState((draft) => {
    draft.helper[input] = `${input} is required`;
    draft.isError[input] = true;
    draft.isLoading = false;
  });
};

export const setInputInvalidError = (setFormState: SetFormStateType) => {
  setFormState((draft) => {
    draft.helper = {
      email: "email or password is invalid",
      password: "email or password is invalid",
    };
    draft.isError = { email: true, password: true };
    draft.isLoading = false;
  });
};
