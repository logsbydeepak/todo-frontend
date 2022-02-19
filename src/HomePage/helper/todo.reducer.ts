import { TodoActionType, TodoStateType, TodoType } from "HomePage/helper/types";

export const todoReducer = (draft: TodoStateType, action: TodoActionType) => {
  switch (action.type) {
    case "EMPTY_TODO":
      draft.todo = [];
      break;

    case "ADD_TODO_FROM_TOP":
      draft.todo.unshift(action.todo);
      draft.activeMenu =
        draft.activeMenu === "true" ? "false" : draft.activeMenu;
      break;

    case "ADD_TODO_FROM_BOTTOM":
      draft.todo.push(...action.todo);
      draft.showLoadMoreButton = action.todo.length >= 5;
      break;

    case "REMOVE_TODO":
      draft.todo = draft.todo.filter(
        (_: any, index: number) => index !== action.index
      );
      break;

    case "UPDATE_TODO_STATUS":
      if (draft.activeMenu === "all") {
        draft.todo[action.index].status = !draft.todo[action.index].status;
      } else {
        draft.todo = draft.todo.filter(
          (_: TodoType, index: number) => index !== action.index
        );
      }
      break;

    case "UPDATE_TODO_TASK":
      draft.todo[action.index].task = action.task;
      break;

    case "LOADING":
      draft.isLoading = action.isLoading;
      break;

    case "LOAD_MORE":
      draft.isLoadingMore = action.isLoadingMore;
      break;

    case "LOAD_MORE_BUTTON":
      draft.showLoadMoreButton = action.showLoadMoreButton;
      break;

    case "UPDATE_ACTIVE_MENU":
      draft.activeMenu = action.activeMenu;
      break;

    default:
      draft;
      break;
  }
};
