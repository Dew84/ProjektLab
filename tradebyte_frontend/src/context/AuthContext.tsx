import { createContext } from "react";
import {roleKeyName, tokenKeyName, usernameKeyName} from "../constants/constants";


interface AuthContext {
    token: string | null;
    setToken: (token: string | null) => void;
    username: string | null;
    setUsername: (username: string | null) => void;
    role: string | null;
    setRole: (role: string) => void;
}

export const AuthContext = createContext<AuthContext>({
    token: localStorage.getItem(tokenKeyName),
    setToken: () => {},
    username: localStorage.getItem(usernameKeyName),
    setUsername: () => {},
    role: localStorage.getItem(roleKeyName),
    setRole: () => {},
});