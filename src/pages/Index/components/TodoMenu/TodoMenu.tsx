import { ChangeEvent, Dispatch, FunctionComponent } from "react";

import { TodoActionType } from "pages/Index/helper/types";
import style from "./TodoMenu.module.scss";

interface Props {
  dispatchTodoAction: Dispatch<TodoActionType>;
  activeMenu: "true" | "false" | "all";
}

const TodoMenu: FunctionComponent<Props> = ({
  dispatchTodoAction,
  activeMenu,
}) => {
  const handleOnActiveMenuChange = (event: ChangeEvent<HTMLFormElement>) => {
    const currentActiveMenu: string = event.target.value;

    if (
      currentActiveMenu !== "true" &&
      currentActiveMenu !== "false" &&
      currentActiveMenu !== "all"
    )
      return;

    dispatchTodoAction({
      type: "UPDATE_ACTIVE_MENU",
      activeMenu: currentActiveMenu,
    });
  };

  return (
    <form className={style.menu} onChange={handleOnActiveMenuChange}>
      <label
        className={`button ${style.menu_item} ${
          activeMenu === "false" && style.menu_active
        }`}
        htmlFor="false-id"
      >
        Incomplete
        <input type="radio" value="false" name="menu" id="false-id" />
      </label>

      <label
        className={`button ${style.menu_item} ${
          activeMenu === "all" && style.menu_active
        }`}
        htmlFor="all-id"
      >
        All
        <input type="radio" value="all" name="menu" id="all-id" />
      </label>

      <label
        className={`button ${style.menu_item} ${
          activeMenu === "true" && style.menu_active
        }`}
        htmlFor="true-id"
      >
        Completed
        <input type="radio" value="true" name="menu" id="trud-id" />
      </label>
    </form>
  );
};

export default TodoMenu;
