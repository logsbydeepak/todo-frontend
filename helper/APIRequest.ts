import { axiosRequest } from "@config/axios";
import { Method } from "axios";
import { AuthContext } from "context/auth.context";
import { Router, useRouter } from "next/router";
import { useContext } from "react";

export const APIRequest = async (method: Method, url: string, data: any) => {
  const router = useRouter();
  const { changeAuth } = useContext(AuthContext);

  try {
    const request = await axiosRequest.request({
      url,
      method,
      data,
    });
  } catch (e: any) {
    changeAuth(false);
    router.push("/");
  }
};
