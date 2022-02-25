import { createContext, FunctionComponent, useContext } from "react";

import { useImmerReducer } from "use-immer";
import { NotificationContainer, NotificationItem } from "./components";
import {
  NotificationContextType,
  NotificationDraftType,
  NotificationType,
} from ".";
import notificationReducer from "./notificationReducer";

export const NotificationContext = createContext<NotificationContextType>(null);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === null) {
    throw new Error("out of context");
  }

  return context;
};

const initialNotificationState: NotificationDraftType = [];

export const NotificationProvider: FunctionComponent = ({ children }) => {
  const [state, dispatchNotification] = useImmerReducer(
    notificationReducer,
    initialNotificationState
  );

  return (
    <NotificationContext.Provider value={{ dispatchNotification }}>
      <NotificationContainer>
        {state.map((notification: NotificationType) => (
          <NotificationItem
            key={notification.id}
            dispatchNotification={dispatchNotification}
            notification={notification}
          />
        ))}
      </NotificationContainer>
      {children}
    </NotificationContext.Provider>
  );
};
