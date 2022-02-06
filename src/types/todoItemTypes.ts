import { Dispatch, SetStateAction } from "react";
import { TodoActionType, TodoType } from "./todoReducerType";

export interface TodoItemPropsType {
  index: number;
  dispatchTodoAction: Dispatch<TodoActionType>;
  todoItem: TodoType;
}

export type SetLoadingIconType = Dispatch<
  SetStateAction<{
    status: boolean;
    task: boolean;
    delete: boolean;
  }>
>;
