import React, { FunctionComponent } from "react";
import style from "styles/module/components/taskInput.module.scss";

interface Props {
  status: boolean;
  task: string;
  edit: boolean;
  handleChangeStatus: any;
  onEditHandle: any;
  handleInputChange: any;
  id: any;
}

const TaskInput: FunctionComponent<Props> = ({
  status,
  task,
  edit,
  handleChangeStatus,
  onEditHandle,
  handleInputChange,
  id,
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
          <input
            type="checkbox"
            checked={status}
            onChange={() => handleChangeStatus(id)}
          />
          <button className={style.close}>
            <i className="icon">close</i>
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskInput;
