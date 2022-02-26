import Link from "next/link";
import { ButtonWithIcon } from "components/Button";

import { useState } from "react";
import { useRouter } from "next/router";
import style from "./Link.module.scss";

export const NoAuthLink = () => (
  <ul className={style.NoAuthLink}>
    <Link href="/Login">
      <a>Login</a>
    </Link>

    <Link href="/SignUp">
      <a>SignUp</a>
    </Link>
  </ul>
);

export const AuthLink = ({ handelLogout }: { handelLogout: any }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleOnUserClick = () => {
    router.push("/User");
  };

  return (
    <ul className={style.AuthLink}>
      <ButtonWithIcon
        icon="manage_accounts"
        isLoading={false}
        handleOnClick={handleOnUserClick}
      />
      <ButtonWithIcon
        icon="logout"
        isLoading={isLoading}
        handleOnClick={() => handelLogout(setIsLoading)}
      />
    </ul>
  );
};

export default Link