import React, {
  ChangeEvent,
  FunctionComponent,
  MouseEvent,
  useState,
} from "react";
import style from "styles/module/components/taskInput.module.scss";
import Spinner from "components/Spinner";

interface Props {
  status: boolean;
  task: string;
  index: number;
  handleChangeStatus: any;
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
  const [loadingIcon, setLoadingIcon] = useState({
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
        <button
          className={style.taskForm__button}
          onClick={(
            event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
          ) => {
            event.preventDefault();
            setLoadingIcon({ ...loadingIcon, status: true });
            handleChangeStatus(index, setLoadingIcon);
          }}
        >
          {!loadingIcon.status && (
            <i
              className={`icon ${style.taskForm__icon} ${style.taskForm__icon__check}`}
            >
              {status ? "check_circle_outline" : "radio_button_unchecked"}
            </i>
          )}
          {loadingIcon.status && (
            <Spinner className={style.taskForm__spinner} />
          )}
        </button>

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
              setLoadingIcon({ ...loadingIcon, task: true });
              handleChangeTask(e, index, loadingIcon, setLoadingIcon, setTick);
            }}
          >
            {!loadingIcon.task && tick && (
              <i
                className={`icon ${style.taskForm__icon} ${style.taskForm__icon__done}`}
              >
                done_all
              </i>
            )}
            {loadingIcon.task && (
              <Spinner className={style.taskForm__spinner} />
            )}
          </button>
        )}

        {tick && (
          <button className={style.taskForm__button} onClick={handleInputReset}>
            {!loadingIcon.task && tick && (
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
          onClick={(
            event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
          ) => {
            event.preventDefault();
            setLoadingIcon({ ...loadingIcon, delete: true });
            handleRemoveTask(index, setLoadingIcon);
          }}
        >
          {!loadingIcon.delete && (
            <i
              className={`icon ${style.taskForm__icon} ${style.taskForm__icon__delete}`}
            >
              delete_outline
            </i>
          )}
          {loadingIcon.delete && (
            <Spinner className={style.taskForm__spinner} />
          )}
        </button>
      </form>
    </>
  );
};

export default TaskInput;
