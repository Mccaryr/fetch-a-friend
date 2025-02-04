import React, {createContext, useContext, useState} from "react";
import axios from "axios";

type User = {
    name: string;
    email: string;
}

const AuthContext = createContext<{user: User | null, login: (user: User) => void, logout: () => void, loggedIn: boolean}>
({user: null, login: () => {}, logout: () => {}, loggedIn: false});

type AuthProviderProps = {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const apiURL = "https://frontend-take-home-service.fetch.com"


    const login = async (user: any) => {
        try {
            const response = await axios.post(`${apiURL}/auth/login`, user)
            setUser(user);
            setLoggedIn(true);
            return response
        } catch (e) {
            console.error(e);
        }

    }

    const logout = async () => {
        try {
            const response = await axios.post(`${apiURL}/auth/logout`, {}, {withCredentials: true})
            setUser(null);
            setLoggedIn(false);
            return response
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
