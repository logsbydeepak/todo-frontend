import {
  createContext,
  FunctionComponent,
  useContext,
  useReducer,
} from "react";

import { NotificationItem } from "global/components";
import { notificationReducer } from "global/reducer";

import style from "global/components/styles/notification.module.scss";

import { NotificationContextType, NotificationStateType } from ".";

export const NotificationContext = createContext<NotificationContextType>(null);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === null) {
    throw new Error("out of context");
  }

  return context;
};

const initialNotificationState: NotificationStateType = [];

export const NotificationProvider: FunctionComponent = ({ children }) => {
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
