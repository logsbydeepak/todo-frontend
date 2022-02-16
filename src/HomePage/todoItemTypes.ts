import { Dispatch, SetStateAction } from "react";
import { SetAPIRequestDataType } from "global/hooks";
import { TodoActionType, TodoType } from "global/reducer";

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

export type SetIsDisabled = Dispatch<SetStateAction<boolean>>;
