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
		role: "admin"
	});

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			await api.post("/auth/register", form);
			navigate("/login");
		} catch (e) {
			console.error(e.response?.data || e.message);
			alert("Login failed");
		}
	};

	const handleFormChange = (e) => {
		setForm({...form, [e.target.name]: e.target.value})
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
			}}>
			<Paper
				elevation={0}
				sx={{
					width: "100%",
					maxWidth: 460,
					p: 4,
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
					<TextField label="Name" name="name" fullWidth size="small" onChange={handleFormChange} />
					<TextField label="Email" name="email" type="email" fullWidth size="small" onChange={handleFormChange} />
					<TextField label="Password" name="password" type="password" fullWidth size="small" onChange={handleFormChange} />
					<TextField
						label="Confirm Password"
						type="password"
						fullWidth
						size="small"
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
