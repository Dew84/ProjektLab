import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./Routes.tsx";
import BasicLayout from "../components/layout/BasicLayout.tsx";
import type { ReactElement } from "react";

const PrivateRoute = ({ element }: { element: ReactElement }) => {
    const isLoggedIn = true; // ide jön a useAuth() ha kell
    return isLoggedIn ? element : <Navigate to="/login" replace />;
};

const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<BasicLayout />}>
                <Route index element={routes.find(r => r.path === "homepage")?.component} />

                {routes
                    .filter((route) => !route.isPrivate && route.path !== "homepage")
                    .map((route) => (
                        <Route key={route.path} path={route.path} element={route.component} />
                    ))}

                {routes
                    .filter((route) => route.isPrivate)
                    .map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<PrivateRoute element={route.component} />}
                        />
                    ))}

                <Route path="*" element={<Navigate to="/homepage" replace />} />
            </Route>
        </Routes>
    );
};

export default Routing;
