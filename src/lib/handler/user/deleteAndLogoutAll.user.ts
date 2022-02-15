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
  action: "logoutAll" | "delete",
  currentPasswordHelper: string,
  setPageState: SetPageStateType,
  setInputState: SetUserInputStateType
) => {
  setTimeout(() => {
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
  }, 1000);
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
  setPageState((draft) => {
    if (action === "logoutAll") {
      draft.isLoadingLogoutAllButton = true;
    } else {
      draft.isLoadingDeleteButton = true;
    }
    draft.isDisabled = true;
  });

  setInputState((draft) => {
    draft.helper = initialText;
    draft.isError = initialBoolean;
  });

  if (inputState.value.currentPassword.length === 0) {
    setCurrentPasswordError(
      action,
      "current password is required",
      setPageState,
      setInputState
    );
    return;
  }

  if (!isStrongPassword(inputState.value.currentPassword)) {
    setCurrentPasswordError(
      action,
      "invalid password",
      setPageState,
      setInputState
    );
    return;
  }

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
      onError: (errorResponse: Object) => {
        if (errorResponse === "invalid password") {
          setCurrentPasswordError(
            action,
            "invalid password",
            setPageState,
            setInputState
          );
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
