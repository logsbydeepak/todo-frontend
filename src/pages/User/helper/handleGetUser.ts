import { SetAPIRequestDataType } from "hooks";
import { SetPageStateType, SetUserInputStateType } from "./types";

const handleGetUser = (
  setAPIRequestData: SetAPIRequestDataType,
  setPageState: SetPageStateType,
  setInputState: SetUserInputStateType
) => {
  setPageState((draft) => {
    draft.isLoadingUser = true;
  });

  setAPIRequestData({
    request: {
      method: "GET",
      url: "/user",
    },
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
  });
};

export default handleGetUser;
