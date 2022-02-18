import { ButtonWithTextAndIcon } from "global/components";
import { useAuthContext, useNotificationContext } from "global/context";
import { useAPICall } from "global/hooks";
import { FunctionComponent } from "react";
import { handleDeleteAndLogoutAllUser } from "UserPage/handler/deleteAndLogoutAll.user";
import {
  PageStateType,
  SetPageStateType,
  SetUserInputStateType,
  UserInputStateType,
} from "UserPage/userPageType";
import style from "./styles/LogoutAllAndDeleteUserButton.module.scss";
import { DeleteConfirmation } from "./DeleteConfirmation";

interface Props {
  inputState: UserInputStateType;
  setInputState: SetUserInputStateType;
  pageState: PageStateType;
  setPageState: SetPageStateType;
}

export const LogoutAllAndDeleteUserButton: FunctionComponent<Props> = ({
  inputState,
  setInputState,
  pageState,
  setPageState,
}) => {
  const [setAPIRequestData] = useAPICall(null);
  const { changeAuth } = useAuthContext();
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
              changeAuth,
              dispatchNotification
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
          warning={true}
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
                changeAuth,
                dispatchNotification
              );
            });
          }}
        />
      )}
    </>
  );
};
