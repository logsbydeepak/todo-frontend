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
    if (active === e.target.value) return;
    setActive(e.target.value);
    setTodo([]);
    setSkip(0);
  };

  return (
    <>
      <form className={style.base} onClick={onChangeHandler}>
        <button
          className={`${style.incomplete} ${
            active === "false" && style.active
          }`}
          value="false"
        >
          Incomplete
        </button>
        <button
          className={`${style.completed} ${active === "true" && style.active}`}
          value="true"
        >
          Completed
        </button>
        <button className={`${active === "all" && style.active}`} value="all">
          All
        </button>
      </form>
    </>
  );
};

export default TodoMenu;
