import { FunctionComponent } from "react";
import style from "styles/module/components/taskInput.module.scss";

interface Props {
  status: boolean;
  task: string;
  edit: boolean;
}

const TaskInput: FunctionComponent<Props> = ({ status, task, edit }) => {
  return (
    <>
      <div className={style.base}>
        <input type="text" value={task} disabled={!edit} />
        <div className={style.button}>
          <div className={style.status}>
            <button className={style.completed}>
              <i className="icon">
                {!status ? "radio_button_checked" : "radio_button_unchecked"}
              </i>
            </button>
            <button className={style.incomplete}>
              <i className="icon">
                {status ? "radio_button_checked" : "radio_button_unchecked"}
              </i>
            </button>
          </div>
          <div className={style.group}>
            <button className={style.edit}>
              <i className="icon">{edit ? "done_all" : "edit"}</i>
            </button>
            <button className={style.close}>
              <i className="icon">close</i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskInput;
