import { axiosRequest } from "helper/axios";
import { Method } from "axios";
import { NextRouter } from "next/router";
import { Dispatch } from "react";
import { NotificationActionType } from "types/notificationContextType";

const serverRequest = async (method: Method, url: string, data?: any) => {
  return await axiosRequest.request({
    method: method,
    url,
    data,
  });
};

const removeAuth = (
  changeAuth: (value: boolean) => void,
  router: NextRouter,
  dispatchNotification: Dispatch<NotificationActionType>
) => {
  changeAuth(false);
  router.push("/");
  dispatchNotification({
    type: "ERROR",
    message: "Logging user out",
  });
};

export const APIRequest = async (
  method: Method,
  url: string,
  changeAuth: (value: boolean) => void,
  router: NextRouter,
  dispatchNotification: Dispatch<NotificationActionType>,
  data?: any
) => {
  try {
    const request: any = await serverRequest(method, url, data);
    return request.data.data;
  } catch (error: any) {
    if (
      error.response.data.error.messageType === "BODY_PARSE" ||
      error.response.data.error.messageType === "QUERY_PARSE"
    ) {
      dispatchNotification({
        type: "ERROR",
        message: "Something went wrong in request",
      });
      return "ERROR";
    }

    if (error.response.data.error.message === "access token expired") {
      await axiosRequest.put("/session/refresh");
      const request = await serverRequest(method, url, data);
      return request.data.data;
    }
    if (error.response.data.error.message === "access token is not expired") {
      const request = await serverRequest(method, url, data);
      return request.data.data;
    }

    changeAuth(false);
    router.push("/");
    dispatchNotification({
      type: "ERROR",
      message: "Logging user out",
    });
    return null;
  }
};
