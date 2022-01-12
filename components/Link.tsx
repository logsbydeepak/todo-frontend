import Link from "next/link";

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

export const AuthLink = ({
  name,
  handelLogout,
}: {
  name: string;
  handelLogout: any;
}) => (
  <>
    <li>
      <Link href="/Profile">
        <a>{name}</a>
      </Link>
    </li>
    <li onClick={handelLogout}>
      <a>Logout</a>
    </li>
  </>
);
