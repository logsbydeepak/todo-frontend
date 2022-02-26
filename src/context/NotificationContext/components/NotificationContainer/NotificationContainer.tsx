import { FunctionComponent } from "react";
import style from "./NotificationContainer.module.scss";

export const NotificationContainer: FunctionComponent = ({ children }) => (
  <div className={style.container}>{children}</div>
);
