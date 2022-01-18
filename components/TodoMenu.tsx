import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import style from "styles/module/components/todoMenu.module.scss";

interface Props {
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
  setSkip: any;
  setTodo: any;
}

const TodoMenu: FunctionComponent<Props> = ({
  active,
  setActive,
  setSkip,
  setTodo,
}) => {
  const onChangeHandler = (e: any) => {
    e.preventDefault();
    if (!e.target.value) return;
    setActive(e.target.value);
    setTodo([]);
    setSkip(0);
  };

  return (
    <>
      <form className={style.base} onClick={onChangeHandler}>
        <button className={`${active === "all" && style.active}`} value="all">
          All
        </button>
        <button
          className={`${style.completed} ${active === "true" && style.active}`}
          value="true"
        >
          <i className="icon">radio_button_checked</i>
          Completed
        </button>
        <button
          className={`${style.incomplete} ${
            active === "false" && style.active
          }`}
          value="false"
        >
          <i className="icon">radio_button_checked</i>
          Incomplete
        </button>
      </form>
    </>
  );
};

export default TodoMenu;
