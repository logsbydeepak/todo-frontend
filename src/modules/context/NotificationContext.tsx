import {
  createContext,
  FunctionComponent,
  useContext,
  useReducer,
} from "react";

import NotificationItem from "modules/common/NotificationItem";
import { notificationReducer } from "reducer/notificationReducer";

import style from "styles/module/components/notification.module.scss";

import {
  NotificationContextType,
  NotificationStateType,
} from "types/notificationContextType";

export const NotificationContext = createContext<NotificationContextType>(null);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === null) {
    throw new Error("out of context");
  }

  return context;
};

const initialNotificationState: NotificationStateType = [];

const NotificationProvider: FunctionComponent = ({ children }) => {
  const [state, dispatchNotification] = useReducer(
    notificationReducer,
    initialNotificationState
  );

  return (
    <>
      <NotificationContext.Provider value={{ dispatchNotification }}>
        <div className={style.base}>
          {state.map((data: any) => (
            <NotificationItem
              key={data.id}
              dispatchNotification={dispatchNotification}
              notification={data}
            />
          ))}
        </div>
        {children}
      </NotificationContext.Provider>
    </>
  );
};

export default NotificationProvider;
