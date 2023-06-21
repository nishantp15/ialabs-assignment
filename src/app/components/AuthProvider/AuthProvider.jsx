"use client"
import { useState } from "react";
import { createContext } from "react";

export const AppContext = createContext()

function AppContextProvider({children}) {
    const [authState, setAuthState] = useState({
        isAuth:false,
        token: localStorage.getItem("userToken") || null,
        name: localStorage.getItem("userName") || null
        
    })
    const loginUser = (token, name)=>{
       token !== undefined && setAuthState({
            isAuth:true,
            token:token,
            name:name
        })
    }
    const logoutUser=()=>{
            setAuthState({
                isAuth:false,
                token:null
            })
    }
return (<AppContext.Provider value={{authState, loginUser, logoutUser}}>
    {children}
</AppContext.Provider>)
}

export default AppContextProvider;
