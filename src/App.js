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
			<Route
				path="/products"
				element={
					<ProtectedRoute>
						<ProductManagementPage />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/directory"
				element={
					<ProtectedRoute>
						<DirectoryPage />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/orders"
				element={
					<ProtectedRoute>
						<OrdersPage />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/grn"
				element={
					<ProtectedRoute>
						<GrnPage />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/invoices"
				element={
					<ProtectedRoute>
						<InvoicesPage />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/users"
				element={
					<ProtectedRoute>
						<AdminRoute>
							<UsersPage />
						</AdminRoute>
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
}

export default App;
