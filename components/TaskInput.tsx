import React, { FunctionComponent } from "react";
import style from "styles/module/components/taskInput.module.scss";

interface Props {
  status: boolean;
  task: string;
  edit: boolean;
  handleChangeStatus: any;
  onEditHandle: any;
  handleInputChange: any;
  index: any;
  handleRemoveTask: any;
}

const TaskInput: FunctionComponent<Props> = ({
  status,
  task,
  edit,
  handleChangeStatus,
  onEditHandle,
  handleInputChange,
  index,
  handleRemoveTask,
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
            onChange={() => handleChangeStatus(index)}
          />
          <button
            className={style.close}
            onClick={(e: any) => handleRemoveTask(e, index)}
          >
            <i className="icon">close</i>
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskInput;
