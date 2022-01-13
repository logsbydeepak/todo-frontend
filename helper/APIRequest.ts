import { axiosRequest } from "@config/axios";
import { Method } from "axios";
import { AuthContext } from "context/auth.context";
import { Router, useRouter } from "next/router";
import { useContext } from "react";

export const APIRequest = async (
  method: Method,
  url: string,
  changeAuth: any,
  router: any,
  data?: any
) => {
  try {
    const apiRequest = await axiosRequest.request({
      method: method,
      url,
      data,
    });
    return apiRequest.data.data;
  } catch (error: any) {
    console.log(error.response.data);
    if (error.response.data.error.message === "access token expired") {
      try {
        console.log("refresh token");
        console.log(error.response.data);
        await axiosRequest.put("/session/refresh");
        console.log("1");
        APIRequest(method, url, changeAuth, router, data);
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
