import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {

    const lsToken = localStorage.getItem("token");
    const lsName = localStorage.getItem("name");
    const lsEmail = localStorage.getItem("email");
    const [name, setName] = useState(lsName);
    const [user, setUser] = useState(lsEmail);
    const [token, setToken] = useState(lsToken);
    const [type, setType] = useState('');
    const navigate = useNavigate();

    console.log(lsToken)
    useEffect(() =>{
        if(lsToken === null) {
            alert("Faça login");
            navigate("/");
        } else {
            navigate("/home");
        }
    } ,[])

    return (
        <AuthContext.Provider value={{
            name, setName,
            user, setUser,
            token, setToken,
            type, setType
        }}>
            {children}
        </AuthContext.Provider>
    )
}