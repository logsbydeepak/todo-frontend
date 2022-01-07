import Head from "next/head";
import type { NextPage } from "next";
import PageTitle from "../components/PageTitle";
import Input from "../components/Input";
import { ButtonIcon } from "../components/Button";
import { EventHandler, useState } from "react";

import axios from "@config/axios";

const SignUp: NextPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const formInputHandler = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const clickHandler = async (e: any) => {
    e.preventDefault();
    const request = axios
      .post("/user", formData)
      .then((response: any) => {
        console.log("then");
        console.log(response.data);
        console.log(response.status);
      })
      .catch((error: any) => {
        console.log("catch");
        console.log(error.response.data);
        console.log(error.response.status);
      });
  };

  return (
    <>
      <Head>
        <title>TODO - SignUp</title>
      </Head>
      <div>
        <PageTitle
          title="Create Account"
          subtitle="Create your account to get started"
        />

        <form>
          <Input
            name="name"
            placeholder="Name"
            type="text"
            autoFocus={true}
            value={formData.name}
            onChange={formInputHandler}
          />
          <Input
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={formInputHandler}
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={formInputHandler}
          />
          <ButtonIcon
            icon="east"
            text="Create your account"
            type="primary"
            clickHandler={clickHandler}
          />
        </form>
      </div>
    </>
  );
};

export default SignUp;
