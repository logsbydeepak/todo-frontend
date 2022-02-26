import { ButtonWithIcon } from "components/Button";
import { InputWithIcon } from "components/Input";
import { useAPICall } from "global/hooks";
import iconColor from "components/styles/iconColor.module.scss";
import { ChangeEvent, FunctionComponent } from "react";
import {
  PageStateType,
  SetPageStateType,
  SetUserInputStateType,
  UserInputStateType,
} from "UserPage/helper/types";
import { handleUpdateUserInfo } from "./helper/handleUpdateUserInfo";

interface Props {
  inputState: UserInputStateType;
  setInputState: SetUserInputStateType;
  pageState: PageStateType;
  setPageState: SetPageStateType;
  handleInputReset: (input: "name" | "email") => void;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const EmailInput: FunctionComponent<Props> = ({
  inputState,
  setInputState,
  pageState,
  setPageState,
  handleInputChange,
  handleInputReset,
}) => {
  const [setAPIRequestData] = useAPICall();

  return (
    <InputWithIcon
      value={inputState.value.email}
      handleOnChange={handleInputChange}
      helper={inputState.helper.email}
      type="email"
      isError={inputState.isError.email}
      placeholder="Email"
      isDisabled={pageState.isDisabled}
      name="email"
    >
      {inputState.showIcon.email && (
        <div className="right">
          <ButtonWithIcon
            icon="settings_backup_restore"
            isLoading={false}
            handleOnClick={() => handleInputReset("email")}
            isDisabled={pageState.isDisabled}
            className={`${iconColor.green}`}
          />
          <ButtonWithIcon
            icon="done_all"
            isLoading={inputState.isLoading.email}
            handleOnClick={() =>
              handleUpdateUserInfo(
                setAPIRequestData,
                inputState,
                setPageState,
                setInputState,
                "email"
              )
            }
            isDisabled={pageState.isDisabled}
            className={`${iconColor.white}`}
          />
        </div>
      )}
    </InputWithIcon>
  );
};
