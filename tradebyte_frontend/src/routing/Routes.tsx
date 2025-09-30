import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage.tsx";


export const routes = [
    {
        path: "login",
        component: <LoginPage/>,
        isPrivate: false
    },{
        path: "homepage",
        component: <HomePage/>,
        isPrivate: false
    },
]