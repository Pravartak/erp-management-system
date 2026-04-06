import { useState } from "react";
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
} from "@mui/material";
import MaterialIcon from "../MaterialIcon";
import OrdersPagination from "./OrdersPagination";

const salesOrders = [
	{
		orderNumber: "#SO-29402",
		date: "Oct 24, 2023",
		initials: "TC",
		initialsBg: "#dbeafe",
		initialsColor: "#1d4ed8",
		customer: "TechCorp Solutions",
		itemName: "Enterprise Server X",
		amount: "$12,450.00",
		status: "Completed",
		statusBg: "#dcfce7",
		statusColor: "#15803d",
	},
	{
		orderNumber: "#SO-29401",
		date: "Oct 23, 2023",
		initials: "NL",
		initialsBg: "#ede9fe",
		initialsColor: "#6d28d9",
		customer: "Nova Logistics",
		itemName: "Office Desks",
		amount: "$3,120.50",
		status: "Pending",
		statusBg: "#ffedd5",
		statusColor: "#c2410c",
	},
	{
		orderNumber: "#SO-29398",
		date: "Oct 22, 2023",
		initials: "GR",
		initialsBg: "#f1f5f9",
		initialsColor: "#64748b",
		customer: "Global Retailers",
		itemName: "Wireless Keyboards",
		amount: "$890.00",
		status: "Cancelled",
		statusBg: "#fee2e2",
		statusColor: "#b91c1c",
	},
	{
		orderNumber: "#SO-29395",
		date: "Oct 21, 2023",
		initials: "MI",
		initialsBg: "#ffedd5",
		initialsColor: "#c2410c",
		customer: "Midwest Industries",
		itemName: "Industrial Robot Arm",
		amount: "$56,000.00",
		status: "Completed",
		statusBg: "#dcfce7",
		statusColor: "#15803d",
	},
	{
		orderNumber: "#SO-29390",
		date: "Oct 20, 2023",
		initials: "AS",
		initialsBg: "#dbeafe",
		initialsColor: "#1d4ed8",
		customer: "Apex Systems",
		itemName: "Cloud Storage Auth",
		amount: "$1,420.00",
		status: "Pending",
		statusBg: "#ffedd5",
		statusColor: "#c2410c",
	},
];

const tabButtonStyles = (active) => ({
	px: 3,
	py: 2,
	fontSize: 14,
	fontWeight: active ? 600 : 500,
	borderBottom: active ? "2px solid #005faf" : "2px solid transparent",
	color: active ? "#005faf" : "#94a3b8",
	textTransform: "none",
	borderRadius: 0,
});

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

const OrdersTable = ({ purchaseOrders = [] }) => {
	const [activeTab, setActiveTab] = useState("sales");

	const isSalesOrders = activeTab === "sales";
	const entityLabel = isSalesOrders ? "Customer" : "Supplier";

	const formattedPOs = purchaseOrders.map((po) => {
		const supplierName = po.supplier?.trim() || "Unknown Supplier";
		const initials = supplierName
			.split(" ")
			.map((word) => word[0])
			.filter(Boolean)
			.slice(0, 2)
			.join("")
			.toUpperCase();
			
		const quantity = Number(po.products.quantity || 0);
		const unitPrice = Number(po.products.unitPrice || 0);
		const amount = quantity * unitPrice;

		return {
			orderNumber: po.orderNumber,
			date: formatDate(po.createdAt),
			supplier: supplierName,
			initials: initials || "PO",
			initialsBg: "#dbeafe",
			initialsColor: "#1d4ed8",
			contactEmail: po.contactEmail,
			itemName: po.products.itemName,
			quantity: quantity,
			unitPrice: unitPrice,
			amount: `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
			status: po.status,
			statusBg:
				po.status === "Approved"
					? "#dcfce7"
					: po.status === "Received"
						? "#dbeafe"
						: po.status === "Delayed"
							? "#fee2e2"
							: "#ffedd5",
			statusColor:
				po.status === "Approved"
					? "#15803d"
					: po.status === "Received"
						? "#2563eb"
						: po.status === "Delayed"
							? "#b91c1c"
							: "#c2410c",
		};
	});
	
	const rows = isSalesOrders ? salesOrders : formattedPOs;

	return (
		<Paper
			elevation={0}
			sx={{
				borderRadius: 2,
				border: "1px solid #e2e8f0",
				backgroundColor: "#fff",
				boxShadow: "0px 8px 16px rgba(15, 23, 42, 0.05)",
				overflow: "hidden",
			}}>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					borderBottom: "1px solid #e2e8f0",
					backgroundColor: "rgba(248, 250, 252, 0.5)",
					px: 3,
				}}>
				<Button
					onClick={() => setActiveTab("sales")}
					sx={tabButtonStyles(isSalesOrders)}>
					Sales Orders
				</Button>
				<Button
					onClick={() => setActiveTab("purchase")}
					sx={tabButtonStyles(!isSalesOrders)}>
					Purchase Orders
				</Button>
				<Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
					<IconButton
						sx={{ color: "#94a3b8", "&:hover": { color: "#475569" } }}>
						<MaterialIcon name="filter_list" sx={{ fontSize: 20 }} />
					</IconButton>
					<IconButton
						sx={{ color: "#94a3b8", "&:hover": { color: "#475569" } }}>
						<MaterialIcon name="download" sx={{ fontSize: 20 }} />
					</IconButton>
				</Box>
			</Box>
			<Box sx={{ overflowX: "auto" }}>
				<Table sx={{ minWidth: 900 }}>
					<TableHead>
						<TableRow sx={{ backgroundColor: "rgba(248, 250, 252, 0.3)" }}>
							{[
								"Order ID",
								"Date",
								entityLabel,
								"Item Name",
								"Amount",
								"Status",
								"",
							].map((head, index) => (
								<TableCell
									key={index}
									sx={{
										px: 3,
										py: 2,
										fontSize: 11,
										fontWeight: 700,
										textTransform: "uppercase",
										letterSpacing: "0.2em",
										color: "#64748b",
										textAlign: index === 6 ? "right" : "left",
									}}>
									{head}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow
								key={row.orderNumber}
								hover
								sx={{
									"&:hover": { backgroundColor: "rgba(248, 250, 252, 0.5)" },
								}}>
								<TableCell sx={{ px: 3, py: 2 }}>
									<Box
										sx={{
											fontFamily: "monospace",
											fontSize: 12,
											fontWeight: 700,
											color: "#005faf",
										}}>
										{row.orderNumber}
									</Box>
								</TableCell>
								<TableCell
									sx={{ px: 3, py: 2, fontSize: 14, color: "#64748b" }}>
									{row.date || "Date to be formatted"}
								</TableCell>
								<TableCell sx={{ px: 3, py: 2 }}>
									<Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
										<Box
											sx={{
												width: 32,
												height: 32,
												borderRadius: 1,
												backgroundColor: row.initialsBg,
												color: row.initialsColor,
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												fontSize: 10,
												fontWeight: 700,
											}}>
											{row.initials}
										</Box>
										<Box sx={{ fontSize: 14, fontWeight: 500 }}>
											{isSalesOrders ? row.customer : row.supplier}
										</Box>
									</Box>
								</TableCell>
								<TableCell sx={{ px: 3, py: 2, fontSize: 14, color: "#64748b" }}>
									{row?.itemName || "N/A"}
								</TableCell>
								<TableCell sx={{ px: 3, py: 2, fontSize: 14, fontWeight: 600 }}>
									{row.amount}
								</TableCell>
								<TableCell sx={{ px: 3, py: 2 }}>
									<Box
										sx={{
											display: "inline-flex",
											alignItems: "center",
											px: 1.5,
											py: 0.5,
											borderRadius: 999,
											fontSize: 10,
											fontWeight: 700,
											textTransform: "uppercase",
											letterSpacing: "0.08em",
											backgroundColor: row.statusBg,
											color: row.statusColor,
										}}>
										{row.status}
									</Box>
								</TableCell>
								<TableCell sx={{ px: 3, py: 2, textAlign: "right" }}>
									<IconButton
										sx={{ color: "#94a3b8", "&:hover": { color: "#005faf" } }}>
										<MaterialIcon name="more_vert" sx={{ fontSize: 18 }} />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Box>
			<OrdersPagination />
		</Paper>
	);
};

export default OrdersTable;
