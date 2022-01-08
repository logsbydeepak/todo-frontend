import Head from "next/head";
import type { NextPage } from "next";
import PageTitle from "../components/PageTitle";
import Input from "../components/Input";
import { ButtonIcon } from "../components/Button";
import { EventHandler, useState } from "react";
import { useRouter } from "next/router";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

import axios from "@config/axios";

const SignUp: NextPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [helper, setHelper] = useState({
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

    let helperText = { name: "", email: "", password: "" };

    if (formData.name.length === 0) {
      helperText.name = "name is required";
    }

    if (!isEmail(formData.email)) {
      helperText.email = "invalid email";
    }

    if (!isStrongPassword(formData.password)) {
      helperText.password = "invalid password";
    }

    setHelper(helperText);
    // try {
    //   const request = await axios.post("/user", formData, {
    //     withCredentials: true,
    //   });
    //   if (request.data.data.name) {
    //     console.log(request
    // );
    //     router.push("/");
    //   }
    // } catch (e: any) {
    //   console.log(e.response.data);
    // }
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
            label="Name"
            type="text"
            autoFocus={true}
            value={formData.name}
            onChange={formInputHandler}
            helper={helper.name}
            placeholder="Your name"
          />
          <Input
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={formInputHandler}
            helper={helper.email}
            placeholder="example@email.com"
          />
          <Input
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={formInputHandler}
            helper={helper.password}
            placeholder="Minimum 8 character"
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
