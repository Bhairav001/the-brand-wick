import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const nav = useNavigate();

    const users = localStorage.getItem("token")
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const [user, setUser] = useState(users);

    useEffect(()=>{
      if(user){
        setIsLoggedIn(true)
      }else{
        setIsLoggedIn(false)
      }
    },[user]);

    useEffect(()=>{
       if(isLoggedIn){
        nav("/product")
       }else{
        nav("/login")
       }
    },[])

    if(!isLoggedIn){
        return nav("/login")
    }else{
        return <>{children}</>
    }

}

export default PrivateRoute