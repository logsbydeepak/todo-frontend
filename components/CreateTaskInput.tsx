import { FunctionComponent, useState } from "react";
import style from "styles/module/components/createTaskInput.module.scss";
import inputStyle from "styles/module/components/input.module.scss";
import buttonStyle from "styles/module/components/button.module.scss";
import Spinner from "./Spinner";

interface Props {
  handleAddTask: any;
}

const CreateTaskInput: FunctionComponent<Props> = ({ handleAddTask }) => {
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(true);
  return (
    <>
      <div className={style.base}>
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
          className={`${buttonStyle.base} ${buttonStyle.icon} ${buttonStyle.primary} ${style.button}`}
          disabled={loading}
          onClick={(e: any) => {
            setLoading(true);
            handleAddTask(e, task, setTask, loading, setLoading);
          }}
        >
          {!loading && <i className="icon">arrow_forward_ios</i>}
          {loading && <Spinner className={style.spinner} />}
        </button>
      </div>
    </>
  );
};

export default CreateTaskInput;
