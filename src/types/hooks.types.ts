import { Method } from "axios";
import { Dispatch, SetStateAction } from "react";

export type APIRequestDataType = {
  request: {
    method: Method;
    url: string;
    body?: any;
  };
  showDefaultErrorNotification?: boolean;
  onSuccess: (successResponse: Object) => void;
  onError: (errorResponse: Object) => void;
} | null;

export type SetAPIRequestDataType = Dispatch<
  SetStateAction<APIRequestDataType>
>;
