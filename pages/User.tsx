import { GetServerSideProps } from "next";
import UserPage from "UserPage";

const User = () => <UserPage />;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const auth = req.cookies.auth !== "true";

  if (auth) {
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }
  return { props: {} };
};

export default User;
