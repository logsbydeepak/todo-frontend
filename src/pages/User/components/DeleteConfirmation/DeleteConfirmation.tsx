import { FunctionComponent } from "react";
import { PageTitle } from "components/PageTitle";
import { ButtonWithTextAndIcon } from "components/Button";
import style from "./DeleteConfirmation.module.scss";

interface Props {
  handleOnContinue: () => void;
  handleOnCancel: () => void;
}

const DeleteConfirmation: FunctionComponent<Props> = ({
  handleOnContinue,
  handleOnCancel,
}) => (
  <div className={style.container}>
    <div className="container">
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
            icon="east"
            text="Continue"
            handleOnClick={handleOnContinue}
            isLoading={false}
            warning
          />
        </div>
      </div>
    </div>
  </div>
);

export default DeleteConfirmation;
