import React, { ChangeEvent, FunctionComponent, useState } from "react";
import style from "styles/module/components/taskInput.module.scss";
import Spinner from "./Spinner";

interface Props {
  status: boolean;
  task: string;
  handleChangeStatus: any;
  index: any;
  handleRemoveTask: any;
  handleChangeTask: any;
}

const TaskInput: FunctionComponent<Props> = ({
  status,
  task,
  handleChangeStatus,
  index,
  handleRemoveTask,
  handleChangeTask,
}) => {
  const [focus, setFocus] = useState(false);
  const [tick, setTick] = useState(false);
  const [loading, setLoading] = useState({
    status: false,
    task: false,
    delete: false,
  });
  const [localTask, setLocalTask] = useState(task);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalTask(event.target.value);
    setTick(true);
  };

  const handleInputFocus = () => {
    setFocus(!focus);
  };

  const handleInputBlur = () => {
    setFocus(!focus);
  };

  return (
    <>
      <form className={`${style.base} ${focus && style.baseFocus}`}>
        <div className={style.boxDiv}>
          {loading.status && <Spinner className={style.spinner} />}
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
          value={localTask}
          onChange={handleInputChange}
          className={style.task}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        {tick && (
          <div className={style.boxDiv}>
            <button
              className={style.done}
              onClick={(e: any) => {
                setLoading({ ...loading, task: true });
                handleChangeTask(e, index, loading, setLoading, setTick);
              }}
            >
              <div className={style.boxDiv}>
                {!loading.task && tick && <i className="icon">done_all</i>}
                {loading.task && <Spinner className={style.spinner} />}
              </div>
            </button>
          </div>
        )}
        <div className={style.left}>
          <button
            className={style.close}
            onClick={(e: any) => {
              setLoading({ ...loading, delete: true });
              handleRemoveTask(e, index, loading, setLoading);
            }}
          >
            <div className={style.boxDiv}>
              {!loading.delete && <i className="icon">delete_outline</i>}
              {loading.delete && <Spinner className={style.spinner} />}
            </div>
          </button>
        </div>
      </form>
    </>
  );
};

export default TaskInput;
