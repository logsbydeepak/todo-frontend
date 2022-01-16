import style from "styles/module/components/todoMenu.module.scss";

const TodoMenu = () => {
  return (
    <>
      <div className={style.base}>
        <button className={style.active}>All</button>
        <button className={style.completed}>
          <i className="icon">radio_button_checked</i>
          Completed
        </button>
        <button className={style.incomplete}>
          <i className="icon">radio_button_checked</i>
          Incomplete
        </button>
      </div>
    </>
  );
};

export default TodoMenu;
