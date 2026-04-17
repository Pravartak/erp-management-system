import { Navigate } from "react-router-dom";
import { clearAuthStorage, hasValidToken } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
	if (!hasValidToken()) {
		clearAuthStorage();
		return <Navigate to={"/login"} replace />
	}

	return children;
};

export default ProtectedRoute;
