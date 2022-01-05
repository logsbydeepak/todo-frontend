import { FunctionComponent } from "react";

import inputStyle from "../styles/layout/input.module.scss";

type Props = {
  name: string;
  placeholder: string;
  type: string;
};

const Input: FunctionComponent<Props> = ({ name, placeholder, type }) => {
  return (
    <>
      <input
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
