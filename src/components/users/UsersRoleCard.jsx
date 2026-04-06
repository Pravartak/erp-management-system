import { Box, Button, Paper, Typography } from "@mui/material";
import MaterialIcon from "../MaterialIcon";
import { customColors } from "../../theme";

const UsersRoleCard = ({ users, isLoading }) => {
	const adminCount = users.filter((user) => user.role === "admin").length;
	const salesCount = users.filter((user) => user.role === "sales").length;
	const dominantRole = adminCount >= salesCount ? "Admin" : "Sales";

	return (
		<Paper
			elevation={0}
			sx={{
				borderRadius: 3,
				p: 3,
				border: "1px solid rgba(0, 95, 175, 0.1)",
				backgroundColor: "rgba(0, 95, 175, 0.05)",
				textAlign: "center",
			}}>
			<Box
				sx={{
					width: 64,
					height: 64,
					borderRadius: 3,
					backgroundColor: "rgba(0, 95, 175, 0.1)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					color: customColors.primary,
					mx: "auto",
					mb: 2,
				}}>
				<MaterialIcon name="security" sx={{ fontSize: 32 }} />
			</Box>
			<Typography sx={{ fontSize: 18, fontWeight: 800, color: "#0f172a", mb: 1 }}>
				Role Overview
			</Typography>
			<Typography sx={{ fontSize: 14, color: "#64748b", mb: 3, lineHeight: 1.6 }}>
				{isLoading
					? "Loading current access mix..."
					: `${adminCount} admin accounts and ${salesCount} sales accounts are currently configured. ${dominantRole} is the largest role group.`}
			</Typography>
			<Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5, mb: 3 }}>
				<Paper elevation={0} sx={{ p: 1.5, borderRadius: 2, backgroundColor: "#fff" }}>
					<Typography sx={{ fontSize: 10, textTransform: "uppercase", color: "#94a3b8", fontWeight: 700 }}>
						Admins
					</Typography>
					<Typography sx={{ fontSize: 22, fontWeight: 800, color: "#0f172a" }}>
						{adminCount}
					</Typography>
				</Paper>
				<Paper elevation={0} sx={{ p: 1.5, borderRadius: 2, backgroundColor: "#fff" }}>
					<Typography sx={{ fontSize: 10, textTransform: "uppercase", color: "#94a3b8", fontWeight: 700 }}>
						Sales
					</Typography>
					<Typography sx={{ fontSize: 22, fontWeight: 800, color: "#0f172a" }}>
						{salesCount}
					</Typography>
				</Paper>
			</Box>
			<Button
				variant="outlined"
				disabled={users.length === 0}
				sx={{
					width: "100%",
					textTransform: "none",
					fontWeight: 700,
					fontSize: 12,
					borderRadius: 2.5,
					color: "#0f172a",
					borderColor: "#e2e8f0",
					backgroundColor: "#fff",
					"&:hover": { backgroundColor: "#f8fafc" },
				}}>
				Manage Roles & Scopes
			</Button>
		</Paper>
	);
};

export default UsersRoleCard;
