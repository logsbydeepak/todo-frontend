import { ButtonWithIcon, InputWithIcon } from "global/components";
import { useAPICall } from "global/hooks";
import { handleUpdateUserInfo } from "UserPage/handler/update.user.handler";
import iconStyle from "global/components/styles/iconColor.module.scss";
import { ChangeEvent, FunctionComponent } from "react";
import {
  PageStateType,
  SetPageStateType,
  SetUserInputStateType,
  UserInputStateType,
} from "UserPage/userPageType";

interface Props {
  inputState: UserInputStateType;
  setInputState: SetUserInputStateType;
  pageState: PageStateType;
  setPageState: SetPageStateType;
  handleInputReset: (input: "name" | "email") => void;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const NameInput: FunctionComponent<Props> = ({
  inputState,
  setInputState,
  pageState,
  setPageState,
  handleInputChange,
  handleInputReset,
}) => {
  const [setAPIRequestData] = useAPICall(null);

  return (
    <>
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
              className={`${iconStyle.icon__reset}`}
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
              className={`${iconStyle.icon__done}`}
            />
          </div>
        )}
      </InputWithIcon>
    </>
  );
};
