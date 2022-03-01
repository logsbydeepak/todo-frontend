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
} from "../../helper/types";
import handleUpdateUserInfo from "./helper/handleUpdateUserInfo";

interface Props {
  inputState: UserInputStateType;
  setInputState: SetUserInputStateType;
  pageState: PageStateType;
  setPageState: SetPageStateType;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: FunctionComponent<Props> = ({
  inputState,
  setInputState,
  pageState,
  setPageState,
  handleInputChange,
}) => {
  const [setAPIRequestData] = useAPICall();

  return (
    <form>
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
              type="submit"
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
    </form>
  );
};

export default PasswordInput;
