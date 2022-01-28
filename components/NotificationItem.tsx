import { FunctionComponent, useEffect, useState } from "react";
import style from "styles/module/components/notificationItem.module.scss";

const NotificationItem: FunctionComponent<{
  dispatchNotification: any;
  notification: any;
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
        id: notification.id,
      });
    }
  }, [timeFrame]);

  return (
    <>
      <div className={`${style.base} ${style[notification.status]}`}>
        <p>{notification.text}</p>
        <div className={style.bar} style={{ width: `${timeFrame}%` }}></div>
      </div>
    </>
  );
};

export default NotificationItem;
