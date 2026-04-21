import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../backend/api/api.js";
import { customColors } from "../theme";

const RegisterPage = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		role: "sales",
	});
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleRegister = async (e) => {
		e.preventDefault();

		if (form.password !== confirmPassword) {
			alert("Passwords do not match.");
			return;
		}

		try {
			await api.post("/auth/register", form);
			navigate("/login");
		} catch (e) {
			// Try to extract the specific error message from the backend response
			const errorMessage =
				e.response?.data?.message ||
				e.response?.data?.error ||
				"Registration failed. Please try again.";
			alert(typeof errorMessage === "string" ? errorMessage : "Registration failed");
		}
	};

	const handleFormChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	return (
		<Box
				sx={{
					minHeight: "100vh",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "#f8fafc",
					px: 2,
					py: 3,
				}}>
			<Paper
				elevation={0}
				sx={{
					width: "100%",
					maxWidth: 460,
					p: { xs: 2.5, sm: 4 },
					borderRadius: 3,
					border: "1px solid #e2e8f0",
					backgroundColor: "#fff",
				}}>
				<Typography
					sx={{ fontSize: 24, fontWeight: 800, color: "#0f172a", mb: 1 }}>
					Create Account
				</Typography>
				<Typography sx={{ fontSize: 14, color: "#64748b", mb: 3 }}>
					Register to access ERP Core.
				</Typography>
				<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
					<TextField
						label="Name"
						name="name"
						fullWidth
						size="small"
						onChange={handleFormChange}
					/>
					<TextField
						label="Email"
						name="email"
						type="email"
						fullWidth
						size="small"
						onChange={handleFormChange}
					/>
					<TextField
						label="Password"
						name="password"
						type="password"
						fullWidth
						size="small"
						onChange={handleFormChange}
					/>
					<TextField
						label="Confirm Password"
						type="password"
						fullWidth
						size="small"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<Button
						onClick={handleRegister}
						variant="contained"
						disableElevation
						sx={{
							backgroundColor: customColors.primary,
							color: customColors["on-primary"],
							fontWeight: 600,
							textTransform: "none",
							borderRadius: 2,
							py: 1.25,
							"&:hover": { backgroundColor: customColors["primary-dim"] },
						}}>
						Register
					</Button>
				</Box>
				<Typography
					sx={{ fontSize: 12, color: "#64748b", mt: 3, textAlign: "center" }}>
					Already have an account?{" "}
					<Box
						component={RouterLink}
						to="/login"
						sx={{
							color: customColors.primary,
							fontWeight: 700,
							textDecoration: "none",
						}}>
						Login
					</Box>
				</Typography>
			</Paper>
		</Box>
	);
};

export default RegisterPage;
