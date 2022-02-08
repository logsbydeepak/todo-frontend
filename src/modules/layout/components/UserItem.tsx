import { ButtonWithSmallIcon } from "modules/common/Button";
import { ChangeEvent, FunctionComponent, useState } from "react";

import style from "styles/modules/layout/components/userItem.layout.component.module.scss";

interface Props {
  value: string;
  placeHolder: string;
  type: string;
  showButton?: boolean;
  helper: string;
  isError: boolean;
  isLoading: boolean;
}

const UserItem: FunctionComponent<Props> = ({
  value,
  placeHolder,
  type,
  showButton = true,
  helper,
  isError,
  isLoading,
}) => {
  const [tick, setTick] = useState(false);
  const [focus, setFocus] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalValue(event.target.value);
    setTick(true);
  };

  const handleInputFocus = () => {
    setFocus(!focus);
  };

  const handleReset = () => {
    setLocalValue(value);
    setTick(false);
  };

  return (
    <>
      <div className={`${style.container} ${isError && style.error}`}>
        <form className={`${style.userForm} ${focus && style.userForm__focus}`}>
          <input
            type={type}
            className={style.userForm__userInput}
            value={localValue}
            onChange={handleChange}
            onFocus={handleInputFocus}
            onBlur={handleInputFocus}
            placeholder={placeHolder}
          />
          {showButton && (
            <>
              {tick && (
                <>
                  <ButtonWithSmallIcon
                    icon="settings_backup_restore"
                    isLoading={false}
                    handleOnClick={handleReset}
                  />

                  <ButtonWithSmallIcon
                    icon="done_all"
                    isLoading={isLoading}
                    handleOnClick={() => {}}
                  />
                </>
              )}
            </>
          )}
        </form>
        <p className={style.helper}>{isError && helper}</p>
      </div>
    </>
  );
};

export default UserItem;
