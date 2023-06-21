"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AppContext } from "../components/AuthProvider/AuthProvider";
import { useContext } from "react";
import styles from './Dashboard.module.css'
const Dashboard = () => {
  const { authState, logoutUser } = useContext(AppContext);
 
  let router = useRouter();
  if (!authState.token) {
    router?.push("/dashboard/login");
  }
  console.log(authState.token);
  return <div className={styles.dashboard}>
    <h1>Welcome</h1>
    <p>No data available</p>
  </div>
};

export default Dashboard;
