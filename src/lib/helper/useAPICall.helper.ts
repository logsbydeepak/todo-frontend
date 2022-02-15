import { AxiosResponse } from "axios";
import { useAuthContext, useNotificationContext } from "lib/context";
import { apiResolver } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { APIRequestDataType } from "types/hooks.types";
import { axiosRequest } from "./axios.helper";

export const useAPICall = (requestData: APIRequestDataType) => {
  const { dispatchNotification } = useNotificationContext();
  const { changeAuth } = useAuthContext();

  const router = useRouter();
  const [APIRequestData, setAPIRequestData] =
    useState<APIRequestDataType>(requestData);

  useEffect(() => {
    if (!APIRequestData) return;
    const { method, url, data } = APIRequestData.data;
    const { onSuccess, onError } = APIRequestData.response;
    const showErrorDefaultNotification =
      typeof APIRequestData.showErrorDefaultNotification === "boolean"
        ? APIRequestData.showErrorDefaultNotification
        : true;

    const fetch = async () => {
      axiosRequest({
        url,
        method,
        data,
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
            console.log(showErrorDefaultNotification);
            if (showErrorDefaultNotification) {
              dispatchNotification({
                type: "ERROR",
                message: "Something went wrong in request",
              });
            }
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
                  data,
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
                    data,
                  }).then((successResponse) => {
                    onSuccess(successResponse.data.data);
                    return;
                  });
                }
              });
            return;
          }

          changeAuth(false);
          router.push("/");
          dispatchNotification({
            type: "ERROR",
            message: "Logging user out",
          });
        });
    };

    fetch();
  }, [APIRequestData]);

  return [setAPIRequestData];
};
