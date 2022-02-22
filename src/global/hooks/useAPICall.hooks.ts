import { useEffect, useState } from "react";

import { AxiosResponse } from "axios";
import { useRouter } from "next/router";

import { APIRequestDataType } from "global/hooks";
import { axiosRequest } from "global/helper";

const deleteCookie = (name: string) => {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

export const useAPICall = () => {
  const router = useRouter();
  const [APIRequestData, setAPIRequestData] =
    useState<APIRequestDataType>(null);

  useEffect(() => {
    if (!APIRequestData) return;
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
          return;
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
              .then((successResponse) => {
                axiosRequest({
                  url,
                  method,
                  data: body,
                }).then((successResponse) => {
                  onSuccess(successResponse.data.data);
                  return;
                });
              })
              .catch((errorResponse) => {
                if (
                  errorResponse.response.data.error.message ===
                  "access token is not expired"
                ) {
                  axiosRequest({
                    url,
                    method,
                    data: body,
                  }).then((successResponse) => {
                    onSuccess(successResponse.data.data);
                    return;
                  });
                }
              });
            return;
          }

          deleteCookie("auth");
          router.push("/");
        });
    };

    fetch();
  }, [APIRequestData]);

  return [setAPIRequestData];
};
