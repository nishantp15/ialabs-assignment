"use client";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { AppContext } from "../components/AuthProvider/AuthProvider";
import { useContext } from "react";
import styles from './Dashboard.module.css'
import Pagination from "../components/pagination/Pagination";
const Dashboard = () => {
  const { authState, logoutUser } = useContext(AppContext);
  let [page, setPage] = useState(1);
  let [displayData, setDisplayData] = useState([]);
  let [totalPages, setTotalPages] = useState(5)
  let url = `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/getrestaurants?page=${page}&limit=10`

  const fetchData = useCallback(async ()=>{
    try{
      const res = await fetch(url);
      const data = await res.json();
      setTotalPages(data.totalPages)
      console.log(data)
    }catch(err){
      console.error(err.message);
    }
  },[url])

  useEffect(()=>{
    fetchData();
  },[fetchData])

 
  let router = useRouter();
  if (!authState.token) {
    return <div className={styles.dashboard}><p>Please login first</p></div>
  }

  return <div className={styles.dashboard}>
    <h1>Welcome</h1>
    {/* <p>No data available</p> */}
    <div><Pagination handlePageChange={(page)=>setPage(page)} currentPage={page} totalPages={totalPages}/></div>
  </div>
};

export default Dashboard;
