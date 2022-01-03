import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

import Navbar from "../components/Navbar";

const links = [
  {
    name: "Login",
    link: "/login",
  },
  {
    name: "Sign Up",
    link: "/signUp",
  },
];

const Home: NextPage = () => {
  return (
    <>
      <Navbar links={links} />
    </>
  );
};

export default Home;
