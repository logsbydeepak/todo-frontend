import React, { FunctionComponent, useState } from "react";
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
  const [focus, setFocus] = useState(false);
  const [tick, setTick] = useState(false);
  return (
    <>
      <div className={`${style.base} ${focus && style.baseFocus}`}>
        <input
          type="checkbox"
          checked={status}
          onChange={() => handleChangeStatus(index)}
          className={style.status}
        />
        <input
          type="text"
          value={task}
          onChange={(e: any) => {
            handleInputChange(e, index);
            setTick(true);
          }}
          className={style.task}
          onFocus={() => setFocus(!focus)}
          onBlur={() => setFocus(!focus)}
        />
        {tick && (
          <button className={style.done}>
            <i className="icon">done_all</i>
          </button>
        )}
        <button
          className={style.close}
          onClick={(e: any) => handleRemoveTask(e, index)}
        >
          <i className="icon">delete_outline</i>
        </button>
      </div>
    </>
  );
};

export default TaskInput;
