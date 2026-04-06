import { Box, Paper, Typography } from "@mui/material";

const formatDate = (value) => {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) {
		return "Recently";
	}
	return new Intl.DateTimeFormat("en-IN", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(date);
};

const UsersAuditLogs = ({ users, isLoading }) => {
	const recentUsers = [...users]
		.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
		.slice(0, 4)
		.map((user, index) => ({
			title: `${user.name || user.email} account reviewed`,
			meta: `${formatDate(user.updatedAt || user.createdAt)} • Role: ${user.role || "sales"}`,
			color: ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"][index % 4],
		}));

	const logs = recentUsers.length > 0
		? recentUsers
		: [
			{
				title: isLoading ? "Loading audit activity" : "No recent user activity found",
				meta: isLoading ? "Checking the latest account changes..." : "Create or update a user to populate the timeline.",
				color: "#94a3b8",
			},
		];

	return (
		<Paper elevation={0} sx={{ borderRadius: 3, p: 3, border: "1px solid #e2e8f0", backgroundColor: "#fff" }}>
			<Typography sx={{ fontSize: 18, fontWeight: 800, color: "#0f172a", mb: 3 }}>
				Recent Audit Logs
			</Typography>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
				{logs.map((log) => (
					<Box key={`${log.title}-${log.meta}`} sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
						<Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: log.color, mt: 0.8 }} />
						<Box>
							<Typography sx={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{log.title}</Typography>
							<Typography sx={{ fontSize: 12, color: "#64748b" }}>{log.meta}</Typography>
						</Box>
					</Box>
				))}
			</Box>
		</Paper>
	);
};

export default UsersAuditLogs;
