import { ButtonWithIcon } from "global/components/Button";
import { InputWithIcon } from "global/components/Input";
import { useAPICall } from "global/hooks";
import { handleUpdateUserInfo } from "./helper/handleUpdateUserInfo";
import iconColor from "global/components/styles/iconColor.module.scss";
import { ChangeEvent, FunctionComponent } from "react";
import {
  PageStateType,
  SetPageStateType,
  SetUserInputStateType,
  UserInputStateType,
} from "UserPage/helper/types";

interface Props {
  inputState: UserInputStateType;
  setInputState: SetUserInputStateType;
  pageState: PageStateType;
  setPageState: SetPageStateType;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordInput: FunctionComponent<Props> = ({
  inputState,
  setInputState,
  pageState,
  setPageState,
  handleInputChange,
}) => {
  const [setAPIRequestData] = useAPICall();

  return (
    <>
      <InputWithIcon
        value={inputState.value.password}
        handleOnChange={handleInputChange}
        helper={inputState.helper.password}
        type="password"
        placeholder="Password"
        isDisabled={pageState.isDisabled}
        isError={inputState.isError.password}
        name="password"
      >
        {inputState.showIcon.password && (
          <div className="right">
            <ButtonWithIcon
              icon="done_all"
              isLoading={inputState.isLoading.password}
              isDisabled={pageState.isDisabled}
              className={`${iconColor.white}`}
              handleOnClick={() =>
                handleUpdateUserInfo(
                  setAPIRequestData,
                  inputState,
                  setPageState,
                  setInputState,
                  "password"
                )
              }
            />
          </div>
        )}
      </InputWithIcon>
    </>
  );
};
