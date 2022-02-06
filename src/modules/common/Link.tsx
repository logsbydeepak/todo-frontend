import Link from "next/link";
import { ButtonWithSmallIcon } from "./Button";

import style from "styles/modules/common/navbar.module.scss";

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

export const AuthLink = ({ handelLogout }: { handelLogout: any }) => (
  <>
    <ButtonWithSmallIcon
      icon="manage_accounts"
      isLoading={false}
      handleOnClick={() => {}}
      className={style.button}
    />
    <ButtonWithSmallIcon
      icon="logout"
      isLoading={false}
      handleOnClick={handelLogout}
      className={style.button}
    />
  </>
);
