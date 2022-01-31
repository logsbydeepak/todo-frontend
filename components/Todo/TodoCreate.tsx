import { FunctionComponent, useState } from "react";
import style from "styles/module/components/createTaskInput.module.scss";
import inputStyle from "styles/module/components/input.module.scss";
import buttonStyle from "styles/module/components/button.module.scss";
import Spinner from "components/Spinner";

interface Props {
  handleAddTask: any;
}

const TodoCreate: FunctionComponent<Props> = ({ handleAddTask }) => {
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [helper, setHelper] = useState("");
  const [isError, setError] = useState(false);
  return (
    <>
      <form className={`${style.base} ${isError && inputStyle.error}`}>
        <div>
          <input
            type="text"
            className={`${style.input} ${inputStyle.input}`}
            placeholder="Add new task"
            autoFocus={true}
            disabled={loading}
            value={task}
            onChange={(e: any) => {
              setTask(e.target.value);
            }}
          />

          <button
            className={`${buttonStyle.base} ${buttonStyle.icon} ${
              isError ? buttonStyle.warning : buttonStyle.primary
            } ${style.button}`}
            disabled={loading}
            onClick={(e: any) => {
              handleAddTask(
                e,
                task,
                setTask,
                loading,
                setLoading,
                setHelper,
                setError,
                setLoading
              );
            }}
          >
            {!loading && <i className="icon">arrow_forward_ios</i>}
            {loading && <Spinner className={style.spinner} />}
          </button>
        </div>
        <p className={`${inputStyle.helper}`}>
          {isError && "Task can't be empty"}
        </p>
      </form>
    </>
  );
};

export default TodoCreate;