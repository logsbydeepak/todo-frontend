import { Dispatch } from "react";

export type NotificationDraftType = {
  id: string;
  message: string;
  status: string;
}[];

export type NotificationActionType =
  | { type: "ERROR" | "SUCCESS"; message: string }
  | { type: "REMOVE"; id: string };

export type NotificationContextType = {
  dispatchNotification: Dispatch<NotificationActionType>;
} | null;

export type DispatchNotificationType = Dispatch<NotificationActionType>;
