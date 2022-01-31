import {
  ChangeEvent,
  Dispatch,
  FunctionComponent,
} from "react";
import style from "styles/module/components/todoMenu.module.scss";
import { TodoActionType, TodoStateType } from "types/todoReducerType";

interface Props {
  dispatchTodoAction: Dispatch<TodoActionType>;
  todoState: TodoStateType;
}

const TodoMenu: FunctionComponent<Props> = ({
  dispatchTodoAction,
  todoState,
}) => {
  const handleOnActiveMenuChange = (event: ChangeEvent<HTMLFormElement>) => {
    const activeMenu: string = event.target.value;

    if (activeMenu !== "true" && activeMenu !== "false" && activeMenu !== "all")
      return;

    dispatchTodoAction({
      type: "UPDATE_ACTIVE_MENU",
      activeMenu,
    });
  };

  return (
    <>
      <form className={style.menu} onChange={handleOnActiveMenuChange}>
        <label
          className={`button ${style.menu_item} ${
            todoState.activeMenu === "false" && style.menu_active
          }`}
          htmlFor="false"
        >
          Incomplete
        </label>
        <input type="radio" value="false" name="menu" id="false" />

        <label
          className={`button ${style.menu_item} ${
            todoState.activeMenu === "all" && style.menu_active
          }`}
          htmlFor="all"
        >
          All
        </label>
        <input type="radio" value="all" name="menu" id="all" />

        <label
          className={`button ${style.menu_item} ${
            todoState.activeMenu === "true" && style.menu_active
          }`}
          htmlFor="true"
        >
          Completed
        </label>
        <input type="radio" value="true" name="menu" id="true" />
      </form>
    </>
  );
};

export default TodoMenu;