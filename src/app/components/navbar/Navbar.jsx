"use client"
import React, { useState } from 'react'
import navbarStyle from './Navbar.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { AppContext } from '../AuthProvider/AuthProvider'

const Navbar = () => {
  const {authState, logoutUser} = useContext(AppContext)
  // let [token, setToken] = useState(localStorage.getItem("userToken")||"");
  let router = useRouter()
  function logout(){
    logoutUser()
    localStorage.removeItem('userToken',"");
    localStorage.removeItem('userName',"");
    router?.push('/dashboard/login')
  }

  return (
    <div className={navbarStyle.navbar}>
        <Link href={'/dashboard'}>Home</Link>
        {authState.token ? <p>Hi {authState.name}</p>:<Link href={'/dashboard/login'}>Login</Link>}
        {authState.token ? <button onClick={logout}>Logout</button>:<Link href={'/dashboard/signup'}>Signup</Link>}
    </div>
  )
}

export default Navbar