import { ButtonWithIcon } from "components/Button";
import { InputWithIcon } from "components/Input";
import { useAPICall } from "hooks";
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

const NameInput: FunctionComponent<Props> = ({
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
      value={inputState.value.name}
      handleOnChange={handleInputChange}
      helper={inputState.helper.name}
      type="text"
      placeholder="Name"
      isDisabled={pageState.isDisabled}
      isError={inputState.isError.name}
      name="name"
    >
      {inputState.showIcon.name && (
        <div className="right">
          <ButtonWithIcon
            icon="settings_backup_restore"
            handleOnClick={() => handleInputReset("name")}
            isDisabled={pageState.isDisabled}
            className={`${iconColor.green}`}
          />
          <ButtonWithIcon
            icon="done_all"
            isLoading={inputState.isLoading.name}
            handleOnClick={() =>
              handleUpdateUserInfo(
                setAPIRequestData,
                inputState,
                setPageState,
                setInputState,
                "name"
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

export default NameInput;
