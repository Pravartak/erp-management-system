import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";

test("renders Routes component", () => {
	render(
		<BrowserRouter>
			<App />
		</BrowserRouter>,
	);
	// Test passes if the component renders without throwing errors
});
