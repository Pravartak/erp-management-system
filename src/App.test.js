import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

jest.mock("./components/ProtectedRoute", () => ({
	__esModule: true,
	default: ({ children }) => children,
}));

jest.mock("./components/AdminRoute", () => ({
	__esModule: true,
	default: ({ children }) => children,
}));

jest.mock("./pages/DashboardPage", () => ({
	__esModule: true,
	default: () => <div>Dashboard Page</div>,
}));

jest.mock("./pages/DirectoryPage", () => ({
	__esModule: true,
	default: () => <div>Directory Page</div>,
}));

jest.mock("./pages/GrnPage", () => ({
	__esModule: true,
	default: () => <div>GRN Page</div>,
}));

jest.mock("./pages/InvoicesPage", () => ({
	__esModule: true,
	default: () => <div>Invoices Page</div>,
}));

jest.mock("./pages/LoginPage", () => ({
	__esModule: true,
	default: () => <div>Login Page</div>,
}));

jest.mock("./pages/OrdersPage", () => ({
	__esModule: true,
	default: () => <div>Orders Page</div>,
}));

jest.mock("./pages/ProductManagementPage", () => ({
	__esModule: true,
	default: () => <div>Products Page</div>,
}));

jest.mock("./pages/RegisterPage", () => ({
	__esModule: true,
	default: () => <div>Register Page</div>,
}));

jest.mock("./pages/UsersPage", () => ({
	__esModule: true,
	default: () => <div>Users Page</div>,
}));

test("renders the login route", () => {
	render(
		<MemoryRouter initialEntries={["/login"]}>
			<App />
		</MemoryRouter>,
	);

	expect(screen.getByText("Login Page")).toBeInTheDocument();
});

test("renders the products route", () => {
	render(
		<MemoryRouter initialEntries={["/products"]}>
			<App />
		</MemoryRouter>,
	);

	expect(screen.getByText("Products Page")).toBeInTheDocument();
});
