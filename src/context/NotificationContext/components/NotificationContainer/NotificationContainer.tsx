import { FunctionComponent } from "react";
import style from "./NotificationContainer.module.scss";

const NotificationContainer: FunctionComponent = ({ children }) => (
  <div className={style.container}>{children}</div>
);

export default NotificationContainer;
