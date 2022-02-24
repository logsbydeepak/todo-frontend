import { useEffect, useState } from "react";

import { AxiosResponse } from "axios";
import { useRouter } from "next/router";

import { APIRequestDataType } from "global/hooks";
import { axiosRequest, clearAuthCookie } from "global/helper";

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
                clearAuthCookie();
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

          clearAuthCookie();
          router.push("/");
        });
    };

    fetch();
  }, [APIRequestData]);

  return [setAPIRequestData];
};
