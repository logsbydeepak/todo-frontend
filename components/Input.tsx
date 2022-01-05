import { FunctionComponent } from "react";

import inputStyle from "../styles/layout/input.module.scss";

type Props = {
  name: string;
  placeholder: string;
  type: string;
  autoFocus: boolean;
};

const Input: FunctionComponent<Props> = ({
  name,
  placeholder,
  type,
  autoFocus,
}) => {
  return (
    <>
      <input
        autoFocus={autoFocus}
        className={inputStyle.input}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
      />
    </>
  );
};

export default Input;