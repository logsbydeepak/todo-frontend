import { createContext, FunctionComponent, useContext } from "react";

import { NotificationContainer, NotificationItem } from "./components";
import { NotificationContextType, NotificationDraftType } from ".";
import { notificationReducer } from "./notificationReducer";
import { useImmerReducer } from "use-immer";

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
    <>
      <NotificationContext.Provider value={{ dispatchNotification }}>
        <NotificationContainer>
          {state.map((data: any) => (
            <NotificationItem
              key={data.id}
              dispatchNotification={dispatchNotification}
              notification={data}
            />
          ))}
        </NotificationContainer>
        {children}
      </NotificationContext.Provider>
    </>
  );
};
