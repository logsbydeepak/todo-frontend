import {
  createContext,
  Dispatch,
  FunctionComponent,
  useContext,
  useReducer,
} from "react";
import style from "styles/module/components/notification.module.scss";
import NotificationItem from "components/NotificationItem";
import { v4 } from "uuid";

type NotificationState = { id: string; message: string; status: string }[];

type NotificationAction =
  | { type: "ERROR" | "SUCCESS"; message: string }
  | { type: "REMOVE"; id: string };

type NotificationContext = {
  dispatchNotification: Dispatch<NotificationAction>;
} | null;

export const NotificationContext = createContext<NotificationContext>(null);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === null) {
    throw new Error("out of context");
  }

  return context;
};

const notificationReducer = (
  state: NotificationState,
  action: NotificationAction
) => {
  switch (action.type) {
    case "SUCCESS":
      return [
        { id: v4(), status: "SUCCESS", message: action.message },
        ...state,
      ];
    case "ERROR":
      return [{ id: v4(), status: "ERROR", message: action.message }, ...state];

    case "REMOVE":
      return state.filter(
        (notification: { id: string }) => notification.id !== action.id
      );

    default:
      return state;
  }
};

const initialNotificationState: NotificationState = [];

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
