import { FunctionComponent, useEffect, useState } from "react";
import style from "styles/module/components/notificationItem.module.scss";

const NotificationItem: FunctionComponent<{
  notificationMessage: any;
  setNotificationMessage: any;
  data: any;
}> = ({ notificationMessage, setNotificationMessage, data }) => {
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
    if (timeFrame === 100) {
      const newMessage = notificationMessage.filter(
        (mess: any) => mess.id !== data.id
      );
      setNotificationMessage(newMessage);
    }
  }, [timeFrame]);

  return (
    <>
      <div className={`${style.base} ${style[data.status]}`}>
        <h1>{data.text}</h1>
      </div>
    </>
  );
};

export default NotificationItem;
