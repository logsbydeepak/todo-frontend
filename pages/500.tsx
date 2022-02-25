import { PageTitle } from "global/components/PageTitle";

const Custom404 = () => {
  return (
    <>
      <div className="container__error">
        <PageTitle title="500" subtitle="Server-side error occurred" />
      </div>
    </>
  );
};

export default Custom404;
