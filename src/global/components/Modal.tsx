import { FunctionComponent } from "react";
import { ButtonWithTextAndIcon } from "./Button";
import { PageTitle } from "./PageTitle";
import style from "./styles/modal.module.scss";

interface Props {
  handleOnContinue: () => void;
  handleOnCancel: () => void;
}

export const Modal: FunctionComponent<Props> = ({
  handleOnContinue,
  handleOnCancel,
}) => {
  return (
    <>
      <div className={style.container}>
        <div className={`container`}>
          <div className={style.modal}>
            <PageTitle
              title="Permanently delete account"
              subtitle="Deleting your account will remove all of your information from our database. This cannot be undone. Click cancel button to close the action or click continue to proceed forward"
            />

            <div className={style.button}>
              <ButtonWithTextAndIcon
                icon="close"
                text="Cancel"
                handleOnClick={handleOnCancel}
                isLoading={false}
              />
              <ButtonWithTextAndIcon
                icon="arrow_forward_ios"
                text="Continue"
                handleOnClick={handleOnContinue}
                isLoading={false}
                warning={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
