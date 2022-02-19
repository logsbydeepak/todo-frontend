import { Dispatch } from "react";

export interface NotificationType {
  id: string;
  message: string;
  status: string;
}

export type NotificationDraftType = NotificationType[];

export type NotificationActionType =
  | { type: "ERROR" | "SUCCESS"; message: string }
  | { type: "REMOVE" };

export type NotificationContextType = {
  dispatchNotification: Dispatch<NotificationActionType>;
} | null;

export type DispatchNotificationType = Dispatch<NotificationActionType>;
