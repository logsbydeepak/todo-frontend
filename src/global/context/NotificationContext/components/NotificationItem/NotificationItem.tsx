import { FunctionComponent, useEffect, useState } from "react";
import { DispatchNotificationType, NotificationType } from "../../types";
import style from "./NotificationItem.module.scss";

export const NotificationItem: FunctionComponent<{
  dispatchNotification: DispatchNotificationType;
  notification: NotificationType;
}> = ({ dispatchNotification, notification }) => {
  const [timeFrame, setTimeFrame] = useState(0);

  useEffect(() => {
    const time = setTimeout(() => {
      if (timeFrame >= 100) return;
      setTimeFrame(timeFrame + 0.5);
    }, 10);
    return () => {
      clearTimeout(time);
    };
  }, [timeFrame]);

  useEffect(() => {
    if (timeFrame >= 100) {
      dispatchNotification({
        type: "REMOVE",
      });
    }
  }, [timeFrame]);

  return (
    <>
      <div className={`${style.base} ${style[notification.status]}`}>
        <p className={style.text}>{notification.message}</p>
        <div className={style.bar} style={{ width: `${timeFrame}%` }}></div>
      </div>
    </>
  );
};
