import { v4 } from "uuid";

import { NotificationDraftType, NotificationActionType } from "./types";

const notificationReducer = (
  draft: NotificationDraftType,
  action: NotificationActionType
) => {
  switch (action.type) {
    case "SUCCESS":
      draft.push({
        id: v4(),
        status: "SUCCESS",
        message: action.message,
      });
      return;

    case "ERROR":
      draft.push({
        id: v4(),
        status: "ERROR",
        message: action.message,
      });
      return;

    case "REMOVE":
      draft.shift();
      return;

    default:
      /* eslint @typescript-eslint/no-unused-expressions: "off" */
      draft;
  }
};

export default notificationReducer;
