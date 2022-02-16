import { AxiosResponse } from "axios";
import { useAuthContext, useNotificationContext } from "global/context";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { APIRequestDataType } from "global/hooks";
import { axiosRequest } from "global/helper";

export const useAPICall = (requestData: APIRequestDataType) => {
  const { dispatchNotification } = useNotificationContext();
  const { changeAuth } = useAuthContext();

  const router = useRouter();
  const [APIRequestData, setAPIRequestData] =
    useState<APIRequestDataType>(requestData);

  useEffect(() => {
    if (!APIRequestData) return;
    const { method, url, body } = APIRequestData.request;
    const { onSuccess, onError } = APIRequestData;
    const showDefaultErrorNotification =
      typeof APIRequestData.showDefaultErrorNotification === "boolean"
        ? APIRequestData.showDefaultErrorNotification
        : true;

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
            console.log(showDefaultErrorNotification);
            if (showDefaultErrorNotification) {
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
