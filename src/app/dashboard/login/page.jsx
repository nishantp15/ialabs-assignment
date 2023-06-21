"use client";

import React, { useContext, useState } from "react";
import loginStyles from "./login.module.css";
import Link from "next/link";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AppContext } from "@/app/components/AuthProvider/AuthProvider";

const Login = () => {
  let initialData = { identifier: "", password: "" };
  let [formData, setFormData] = useState(initialData);
  const { authState, loginUser } = useContext(AppContext);
  let router = useRouter();
  let [token, setToken] = useState("");

  function addFormData(e) {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function getData() {
    let data = await fetch(
      `https://dev-be-startups.ialabs.co.in/api/auth/local`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      }
    );
    return data.json();
  }

  async function submitForm(e) {
    e.preventDefault();
    let { identifier, password } = formData;

    if (identifier !== "" && password !== "") {
      let data = await getData();
      if (data.jwt) {
        alert("login successful");
        loginUser(data.jwt, data.user.firstName);
        if (typeof window !== undefined) {
          localStorage.setItem("userToken", data.jwt);
          localStorage.setItem("userName", data.user.firstName);
        }
        router?.push("/dashboard");
      } else {
        alert(data.error.message);
      }
      console.log(data.user.firstName);
    } else {
      alert("Incomplete details");
    }
  }

  return (
    <div className={loginStyles.loginForm}>
      <form action="">
        <input
          type="text"
          name="identifier"
          value={formData.identifier}
          onChange={addFormData}
          placeholder="Enter email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={addFormData}
          placeholder="Password"
        />
        <input type="submit" onClick={submitForm} value={"Login"} />
      </form>
      <br />
      <p>- OR -</p>
      <br />
      <Link href={"/dashboard/signup"}>Create an account</Link>
    </div>
  );
};

export default Login;
