import { axiosRequest } from "@config/axios";
import { Method } from "axios";

const serverRequest = async (method: Method, url: string, data?: any) => {
  return await axiosRequest.request({
    method: method,
    url,
    data,
  });
};

export const APIRequest = async (
  method: Method,
  url: string,
  changeAuth: any,
  router: any,
  data?: any
) => {
  try {
    const request: any = await serverRequest(method, url, data);
    return request.data.data;
  } catch (error: any) {
    if (error.response.data.error.message === "access token expired") {
      try {
        await axiosRequest.put("/session/refresh");
        const request = await serverRequest(method, url, data);
        return request.data.data;
      } catch (error: any) {
        changeAuth(false);
        router.push("/");
      }
    } else {
      changeAuth(false);
      router.push("/");
    }
  }
};
