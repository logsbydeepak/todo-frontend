import { Dispatch, SetStateAction, useState } from "react";
import style from "styles/module/components/todoMenu.module.scss";

interface Props {
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
}

const TodoMenu = ({ active, setActive }) => {
  const onChangeHandler = (e: any) => {
    e.preventDefault();
    setActive(e.target.value);
  };

  return (
    <>
      <form className={style.base} onClick={onChangeHandler}>
        <button className={`${active === "all" && style.active}`} value="all">
          All
        </button>
        <button
          className={`${style.completed} ${
            active === "complete" && style.active
          }`}
          value="complete"
        >
          <i className="icon">radio_button_checked</i>
          Completed
        </button>
        <button
          className={`${style.incomplete} ${
            active === "incomplete" && style.active
          }`}
          value="incomplete"
        >
          <i className="icon">radio_button_checked</i>
          Incomplete
        </button>
      </form>
    </>
  );
};

export default TodoMenu;
