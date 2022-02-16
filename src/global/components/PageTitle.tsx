import { FunctionComponent } from "react";

import style from "./styles/pageTitle.module.scss";

interface Props {
  title: string;
  subtitle: string;
}

export const PageTitle: FunctionComponent<Props> = ({ title, subtitle }) => {
  return (
    <div className={style.container}>
      <h1>{title}</h1>
      <h3>{subtitle}</h3>
    </div>
  );
};
