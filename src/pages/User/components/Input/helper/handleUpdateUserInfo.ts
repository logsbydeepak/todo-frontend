import { initialBoolean, initialText } from "pages/User/helper/data";
import {
  SetPageStateType,
  SetUserInputStateType,
  UserInputStateType,
} from "pages/User/helper/types";
import { SetAPIRequestDataType } from "hooks";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

const setCurrentPasswordError = (
  currentPasswordHelper: string,
  setPageState: SetPageStateType,
  setInputState: SetUserInputStateType,
  toUpdate: "email" | "password" | "name"
) => {
  setPageState((draft) => {
    draft.isDisabled = false;
  });
  setInputState((draft) => {
    draft.isError.currentPassword = true;
    draft.helper.currentPassword = currentPasswordHelper;
    draft.isLoading[toUpdate] = false;
  });
};

const handleUpdateUserInfo = (
  setAPIRequestData: SetAPIRequestDataType,
  inputState: UserInputStateType,
  setPageState: SetPageStateType,
  setInputState: SetUserInputStateType,
  toUpdate: "email" | "password" | "name"
) => {
  setPageState((draft) => {
    draft.isDisabled = true;
  });

  setInputState((draft) => {
    draft.helper = initialText;
    draft.isError = initialBoolean;
    draft.isLoading[toUpdate] = true;
  });

  if (inputState.value[toUpdate].length === 0) {
    setPageState((draft) => {
      draft.isDisabled = false;
    });
    setInputState((draft) => {
      draft.isError[toUpdate] = true;
      draft.helper[toUpdate] = `${toUpdate} is required`;
      draft.isLoading[toUpdate] = false;
    });
    return;
  }

  if (toUpdate === "password" && !isStrongPassword(inputState.value.password)) {
    setPageState((draft) => {
      draft.isDisabled = false;
    });
    setInputState((draft) => {
      draft.isError.password = true;
      draft.helper.password = "invalid password";
      draft.isLoading.password = false;
    });
    return;
  }

  if (toUpdate === "email" && !isEmail(inputState.value.email)) {
    setPageState((draft) => {
      draft.isDisabled = false;
    });
    setInputState((draft) => {
      draft.isError.email = true;
      draft.helper.email = "invalid email";
      draft.isLoading.email = false;
    });
    return;
  }

  if (inputState.value.currentPassword.length === 0) {
    setCurrentPasswordError(
      "current password is required",
      setPageState,
      setInputState,
      toUpdate
    );
    return;
  }

  if (!isStrongPassword(inputState.value.currentPassword)) {
    setCurrentPasswordError(
      "invalid password",
      setPageState,
      setInputState,
      toUpdate
    );
    return;
  }

  setAPIRequestData({
    request: {
      method: "PUT",
      url: "/user",
      body: {
        toUpdate,
        currentPassword: inputState.value.currentPassword,
        [toUpdate]: inputState.value[toUpdate],
      },
    },

    onSuccess: (successResponse: any) => {
      setInputState((draft) => {
        draft.isLoading[toUpdate] = false;
        draft.value.currentPassword = "";
        draft.showIcon[toUpdate] = false;
        if (toUpdate === "password") {
          draft.value.password = "";
          return;
        }
        draft.value[toUpdate] = successResponse[toUpdate];
      });
      setPageState((draft) => {
        draft.isDisabled = false;
        if (toUpdate === "password") return;
        draft.userInfo[toUpdate] = successResponse[toUpdate];
      });
    },
    onError: () => {
      setCurrentPasswordError(
        "invalid password",
        setPageState,
        setInputState,
        toUpdate
      );
    },
  });
};

export default handleUpdateUserInfo;
