import { FunctionComponent } from "react";
import style from "styles/module/components/taskInput.module.scss";

interface Props {
  status: boolean;
  task: string;
  edit: boolean;
  handleChangeStatus: any;
  onEditHandle: any;
  handleInputChange: any;
}

const TaskInput: FunctionComponent<Props> = ({
  status,
  task,
  edit,
  handleChangeStatus,
  onEditHandle,
  handleInputChange,
}) => {
  return (
    <>
      <div className={style.base}>
        <input
          type="text"
          value={task}
          disabled={!edit}
          autoFocus={!edit}
          onChange={handleInputChange}
        />
        <div className={style.button}>
          <div className={style.status}>
            <button className={style.completed} onClick={handleChangeStatus}>
              <i className="icon">
                {!status ? "radio_button_checked" : "radio_button_unchecked"}
              </i>
            </button>
            <button className={style.incomplete} onClick={handleChangeStatus}>
              <i className="icon">
                {status ? "radio_button_checked" : "radio_button_unchecked"}
              </i>
            </button>
          </div>
          <div className={style.group}>
            <button className={style.edit} onClick={onEditHandle}>
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
