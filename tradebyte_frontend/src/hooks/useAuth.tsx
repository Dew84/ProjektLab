import {useContext, useEffect} from "react";
import api from "../api/api";
import { tokenKeyName, roleKeyName, usernameKeyName } from "../constants/constants";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";


const useAuth = () => {
    const { token, setToken, username, setUsername, role, setRole  } = useContext(AuthContext);
    const isLoggedIn = !!token;

    const login = (email: string, password: string) => {
        api.Auth.apiAuthLoginPost({loginDto: {email, password}}, undefined).then((res: { data: { token: string | null; }; }) => {
            setToken(res.data.token!);
            localStorage.setItem(tokenKeyName, res.data.token!);
            const decodedToken: never = jwtDecode(res.data.token!);
            const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            const username = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
            setRole(role);
            localStorage.setItem(roleKeyName, role);
            setUsername(username);
            localStorage.setItem(usernameKeyName, username);
        }).catch((reason: { response: { data: { error: string } } }) => alert(reason.response.data.error));
    }

    const register = (name: string, email: string, password: string, roleType: number) => {
        api.Auth.apiAuthRegisterPost({ registerDto: { name, email, password, roleType }}, undefined)
            .then(() => alert("Sikeres regisztráció"))
    };

    const logout = () => {
        localStorage.clear();
        setToken(null);
    }

    useEffect(() => {

    }, []);

    return {login, register, logout, token, username, isLoggedIn, role, setRole};
}

export default useAuth;