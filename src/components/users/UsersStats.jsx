import { Box, Grid, Paper, Skeleton, Typography } from "@mui/material";
import MaterialIcon from "../MaterialIcon";

const cardStyles = {
	p: 3,
	borderRadius: 3,
	border: "1px solid #f1f5f9",
	backgroundColor: "#fff",
	display: "flex",
	alignItems: "center",
	gap: 2,
};

const UsersStats = ({ users, isLoading }) => {
	const admins = users.filter((user) => user.role === "admin").length;
	const standardUsers = users.filter((user) => user.role === "sales").length;
	const recentUsers = users.filter((user) => {
		if (!user.createdAt) {
			return false;
		}
		const createdAt = new Date(user.createdAt);
		const weekAgo = new Date();
		weekAgo.setDate(weekAgo.getDate() - 7);
		return createdAt >= weekAgo;
	}).length;

	const stats = [
		{
			label: "Total Users",
			value: users.length,
			icon: "group",
			bg: "#dbeafe",
			color: "#2563eb",
		},
		{
			label: "Admins",
			value: admins,
			icon: "admin_panel_settings",
			bg: "#fef3c7",
			color: "#d97706",
		},
		{
			label: "Sales Users",
			value: standardUsers,
			icon: "badge",
			bg: "#dcfce7",
			color: "#16a34a",
		},
		{
			label: "Added This Week",
			value: recentUsers,
			icon: "person_add",
			bg: "#ffe4e6",
			color: "#e11d48",
		},
	];

	return (
		<Grid container spacing={3} sx={{ mb: 4 }}>
			{stats.map((stat) => (
				<Grid item xs={12} md={3} key={stat.label}>
					<Paper elevation={0} sx={cardStyles}>
						<Box
							sx={{
								p: 1.5,
								borderRadius: 2,
								backgroundColor: stat.bg,
								color: stat.color,
								display: "flex",
							}}>
							<MaterialIcon name={stat.icon} />
						</Box>
						<Box>
							<Typography sx={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#94a3b8", letterSpacing: "0.12em" }}>
								{stat.label}
							</Typography>
							{isLoading ? (
								<Skeleton variant="text" width={72} height={36} />
							) : (
								<Typography sx={{ fontSize: 24, fontWeight: 900, color: "#0f172a" }}>
									{stat.value}
								</Typography>
							)}
						</Box>
					</Paper>
				</Grid>
			))}
		</Grid>
	);
};

export default UsersStats;
