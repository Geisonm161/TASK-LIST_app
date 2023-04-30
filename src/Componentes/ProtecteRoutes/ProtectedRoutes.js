import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoutes({ user, children, redirecTo }) {

    if (!user) {
        return children ? children : <Navigate to={redirecTo} />;
    }
    return children ? <Navigate to={redirecTo} /> : <Outlet />;

}