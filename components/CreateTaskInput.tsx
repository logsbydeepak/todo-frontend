import { FunctionComponent } from "react";
import style from "styles/module/components/createTaskInput.module.scss";

interface Props {
  loading: boolean;
}

const CreateTaskInput: FunctionComponent<Props> = ({ loading }) => {
  return (
    <>
      <div className={style.base}>
        <input
          type="text"
          className={style.input}
          placeholder="Add new task"
          autoFocus={true}
          disabled={loading}
        />
        <button className={style.button} disabled={loading}>
          {!loading && <i className="icon">arrow_forward_ios</i>}
          {loading && <div className={style.spinner}></div>}
        </button>
      </div>
    </>
  );
};

export default CreateTaskInput;
