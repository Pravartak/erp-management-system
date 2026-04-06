import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const role = localStorage.getItem("Role");

    if (role !== "admin") {
        return <Navigate to={"/dashboard"} />
    };
    return children;
};

export default AdminRoute;