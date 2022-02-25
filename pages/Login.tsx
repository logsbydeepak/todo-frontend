import LoginPage from "LoginPage";
import { GetServerSideProps } from "next";

function Login() {
  return <LoginPage />;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const auth = req.cookies.auth === "true";

  if (auth) {
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }
  return { props: {} };
};

export default Login;
