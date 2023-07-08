import React, { createContext, useState } from "react";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {

    const [name, setName] = useState('');
    const [token, setToken] = useState('');

    return (
        <AuthContext.Provider value={{ name, setName,
        token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}