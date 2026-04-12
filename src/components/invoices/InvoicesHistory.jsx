import { Box, Paper, Typography } from "@mui/material";
import MaterialIcon from "../MaterialIcon";

const formatDate = (dateValue) => {
	if (!dateValue) {
		return "No date";
	}

	return new Date(dateValue).toLocaleDateString();
};

const InvoicesHistory = ({ invoices = [] }) => {
	const sortedInvoices = [...invoices].sort((a, b) => new Date(b.createdAt || b.invoiceDate) - new Date(a.createdAt || a.invoiceDate));

	return (
		<Paper elevation={0} sx={{ backgroundColor: "#fff", borderRadius: 2, border: "1px solid #e2e8f0", p: 3 }}>
			<Typography sx={{ fontWeight: 700, color: "#0f172a", mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
				<MaterialIcon name="history" sx={{ color: "#94a3b8", fontSize: 20 }} />
				Saved Invoices
			</Typography>

			{sortedInvoices.length === 0 ? (
				<Typography sx={{ fontSize: 13, color: "#64748b" }}>
					No invoices saved yet.
				</Typography>
			) : (
				<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
					{sortedInvoices.map((invoice) => (
						<Box
							key={invoice._id || invoice.invoiceNumber}
							sx={{
								border: "1px solid #e2e8f0",
								borderRadius: 2,
								p: 2,
								display: "flex",
								flexDirection: "column",
								gap: 0.5,
							}}
						>
							<Typography sx={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>
								{invoice.invoiceNumber || "Invoice"}
							</Typography>
							<Typography sx={{ fontSize: 12, color: "#475569" }}>
								{invoice.customer || "No customer"}
							</Typography>
							<Typography sx={{ fontSize: 12, color: "#64748b" }}>
								{invoice.items?.[0]?.itemName || "No item"}
							</Typography>
							<Typography sx={{ fontSize: 11, color: "#94a3b8" }}>
								{formatDate(invoice.createdAt || invoice.invoiceDate)}
							</Typography>
							<Typography sx={{ fontSize: 11, fontWeight: 600, color: "#2563eb" }}>
								{invoice.status || "Draft"}
							</Typography>
						</Box>
					))}
				</Box>
			)}
		</Paper>
	);
};

export default InvoicesHistory;
