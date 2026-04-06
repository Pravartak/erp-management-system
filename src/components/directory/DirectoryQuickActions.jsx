import { Box, Button, Paper, Typography } from "@mui/material";

const formatCurrency = (value) =>
	new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0,
	}).format(value);

const formatDate = (value) => {
	if (!value) {
		return "Recently";
	}
	return new Intl.DateTimeFormat("en-IN", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(value));
};

const DirectoryQuickActions = ({ users, products, isLoading }) => {
	const totalInventoryValue = products.reduce(
		(total, product) => total + Number(product.price || 0) * Number(product.stock || 0),
		0,
	);
	const latestUser = [...users].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))[0];
	const latestProduct = [...products].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))[0];

	return (
		<Box sx={{ mt: 4, display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
			<Paper elevation={0} sx={{ position: "relative", overflow: "hidden", borderRadius: 3, p: 3, color: "#fff", background: "linear-gradient(135deg, #2563eb, #4338ca)", boxShadow: "0px 20px 40px rgba(59, 130, 246, 0.2)" }}>
				<Box sx={{ position: "relative", zIndex: 1 }}>
					<Typography sx={{ fontSize: 20, fontWeight: 700, mb: 1 }}>Operational Snapshot</Typography>
					<Typography sx={{ fontSize: 14, color: "#dbeafe", mb: 2 }}>
						{isLoading
							? "Collecting the latest numbers from your system..."
							: `Your catalog currently holds ${products.length} products with a combined inventory value of ${formatCurrency(totalInventoryValue)}.`}
					</Typography>
					<Button sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)", color: "#fff", border: "1px solid rgba(255, 255, 255, 0.3)", textTransform: "none", fontWeight: 600, borderRadius: 2, "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.3)" } }}>
						Review Metrics
					</Button>
				</Box>
				<Box sx={{ position: "absolute", right: -32, bottom: -32, width: 192, height: 192, backgroundColor: "rgba(255, 255, 255, 0.12)", borderRadius: "50%", filter: "blur(48px)" }} />
				<Box sx={{ position: "absolute", right: 48, top: 48, width: 96, height: 96, backgroundColor: "rgba(147, 197, 253, 0.2)", borderRadius: "50%", filter: "blur(32px)" }} />
			</Paper>
			<Paper elevation={0} sx={{ backgroundColor: "#fff", borderRadius: 3, border: "1px solid #e2e8f0", p: 3, boxShadow: "0px 10px 20px rgba(15, 23, 42, 0.05)" }}>
				<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
					<Typography sx={{ fontWeight: 700, color: "#0f172a" }}>Recent Activity</Typography>
					<Button sx={{ textTransform: "none", fontSize: 12, fontWeight: 600, color: "#005faf", "&:hover": { textDecoration: "underline", backgroundColor: "transparent" } }}>
						View All
					</Button>
				</Box>
				<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
					<Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
						<Box sx={{ mt: 0.8, width: 8, height: 8, borderRadius: "50%", backgroundColor: "#3b82f6" }} />
						<Box>
							<Typography sx={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>
								{latestUser ? `Newest user added: ${latestUser.name || latestUser.email}` : "No user activity yet"}
							</Typography>
							<Typography sx={{ fontSize: 10, color: "#64748b" }}>
								{latestUser ? `${formatDate(latestUser.createdAt)} • Role: ${latestUser.role}` : "Add a user to begin tracking activity."}
							</Typography>
						</Box>
					</Box>
					<Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
						<Box sx={{ mt: 0.8, width: 8, height: 8, borderRadius: "50%", backgroundColor: "#10b981" }} />
						<Box>
							<Typography sx={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>
								{latestProduct ? `Latest product updated: ${latestProduct.title}` : "No product activity yet"}
							</Typography>
							<Typography sx={{ fontSize: 10, color: "#64748b" }}>
								{latestProduct ? `${formatDate(latestProduct.updatedAt || latestProduct.createdAt)} • Stock: ${latestProduct.stock}` : "Add a product to populate the activity timeline."}
							</Typography>
						</Box>
					</Box>
				</Box>
			</Paper>
		</Box>
	);
};

export default DirectoryQuickActions;
