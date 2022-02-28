import { FunctionComponent } from "react";
import style from "./PageProgress.module.scss";

const PageProgress: FunctionComponent<{ progress: boolean }> = ({
  progress,
}) => (
  <div
    className={style.container}
    style={{
      height: progress ? "100%" : "0",
    }}
  >
    <div
      className={style.progress}
      style={{
        width: progress ? "25%" : "100%",
        opacity: progress ? "1" : "0",
      }}
    />
  </div>
);

export default PageProgress;
