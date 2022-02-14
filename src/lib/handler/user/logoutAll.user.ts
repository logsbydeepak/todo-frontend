import { initialBoolean, initialText } from "pages/User";
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
  setPageState: SetPageStateType,
  setInputState: SetUserInputStateType
) => {
  setTimeout(() => {
    setPageState((draft) => {
      draft.isLoadingLogoutAllButton = false;
      draft.isDisabled = false;
    });
    setInputState((draft) => {
      draft.isError.currentPassword = true;
      draft.helper.currentPassword = currentPasswordHelper;
    });
  }, 1000);
};

export const logoutAllUser = (
  setAPIRequestData: SetAPIRequestDataType,
  inputState: UserInputStateType,
  setPageState: SetPageStateType,
  setInputState: SetUserInputStateType,
  changeAuth: (value: boolean) => void,
  dispatchNotification: DispatchNotificationType
) => {
  setPageState((draft) => {
    draft.isLoadingLogoutAllButton = true;
    draft.isDisabled = true;
  });

  setInputState((draft) => {
    draft.helper = initialText;
    draft.isError = initialBoolean;
  });

  let currentPasswordHelper: string = "";

  if (inputState.value.currentPassword.length === 0) {
    currentPasswordHelper = "current password is required";
  }

  if (!isStrongPassword(inputState.value.currentPassword)) {
    currentPasswordHelper = "invalid password";
    return;
  }

  if (
    inputState.value.currentPassword.length === 0 ||
    !isStrongPassword(inputState.value.currentPassword)
  ) {
    setCurrentPasswordError(currentPasswordHelper, setPageState, setInputState);
  }

  setAPIRequestData({
    data: {
      method: "DELETE",
      url: "/session/all",
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
          message: "Logout all",
        });
      },
      onError: () => {
        setCurrentPasswordError(
          "invalid password",
          setPageState,
          setInputState
        );
      },
    },
  });
};
