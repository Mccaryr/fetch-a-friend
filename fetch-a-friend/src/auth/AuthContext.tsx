import React, {createContext, useContext, useState} from "react";
import axios from "axios";



const AuthContext = createContext({user: null, login: (user: any) => {}, logout: () => {}, loggedIn: false});

type AuthProviderProps = {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const apiURL = "https://frontend-take-home-service.fetch.com"


    const login = async (user: any) => {
        try {
            const response = await axios.post(`${apiURL}/auth/login`, user)
            console.log("Login Response: ", response)
            setUser(user);
            setLoggedIn(true);
        } catch (e) {
            console.error(e);
        }

    }

    const logout = async () => {
        try {
            const response = await axios.post(`${apiURL}/auth/logout`, {}, {withCredentials: true})
            console.log("Logout Response: ", response)

            setUser(null);
            setLoggedIn(false);
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
