import { ButtonWithTextAndIcon } from "components/Button";
import { useNotificationContext } from "context/NotificationContext";
import { useAPICall } from "hooks";
import { FunctionComponent } from "react";
import { useRouter } from "next/router";
import {
  PageStateType,
  SetPageStateType,
  SetUserInputStateType,
  UserInputStateType,
} from "../../helper/types";
import handleDeleteAndLogoutAllUser from "./handleDeleteAndLogoutAll";
import style from "./LogoutAllAndDeleteUserButton.module.scss";
import { DeleteConfirmation } from "../DeleteConfirmation";

interface Props {
  inputState: UserInputStateType;
  setInputState: SetUserInputStateType;
  pageState: PageStateType;
  setPageState: SetPageStateType;
}

const LogoutAllAndDeleteUserButton: FunctionComponent<Props> = ({
  inputState,
  setInputState,
  pageState,
  setPageState,
}) => {
  const router = useRouter();
  const [setAPIRequestData] = useAPICall();
  const { dispatchNotification } = useNotificationContext();

  return (
    <>
      <div className={style.button}>
        <ButtonWithTextAndIcon
          icon="logout"
          text="LOGOUT ALL"
          handleOnClick={() =>
            handleDeleteAndLogoutAllUser(
              "logoutAll",
              setAPIRequestData,
              inputState,
              setPageState,
              setInputState,
              dispatchNotification,
              router
            )
          }
          isLoading={pageState.isLoadingLogoutAllButton}
          isDisabled={pageState.isDisabled}
        />

        <ButtonWithTextAndIcon
          icon="delete_outline"
          text="DELETE ACCOUNT"
          isLoading={pageState.isLoadingDeleteButton}
          handleOnClick={() => {
            setPageState((draft) => {
              draft.showModal = true;
            });
          }}
          warning
          isDisabled={pageState.isDisabled}
        />
      </div>
      {pageState.showModal && (
        <DeleteConfirmation
          handleOnCancel={() => {
            setPageState((draft) => {
              draft.showModal = false;
            });
          }}
          handleOnContinue={() => {
            setPageState((draft) => {
              draft.showModal = false;
              handleDeleteAndLogoutAllUser(
                "delete",
                setAPIRequestData,
                inputState,
                setPageState,
                setInputState,
                dispatchNotification,
                router
              );
            });
          }}
        />
      )}
    </>
  );
};

export default LogoutAllAndDeleteUserButton;
