import { useEffect, useState } from "react";

import { AxiosResponse } from "axios";
import { useRouter } from "next/router";

import { axiosRequest } from "helper";
import { useAuthContext } from "context/AuthContext";
import { APIRequestDataType } from "./types.hooks";

const useAPICall = () => {
  const { isAuth, setIsAuth } = useAuthContext();
  const router = useRouter();
  const [APIRequestData, setAPIRequestData] =
    useState<APIRequestDataType>(null);

  useEffect(() => {
    if (!APIRequestData) return;
    if (!isAuth) return;

    const { method, url, body } = APIRequestData.request;
    const { onSuccess, onError } = APIRequestData;

    const fetch = async () => {
      axiosRequest({
        url,
        method,
        data: body,
      })
        .then((successResponse: AxiosResponse<any>) => {
          onSuccess(successResponse.data?.data);
        })
        .catch((errorResponse) => {
          if (
            errorResponse.response.data.error.title === "BODY_PARSE" ||
            errorResponse.response.data.error.title === "QUERY_PARSE"
          ) {
            onError(errorResponse.response.data?.error);
            return;
          }

          if (
            errorResponse.response.data.error.message === "access token expired"
          ) {
            axiosRequest({
              url: "/session/refresh",
              method: "PUT",
            })
              .then(() => {
                setIsAuth(true);
                axiosRequest({
                  url,
                  method,
                  data: body,
                }).then((successResponse) => {
                  onSuccess(successResponse.data.data);
                });
              })
              .catch((_errorResponse) => {
                if (
                  _errorResponse.response.data.error.message ===
                  "access token is not expired"
                ) {
                  axiosRequest({
                    url,
                    method,
                    data: body,
                  }).then((successResponse) => {
                    onSuccess(successResponse.data.data);
                  });
                }
              });
            return;
          }

          setIsAuth(false);
          router.push("/");
        });
    };
    fetch();
    // eslint-disable-next-line consistent-return
    return () => {
      setAPIRequestData(null);
    };
  }, [APIRequestData, router, setIsAuth, isAuth]);

  return [setAPIRequestData];
};

export default useAPICall;
