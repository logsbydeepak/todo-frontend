import { Dispatch, SetStateAction } from "react";
import { SetAPIRequestDataType } from "types";

export const getUser = (
  setAPIRequestData: SetAPIRequestDataType,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setUserInfo: Dispatch<{ name: string; email: string }>,
  userInfo: { name: string; email: string },
  inputValue: {
    name: string;
    email: string;
    password: string;
    currentPassword: string;
  },
  setInputValue: Dispatch<
    SetStateAction<{
      name: string;
      email: string;
      password: string;
      currentPassword: string;
    }>
  >
) => {
  setIsLoading(true);

  setAPIRequestData({
    data: {
      method: "GET",
      url: "/user",
    },
    response: {
      onSuccess: (successResponse: any) => {
        setUserInfo({
          ...userInfo,
          name: successResponse.name,
          email: successResponse.email,
        });
        setInputValue({
          ...inputValue,
          name: successResponse.name,
          email: successResponse.email,
        });
        setIsLoading(false);
      },
      onError: () => {},
    },
  });
};
