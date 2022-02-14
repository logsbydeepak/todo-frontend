import { Dispatch, SetStateAction } from "react";
import { Updater } from "use-immer";

export interface InitialBooleanType {
  name: boolean;
  email: boolean;
  password: boolean;
  currentPassword: boolean;
}

export interface InitialTextType {
  name: string;
  email: string;
  password: string;
  currentPassword: string;
}

export interface InitialBooleanWithoutCurrentPassword {
  name: boolean;
  email: boolean;
  password: boolean;
}

export interface InitialTextWithNameAndEmailType {
  name: string;
  email: string;
}

export interface UserInputStateType {
  value: InitialTextType;
  helper: InitialTextType;
  isError: InitialBooleanType;
  isLoading: InitialBooleanType;
  showIcon: InitialBooleanWithoutCurrentPassword;
}

export type SetUserInputStateType = Updater<UserInputStateType>;

export interface PageStateType {
  userInfo: InitialTextWithNameAndEmailType;
  isLoadingUser: boolean;
  isDisabled: boolean;
  showModal: boolean;
  isLoadingLogoutAllButton: boolean;
  isLoadingDeleteButton: boolean;
}

export type SetPageStateType = Updater<PageStateType>;
