import { Method } from "axios";

export type requestDataType = {
  data: {
    method: Method;
    url: string;
    data?: Object;
  };
  response: {
    onSuccess: (value: Object) => void;
    onError: () => void;
  };
} | null;
