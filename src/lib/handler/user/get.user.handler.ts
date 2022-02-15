import { SetPageStateType } from "types/userPageType";
import { SetAPIRequestDataType, SetUserInputStateType } from "types";

export const handleGetUser = (
  setAPIRequestData: SetAPIRequestDataType,
  setPageState: SetPageStateType,
  setInputState: SetUserInputStateType
) => {
  setPageState((draft) => {
    draft.isLoadingUser = true;
  });

  setAPIRequestData({
    data: {
      method: "GET",
      url: "/user",
    },
    response: {
      onSuccess: (successResponse: any) => {
        setPageState((draft) => {
          draft.userInfo.name = successResponse.name;
          draft.userInfo.email = successResponse.email;
          draft.isLoadingUser = false;
        });
        setInputState((draft) => {
          draft.value.name = successResponse.name;
          draft.value.email = successResponse.email;
        });
      },
      onError: () => {},
    },
  });
};
