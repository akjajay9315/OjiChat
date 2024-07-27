import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { useAsyncValue } from "react-router-dom";
import { auth } from "../firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    const [ currentUser, setCurentUser]=useState({})

    useEffect(()=>{
        const unsub=onAuthStateChanged(auth,(user)=>{
            setCurentUser(user)
            console.log(user);
        });
        return ()=>{
            unsub();
        };
    },[]);

    return(
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    );

};