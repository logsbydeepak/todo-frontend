import { FC, useEffect, useState } from "react";
import { DispatchNotificationType, NotificationType } from "../../types";
import style from "./NotificationItem.module.scss";

interface Props {
  dispatchNotification: DispatchNotificationType;
  notification: NotificationType;
}

const NotificationItem: FC<Props> = ({
  dispatchNotification,
  notification,
}) => {
  const [timeFrame, setTimeFrame] = useState(0);

  useEffect(() => {
    const time = setTimeout(() => {
      if (timeFrame >= 105) return;
      setTimeFrame(timeFrame + 0.5);
    }, 10);
    return () => {
      clearTimeout(time);
    };
  }, [timeFrame]);

  useEffect(() => {
    if (timeFrame >= 105) {
      dispatchNotification({
        type: "REMOVE",
      });
    }
  }, [timeFrame, dispatchNotification]);

  return (
    <div className={`${style.base} ${style[notification.status]}`}>
      <p className={style.text}>{notification.message}</p>
      <div
        className={style.bar}
        style={{ width: `${timeFrame <= 100 && timeFrame}%` }}
      />
    </div>
  );
};

export default NotificationItem;
