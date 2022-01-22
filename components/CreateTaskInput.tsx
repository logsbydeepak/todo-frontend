import { FunctionComponent, useState } from "react";
import style from "styles/module/components/createTaskInput.module.scss";

interface Props {
  handleAddTask: any;
}

const CreateTaskInput: FunctionComponent<Props> = ({ handleAddTask }) => {
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div className={style.base}>
        <input
          type="text"
          className={style.input}
          placeholder="Add new task"
          autoFocus={true}
          disabled={loading}
          value={task}
          onChange={(e: any) => {
            setTask(e.target.value);
          }}
        />
        <button
          className={style.button}
          disabled={loading}
          onClick={(e: any) => {
            setLoading(true);
            handleAddTask(e, task, setTask, loading, setLoading);
          }}
        >
          {!loading && <i className="icon">arrow_forward_ios</i>}
          {loading && <div className={style.spinner}></div>}
        </button>
      </div>
    </>
  );
};

export default CreateTaskInput;
