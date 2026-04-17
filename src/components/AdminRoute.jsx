import { Navigate } from "react-router-dom";
import { clearAuthStorage, getStoredRole, hasValidToken } from "../utils/auth";

const AdminRoute = ({ children }) => {
	const role = getStoredRole();

	if (!hasValidToken()) {
		clearAuthStorage();
		return <Navigate to={"/login"} replace />
	}

	if (role !== "admin") {
		return <Navigate to={"/dashboard"} replace />
	}

	return children;
};

export default AdminRoute;
