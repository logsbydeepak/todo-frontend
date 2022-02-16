import { Dispatch, SetStateAction } from "react";

export interface InputStateType {
  textInput: string;
  isLoading: boolean;
  isError: boolean;
}

export type SetInputStateType = Dispatch<
  SetStateAction<{
    textInput: string;
    isLoading: boolean;
    isError: boolean;
  }>
>;
