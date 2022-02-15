import { initialBoolean, initialText } from "lib/data/userPage.data";
import {
  DispatchNotificationType,
  SetAPIRequestDataType,
  SetPageStateType,
  SetUserInputStateType,
  UserInputStateType,
} from "types";
import isStrongPassword from "validator/lib/isStrongPassword";

const setCurrentPasswordError = (
  currentPasswordHelper: string,
  setInputState: SetUserInputStateType
) => {
  setInputState((draft) => {
    draft.isError.currentPassword = true;
    draft.helper.currentPassword = currentPasswordHelper;
  });
};

const setCurrentPasswordErrorAndResetState = (
  action: "logoutAll" | "delete",
  currentPasswordHelper: string,
  setPageState: SetPageStateType,
  setInputState: SetUserInputStateType
) => {
  setPageState((draft) => {
    draft.isDisabled = false;
    if (action === "logoutAll") {
      draft.isLoadingLogoutAllButton = false;
    } else {
      draft.isLoadingDeleteButton = false;
    }
  });
  setInputState((draft) => {
    draft.isError.currentPassword = true;
    draft.helper.currentPassword = currentPasswordHelper;
  });
};

export const handleDeleteAndLogoutAllUser = (
  action: "logoutAll" | "delete",
  setAPIRequestData: SetAPIRequestDataType,
  inputState: UserInputStateType,
  setPageState: SetPageStateType,
  setInputState: SetUserInputStateType,
  changeAuth: (value: boolean) => void,
  dispatchNotification: DispatchNotificationType
) => {
  setInputState((draft) => {
    draft.helper = initialText;
    draft.isError = initialBoolean;
  });

  if (inputState.value.currentPassword.length === 0) {
    setCurrentPasswordError("current password is required", setInputState);
    return;
  }

  if (!isStrongPassword(inputState.value.currentPassword)) {
    setCurrentPasswordError("invalid password", setInputState);
    return;
  }

  setPageState((draft) => {
    if (action === "logoutAll") {
      draft.isLoadingLogoutAllButton = true;
    } else {
      draft.isLoadingDeleteButton = true;
    }
    draft.isDisabled = true;
  });

  setAPIRequestData({
    data: {
      method: "DELETE",
      url: action === "logoutAll" ? "/session/all" : "/user",
      data: {
        currentPassword: inputState.value.currentPassword,
      },
    },
    showErrorDefaultNotification: false,
    response: {
      onSuccess: () => {
        changeAuth(false);
        dispatchNotification({
          type: "SUCCESS",
          message: action === "logoutAll" ? "Logout all" : "User deleted",
        });
      },
      onError: (errorResponse: any) => {
        if (errorResponse.message === "invalid password") {
          setCurrentPasswordErrorAndResetState(
            action,
            "invalid password",
            setPageState,
            setInputState
          );
          return;
        }

        dispatchNotification({
          type: "ERROR",
          message: "Something went wrong",
        });

        setPageState((draft) => {
          draft.isDisabled = false;
          if (action === "logoutAll") {
            draft.isLoadingLogoutAllButton = false;
          } else {
            draft.isLoadingDeleteButton = false;
          }
        });
      },
    },
  });
};
