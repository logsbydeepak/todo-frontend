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
  const [loading, setLoading] = useState({
    status: false,
    task: false,
    delete: false,
  });

  return (
    <>
      <div className={`${style.base} ${focus && style.baseFocus}`}>
        <div className={style.boxDiv}>
          {loading.status && <div className={style.spinner}></div>}
          {!loading.status && (
            <input
              type="checkbox"
              checked={status}
              onChange={() => {
                setLoading({ ...loading, status: true });
                handleChangeStatus(index, loading, setLoading);
              }}
              className={style.status}
            />
          )}
        </div>
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
          <div className={style.boxDiv}>
            <button className={style.done}>
              {!loading.task && <i className="icon">done_all</i>}
              {loading.task && <div className={style.spinner}></div>}
            </button>
          </div>
        )}
        <div className={`${style.boxDiv} ${style.left} `}>
          <button
            className={style.close}
            onClick={(e: any) => {
              handleRemoveTask(e, index, loading, setLoading);
              setLoading({ ...loading, delete: true });
            }}
          >
            {!loading.delete && <i className="icon">delete_outline</i>}
            {loading.delete && <div className={style.spinner}></div>}
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskInput;
