import style from "styles/module/components/loading.module.scss";

const Loading = () => {
  return (
    <>
      <div className={style.base}>
        <div className={style.spinner}></div>
      </div>
    </>
  );
};

export default Loading;
