import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {

    const lsUser = JSON.parse(localStorage.getItem("user"));
    /* const lsName = localStorage.getItem("name");
    const lsEmail = localStorage.getItem("email"); */
    const [user, setUser] = useState(lsUser);
    /* const [name, setName] = useState();
    const [userEmail, setUserEmail] = useState(lsEmail);
    const [token, setToken] = useState(ls); */
    const [type, setType] = useState('');
    const navigate = useNavigate();

    useEffect(() =>{
        if(lsUser === null) {
            alert("Faça login");
            navigate("/");
        } else {
            navigate("/home");
        }
    } ,[])

    return (
        <AuthContext.Provider value={{
            user, setUser,
            type, setType
        }}>
            {children}
        </AuthContext.Provider>
    )
}