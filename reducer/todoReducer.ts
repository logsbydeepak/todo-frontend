import { useNotificationContext } from "context/NotificationContext";
import { TodoActionType, TodoStateType } from "types/todoReducerType";

// const { dispatchNotification } = useNotificationContext();

export const todoReducer = (
  state: TodoStateType,
  action: TodoActionType
): TodoStateType => {
  switch (action.type) {
    case "ADD_TODO_FROM_TOP":
      // dispatchNotification({
      //   type: "SUCCESS",
      //   message: "Task added",
      // });

      return {
        ...state,
        todo: [action.todo, ...state.todo],
        activeMenu: state.activeMenu === "true" ? "false" : state.activeMenu,
      };

    case "ADD_TODO_FROM_BOTTOM":
      return {
        ...state,
        todo: [...action.todo, ...state.todo],
      };

    case "REMOVE_TODO":
      // dispatchNotification({
      //   type: "SUCCESS",
      //   message: "Task removed",
      // });

      const removeTodo = state.todo;
      removeTodo.splice(action.index, 1);
      return { ...state, todo: [...removeTodo] };

    case "UPDATE_TODO_TASK":
      // dispatchNotification({ type: "SUCCESS", message: "Task updated" });

      const cloneTodo = state;
      let updateTaskTodo;

      cloneTodo.todo[action.index].status =
        !cloneTodo.todo[action.index].status;

      switch (state.activeMenu) {
        case "all":
          updateTaskTodo = { ...state, todo: [...cloneTodo.todo] };
          break;

        default:
          const filterTodo = state.todo.filter(
            (_: any, index: number) => index !== action.index
          );
          updateTaskTodo = {
            ...state,
            todo: [...filterTodo],
          };
          break;
      }
      return updateTaskTodo;

    case "UPDATE_TODO_STATUS":
      // dispatchNotification({ type: "SUCCESS", message: "Task updated" });

      const updateStatusTodo = state.todo;
      updateStatusTodo[action.index].status = action.status;
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
