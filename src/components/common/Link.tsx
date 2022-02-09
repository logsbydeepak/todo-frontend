import Link from "next/link";
import { ButtonWithSmallIcon } from "./Button";

import style from "./styles/navbar.module.scss";
import { useState } from "react";
import Router, { useRouter } from "next/router";

export const NoAuthLink = () => (
  <>
    <li>
      <Link href="/Login">
        <a>Login</a>
      </Link>
    </li>
    <li>
      <Link href="/SignUp">
        <a>SignUp</a>
      </Link>
    </li>
  </>
);

export const AuthLink = ({ handelLogout }: { handelLogout: any }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleOnUserClick = () => {
    router.push("/User");
  };

  return (
    <>
      <ButtonWithSmallIcon
        icon="manage_accounts"
        isLoading={false}
        handleOnClick={handleOnUserClick}
        className={style.button}
      />
      <ButtonWithSmallIcon
        icon="logout"
        isLoading={isLoading}
        handleOnClick={() => handelLogout(setIsLoading)}
        className={style.button}
      />
    </>
  );
};
