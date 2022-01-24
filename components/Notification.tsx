import { createContext, FunctionComponent, useReducer, useState } from "react";
import style from "styles/module/components/notification.module.scss";
import NotificationItem from "components/NotificationItem";

export const NotificationContext = createContext<any>(null);

const Notification: FunctionComponent = ({ children }) => {
  const [notificationMessage, setNotificationMessage] = useState([]);

  return (
    <>
      <NotificationContext.Provider
        value={{ notificationMessage, setNotificationMessage }}
      >
        <div className={style.base}>
          {notificationMessage.map((data: any) => (
            <NotificationItem
              key={data.id}
              notificationMessage={notificationMessage}
              setNotificationMessage={setNotificationMessage}
              data={data}
            />
          ))}
        </div>
        {children}
      </NotificationContext.Provider>
    </>
  );
};

export default Notification;
