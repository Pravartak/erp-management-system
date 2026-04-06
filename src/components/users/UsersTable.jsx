import {
	Box,
	Button,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import MaterialIcon from "../MaterialIcon";
import UsersPagination from "./UsersPagination";

const formatDate = (value) => {
	if (!value) {
		return "No activity yet";
	}

	const date = new Date(value);
	if (Number.isNaN(date.getTime())) {
		return "No activity yet";
	}

	return new Intl.DateTimeFormat("en-IN", {
		dateStyle: "medium",
	}).format(date);
};

const getRoleStyles = (role) => {
	if (role === "admin") {
		return { backgroundColor: "#fef3c7", color: "#d97706" };
	}

	return { backgroundColor: "#dbeafe", color: "#2563eb" };
};

const UsersTable = ({
	users,
	totalCount,
	page,
	pageSize,
	onPageChange,
	onUpdateUser,
	onDeleteUser,
	isLoading,
}) => {
	return (
		<Paper
			elevation={0}
			sx={{
				borderRadius: 3,
				border: "1px solid #e2e8f0",
				backgroundColor: "#fff",
				overflow: "hidden",
			}}>
			<Box
				sx={{
					px: 3,
					py: 2,
					borderBottom: "1px solid #f1f5f9",
					display: "flex",
					flexDirection: { xs: "column", md: "row" },
					alignItems: "center",
					justifyContent: "space-between",
					gap: 2,
				}}>
				<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
					<Typography sx={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>
						All Users
					</Typography>
					<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
						<Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: isLoading ? "#f59e0b" : "#10b981" }} />
						<Typography sx={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "#64748b" }}>
							{isLoading ? "Refreshing" : "System Online"}
						</Typography>
					</Box>
				</Box>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					<Button
						variant="contained"
						disabled
						startIcon={<MaterialIcon name="filter_list" sx={{ fontSize: 18 }} />}
						sx={{
							backgroundColor: "#f8fafc",
							color: "#64748b",
							textTransform: "none",
							fontSize: 12,
							fontWeight: 700,
							boxShadow: "none",
						}}>
						Filter
					</Button>
					<Button
						variant="contained"
						disabled={totalCount === 0}
						startIcon={<MaterialIcon name="download" sx={{ fontSize: 18 }} />}
						onClick={() => {
							const csvRows = ["Name,Email,Role,Created At"];
							users.forEach((user) => {
								csvRows.push([user.name, user.email, user.role, user.createdAt].map((value) => `"${value || ""}"`).join(","));
							});
							const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
							const link = document.createElement("a");
							link.href = URL.createObjectURL(blob);
							link.download = `users-page-${page}.csv`;
							link.click();
							URL.revokeObjectURL(link.href);
						}}
						sx={{
							backgroundColor: "#f8fafc",
							color: "#64748b",
							textTransform: "none",
							fontSize: 12,
							fontWeight: 700,
							boxShadow: "none",
							"&:hover": { backgroundColor: "#f1f5f9" },
						}}>
						Export
					</Button>
				</Box>
			</Box>
			<Box sx={{ overflowX: "auto" }}>
				<Table sx={{ minWidth: 900 }}>
					<TableHead>
						<TableRow sx={{ backgroundColor: "rgba(248, 250, 252, 0.5)" }}>
							{["Name", "Email", "Role", "Created", "Actions"].map((head, index) => (
								<TableCell
									key={head}
									sx={{
										px: 3,
										py: 2,
										fontSize: 11,
										fontWeight: 700,
										textTransform: "uppercase",
										letterSpacing: "0.2em",
										color: "#64748b",
										textAlign: index === 4 ? "right" : "left",
									}}>
									{head}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{users.length === 0 ? (
							<TableRow>
								<TableCell colSpan={5} sx={{ px: 3, py: 6, textAlign: "center", color: "#64748b" }}>
									{isLoading ? "Loading users..." : "No users found yet."}
								</TableCell>
							</TableRow>
						) : (
							users.map((user) => {
								const roleStyles = getRoleStyles(user.role);
								return (
									<TableRow
										key={user._id}
										hover
										sx={{
											"&:hover": { backgroundColor: "rgba(248, 250, 252, 0.8)" },
											"&:hover .user-actions": { opacity: 1 },
										}}>
										<TableCell sx={{ px: 3, py: 2 }}>
											<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
												<Box>
													<Typography sx={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>
														{user.name || "Unnamed user"}
													</Typography>
													<Typography sx={{ fontSize: 12, color: "#64748b" }}>
														{user.role === "admin" ? "Administrative access" : "Sales team access"}
													</Typography>
												</Box>
											</Box>
										</TableCell>
										<TableCell sx={{ px: 3, py: 2, fontSize: 14, color: "#64748b" }}>
											{user.email}
										</TableCell>
										<TableCell sx={{ px: 3, py: 2 }}>
											<Box sx={{ display: "inline-flex", px: 1.5, py: 0.5, borderRadius: 999, fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", backgroundColor: roleStyles.backgroundColor, color: roleStyles.color }}>
												{user.role}
											</Box>
										</TableCell>
										<TableCell sx={{ px: 3, py: 2 }}>
											<Typography sx={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>
												{formatDate(user.createdAt)}
											</Typography>
											<Typography sx={{ fontSize: 10, color: "#94a3b8" }}>
												Last updated {formatDate(user.updatedAt)}
											</Typography>
										</TableCell>
										<TableCell sx={{ px: 3, py: 2, textAlign: "right" }}>
											<Box className="user-actions" sx={{ display: "flex", justifyContent: "flex-end", gap: 1, opacity: 0, transition: "opacity 0.2s" }}>
												<IconButton onClick={() => onUpdateUser(user._id)} sx={{ color: "#94a3b8", "&:hover": { color: "#2563eb", backgroundColor: "#dbeafe" } }}>
													<MaterialIcon name="edit" sx={{ fontSize: 20 }} />
												</IconButton>
												<IconButton onClick={() => onDeleteUser(user._id)} sx={{ color: "#94a3b8", "&:hover": { color: "#9f403d", backgroundColor: "rgba(254, 137, 131, 0.2)" } }}>
													<MaterialIcon name="delete" sx={{ fontSize: 20 }} />
												</IconButton>
											</Box>
										</TableCell>
									</TableRow>
								);
							})
						)}
					</TableBody>
				</Table>
			</Box>
			<UsersPagination page={page} pageSize={pageSize} totalCount={totalCount} onPageChange={onPageChange} />
		</Paper>
	);
};

export default UsersTable;
