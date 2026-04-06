import { Box, Grid, Paper, Skeleton, Typography } from "@mui/material";
import MaterialIcon from "../MaterialIcon";

const DirectoryStats = ({ users, products, isLoading }) => {
	const totalInventoryValue = products.reduce(
		(total, product) => total + Number(product.price || 0) * Number(product.stock || 0),
		0,
	);
	const lowStockProducts = products.filter((product) => Number(product.stock || 0) <= 10).length;
	const categories = new Set(products.map((product) => product.category).filter(Boolean)).size;

	const stats = [
		{
			label: "Total Users",
			value: users.length,
			icon: "group",
			iconBg: "#dbeafe",
			iconColor: "#2563eb",
		},
		{
			label: "Products",
			value: products.length,
			icon: "inventory_2",
			iconBg: "#d1fae5",
			iconColor: "#059669",
		},
		{
			label: "Categories",
			value: categories,
			icon: "category",
			iconBg: "#ede9fe",
			iconColor: "#7c3aed",
		},
		{
			label: "Low Stock Items",
			value: lowStockProducts,
			icon: "warning",
			iconBg: "#fee2e2",
			iconColor: "#dc2626",
		},
		{
			label: "Inventory Value",
			value: new Intl.NumberFormat("en-IN", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(totalInventoryValue),
			icon: "payments",
			iconBg: "#fef3c7",
			iconColor: "#d97706",
		},
		{
			label: "Admin Accounts",
			value: users.filter((user) => user.role === "admin").length,
			icon: "shield",
			iconBg: "#e0f2fe",
			iconColor: "#0284c7",
		},
	];

	return (
		<Grid container spacing={3} sx={{ mb: 4 }}>
			{stats.map((stat) => (
				<Grid item xs={12} md={6} xl={4} key={stat.label}>
					<Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: "1px solid #e2e8f0", backgroundColor: "#fff", display: "flex", alignItems: "center", gap: 2.5, boxShadow: "0px 10px 20px rgba(15, 23, 42, 0.05)" }}>
						<Box sx={{ width: 48, height: 48, borderRadius: 2, backgroundColor: stat.iconBg, color: stat.iconColor, display: "flex", alignItems: "center", justifyContent: "center" }}>
							<MaterialIcon name={stat.icon} />
						</Box>
						<Box>
							<Typography sx={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "#64748b", fontWeight: 600 }}>
								{stat.label}
							</Typography>
							{isLoading ? (
								<Skeleton variant="text" width={120} height={36} />
							) : (
								<Typography sx={{ fontSize: 24, fontWeight: 700, color: "#0f172a" }}>
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

export default DirectoryStats;
