import { TodoActionType, TodoStateType } from "types/todoReducerType";

export const todoReducer = (
  state: TodoStateType,
  action: TodoActionType
): TodoStateType => {
  switch (action.type) {
    case "EMPTY_TODO":
      return {
        ...state,
        todo: [],
      };

    case "ADD_TODO_FROM_TOP":
      return {
        ...state,
        todo: [action.todo, ...state.todo],
        activeMenu: state.activeMenu === "true" ? "false" : state.activeMenu,
      };

    case "ADD_TODO_FROM_BOTTOM":
      return {
        ...state,
        todo: [...state.todo, ...action.todo],
        showLoadMoreButton: action.todo.length >= 5,
      };

    case "REMOVE_TODO":
      const removeTodo = state.todo;
      removeTodo.splice(action.index, 1);
      return { ...state, todo: [...removeTodo] };

    case "UPDATE_TODO_STATUS":
      const cloneTodo = { ...state };

      switch (state.activeMenu) {
        case "all":
          cloneTodo.todo[action.index].status =
            !state.todo[action.index].status;
          return { ...cloneTodo };

        default:
          const filterTodo = state.todo.filter(
            (_: any, index: number) => index !== action.index
          );
          return {
            ...cloneTodo,
            todo: [...filterTodo],
          };
      }

    case "UPDATE_TODO_TASK":
      const updateStatusTodo = state.todo;
      updateStatusTodo[action.index].task = action.task;
      return { ...state, todo: [...updateStatusTodo] };

    case "LOADING":
      return { ...state, isLoading: action.isLoading };

    case "LOAD_MORE":
      return { ...state, isLoadingMore: action.isLoadingMore };

    case "LOAD_MORE_BUTTON":
      return { ...state, showLoadMoreButton: action.showLoadMoreButton };

    case "UPDATE_ACTIVE_MENU":
      return { ...state, activeMenu: action.activeMenu };

    default:
      return state;
  }
};
