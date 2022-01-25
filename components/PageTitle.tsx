import { FunctionComponent } from "react";

import pageTitleStyle from "../styles/module/components/pageTitle.module.scss";

type Props = {
  title: string;
  subtitle: string;
};

const PageTitle: FunctionComponent<Props> = ({ title, subtitle }) => {
  return (
    <>
      <div className={pageTitleStyle.base}>
        <h1>{title}</h1>
        <h3>{subtitle}</h3>
      </div>
    </>
  );
};

export default PageTitle;
