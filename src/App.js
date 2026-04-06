import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import DashboardPage from "./pages/DashboardPage";
import DirectoryPage from "./pages/DirectoryPage";
import GrnPage from "./pages/GrnPage";
import InvoicesPage from "./pages/InvoicesPage";
import LoginPage from "./pages/LoginPage";
import OrdersPage from "./pages/OrdersPage";
import ProductManagementPage from "./pages/ProductManagementPage";
import RegisterPage from "./pages/RegisterPage";
import UsersPage from "./pages/UsersPage";

function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<ProtectedRoute>
						<Navigate to="/dashboard" replace />
					</ProtectedRoute>
				}
			/>
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route
				path="/dashboard"
				element={
					<ProtectedRoute>
						<DashboardPage />
					</ProtectedRoute>
				}
			/>
			<Route path="/products" element={<ProductManagementPage />} />
			<Route path="/directory" element={<DirectoryPage />} />
			<Route path="/orders" element={<OrdersPage />} />
			<Route path="/grn" element={<GrnPage />} />
			<Route path="/invoices" element={<InvoicesPage />} />
			<Route
				path="/users"
				element={
					<AdminRoute>
						<UsersPage />
					</AdminRoute>
				}
			/>
		</Routes>
	);
}

export default App;
