import { Dispatch, SetStateAction } from "react";

export interface TodoType {
  _id: string;
  task: string;
  status: boolean;
}

export type TodoMenuType = "false" | "true" | "all";

export type TodoActionType =
  | {
      type: "ADD_TODO_FROM_BOTTOM";
      todo: TodoType[];
    }
  | { type: "ADD_TODO_FROM_TOP"; todo: TodoType }
  | { type: "EMPTY_TODO" }
  | {
      type: "REMOVE_TODO";
      index: number;
    }
  | { type: "UPDATE_TODO_STATUS"; index: number }
  | { type: "UPDATE_TODO_TASK"; index: number; task: string }
  | { type: "LOAD_MORE"; isLoadingMore: boolean }
  | { type: "LOAD_MORE_BUTTON"; showLoadMoreButton: boolean }
  | { type: "LOADING"; isLoading: boolean }
  | { type: "UPDATE_ACTIVE_MENU"; activeMenu: TodoMenuType };

export interface TodoStateType {
  todo: TodoType[];
  activeMenu: TodoMenuType;
  isLoading: boolean;
  isLoadingMore: boolean;
  showLoadMoreButton: boolean;
}

export type DispatchTodoActionType = Dispatch<TodoActionType>;

export type SetLoadingIconType = Dispatch<
  SetStateAction<{
    status: boolean;
    task: boolean;
    delete: boolean;
  }>
>;

export type SetIsDisabled = Dispatch<SetStateAction<boolean>>;

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
