import React, { ChangeEvent, FunctionComponent, useState } from "react";
import style from "styles/module/components/taskInput.module.scss";
import Spinner from "components/Spinner";

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

  const handleInputReset = () => {
    setLocalTask(task);
    setTick(false);
  };

  return (
    <>
      <form className={`${style.taskForm} ${focus && style.taskForm__focus}`}>
        <div className={style.taskForm__button}>
          {loading.status && <Spinner className={style.taskForm__spinner} />}
          {!loading.status && (
            <input
              type="checkbox"
              checked={status}
              onChange={() => {
                setLoading({ ...loading, status: true });
                handleChangeStatus(index, loading, setLoading);
              }}
              className={style.taskForm__checkbox}
            />
          )}
        </div>

        <input
          className={style.taskForm__taskInput}
          type="text"
          value={localTask}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        {tick && (
          <button
            className={style.taskForm__button}
            onClick={(e: any) => {
              setLoading({ ...loading, task: true });
              handleChangeTask(e, index, loading, setLoading, setTick);
            }}
          >
            {!loading.task && tick && (
              <i
                className={`icon ${style.taskForm__icon} ${style.taskForm__icon__done}`}
              >
                done_all
              </i>
            )}
            {loading.task && <Spinner className={style.taskForm__spinner} />}
          </button>
        )}

        {tick && (
          <button className={style.taskForm__button} onClick={handleInputReset}>
            {!loading.task && tick && (
              <i
                className={`icon ${style.taskForm__icon} ${style.taskForm__icon__reset}`}
              >
                settings_backup_restore
              </i>
            )}
          </button>
        )}

        <button
          className={style.taskForm__button}
          onClick={(e: any) => {
            setLoading({ ...loading, delete: true });
            handleRemoveTask(e, index, loading, setLoading);
          }}
        >
          {!loading.delete && (
            <i
              className={`icon ${style.taskForm__icon} ${style.taskForm__icon__delete}`}
            >
              delete_outline
            </i>
          )}
          {loading.delete && <Spinner className={style.taskForm__spinner} />}
        </button>
      </form>
    </>
  );
};

export default TaskInput;