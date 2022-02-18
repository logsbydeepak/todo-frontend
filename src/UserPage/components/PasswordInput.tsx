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
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordInput: FunctionComponent<Props> = ({
  inputState,
  setInputState,
  pageState,
  setPageState,
  handleInputChange,
}) => {
  const [setAPIRequestData] = useAPICall(null);

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
              className={`${iconStyle.icon__done}`}
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
