import { Dispatch, SetStateAction } from "react";
import { SetAPIRequestDataType } from "./hooks.types";
import { TodoActionType, TodoType } from "./todoReducerType";

export interface TodoItemPropsType {
  index: number;
  dispatchTodoAction: Dispatch<TodoActionType>;
  todoItem: TodoType;
  setAPIRequestData: SetAPIRequestDataType;
}

export type SetLoadingIconType = Dispatch<
  SetStateAction<{
    status: boolean;
    task: boolean;
    delete: boolean;
  }>
>;
