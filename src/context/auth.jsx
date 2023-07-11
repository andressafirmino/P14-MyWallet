import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {

    const lsUser = JSON.parse(localStorage.getItem("user"));    
    const lsToken = localStorage.getItem("token"); 
    const [user, setUser] = useState(lsUser);
    console.log(user);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [type, setType] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    /* useEffect(() =>{
        if(lsUser === null) {
            alert("Faça login");
            navigate("/");
        } else {
            navigate("/home");
        }
    } ,[]) */

    useEffect(() => {
        if (lsToken === null && location.pathname !== "/cadastro") {
            navigate("/");
        } else if (lsToken && location.pathname !== "/cadastro") {
            navigate("/home");
        }
    }, [])
    return (
        <AuthContext.Provider value={{
            user, setUser,
            name, setName,
            email, setEmail,
            token, setToken,
            type, setType
        }}>
            {children}
        </AuthContext.Provider>
    )
}