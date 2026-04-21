import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../backend/api/api";
// import axios from "axios";
import { customColors } from "../theme";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const res = await api.post("/auth/login", {
				email,
				password,
			});

			console.log(res.data.token);
			console.log(res.data);

			// Save token to localStorage
			localStorage.setItem("Token", res.data.token);
			localStorage.setItem("Role", res.data.user.role);

			navigate("/dashboard");
		} catch (e) {
			console.error(e.response?.data || e.message);
			
			// Try to extract the specific error message from the backend response
			const errorMessage = e.response?.data?.message || e.response?.data?.error || "Invalid credentials. Please try again.";
			alert(typeof errorMessage === "string" ? errorMessage : "Login failed");
		}
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
					maxWidth: 420,
					p: { xs: 2.5, sm: 4 },
					borderRadius: 3,
					border: "1px solid #e2e8f0",
					backgroundColor: "#fff",
				}}>
				<Typography
					sx={{ fontSize: 24, fontWeight: 800, color: "#0f172a", mb: 1 }}>
					Welcome Back
				</Typography>
				<Typography sx={{ fontSize: 14, color: "#64748b", mb: 3 }}>
					Sign in to continue to ERP Core.
				</Typography>
				<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
					<TextField
						label="Email"
						type="email"
						fullWidth
						size="small"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextField
						label="Password"
						type="password"
						fullWidth
						size="small"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button
						onClick={handleLogin}
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
						Login
					</Button>
				</Box>
				<Typography
					sx={{ fontSize: 12, color: "#64748b", mt: 3, textAlign: "center" }}>
					Don't have an account?{" "}
					<Box
						component={RouterLink}
						to="/register"
						sx={{
							color: customColors.primary,
							fontWeight: 700,
							textDecoration: "none",
						}}>
						Register
					</Box>
				</Typography>
			</Paper>
		</Box>
	);
};

export default LoginPage;
