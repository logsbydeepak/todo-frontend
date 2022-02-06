import { Dispatch } from "react";

export interface TodoType {
  _id: string;
  task: string;
  status: boolean;
}

export type TodoMenu = "false" | "true" | "all";

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
  | { type: "UPDATE_ACTIVE_MENU"; activeMenu: TodoMenu };

export interface TodoStateType {
  todo: TodoType[];
  activeMenu: TodoMenu;
  isLoading: boolean;
  isLoadingMore: boolean;
  showLoadMoreButton: boolean;
}

export type DispatchTodoActionType = Dispatch<TodoActionType>;
