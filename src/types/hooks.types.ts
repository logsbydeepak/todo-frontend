import { Method } from "axios";
import { Dispatch, SetStateAction } from "react";

export type APIRequestDataType = {
  data: {
    method: Method;
    url: string;
    data?: Object;
  };
  showErrorDefaultNotification?: boolean;
  response: {
    onSuccess: (value: Object) => void;
    onError: () => void;
  };
} | null;
console.log("hi");

export type SetAPIRequestDataType = Dispatch<
  SetStateAction<APIRequestDataType>
>;
