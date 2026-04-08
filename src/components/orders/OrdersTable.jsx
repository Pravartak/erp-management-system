import { useEffect, useMemo, useState } from "react";
import {
	Box,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@mui/material";
import MaterialIcon from "../MaterialIcon";
import OrdersPagination from "./OrdersPagination";

const PAGE_SIZE = 8;

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

const OrdersTable = ({
	purchaseOrders = [],
	salesOrders = [],
	onDeletePurchaseOrder,
	onDeleteSalesOrder,
	onUpdateOrder,
}) => {
	const [activeTab, setActiveTab] = useState("sales");
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [salesPage, setSalesPage] = useState(1);
	const [purchasePage, setPurchasePage] = useState(1);

	const isSalesOrders = activeTab === "sales";
	const entityLabel = isSalesOrders ? "Customer" : "Supplier";

	const handleMenuClick = (event, order) => {
		setAnchorEl(event.currentTarget);
		setSelectedOrder(order);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		setSelectedOrder(null);
	};

	const handleDeleteOrder = () => {
		if (!selectedOrder) {
			return;
		}

		if (selectedOrder.type === "sales") {
			onDeleteSalesOrder?.(selectedOrder.originalId);
		} else {
			onDeletePurchaseOrder?.(selectedOrder.originalId);
		}

		handleMenuClose();
	};

	const handleUpdateOrder = () => {
		if (!selectedOrder) {
			return;
		}

		onUpdateOrder(selectedOrder);
		handleMenuClose();
	};

	const formattedPOs = useMemo(
		() =>
			purchaseOrders.map((po) => {
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
					originalId: po._id,
					type: "purchase",
					orderNumber: po.orderNumber,
					date: formatDate(po.createdAt),
					supplier: supplierName,
					initials: initials || "PO",
					initialsBg: "#dbeafe",
					initialsColor: "#1d4ed8",
					contactEmail: po.contactEmail,
					productId: po.productId,
					SKU: po.SKU,
					itemName: po.products.itemName,
					quantity,
					unitPrice,
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
			}),
		[purchaseOrders],
	);

	const formattedSOs = useMemo(
		() =>
			salesOrders.map((so) => {
				const customerName = so.customer?.trim() || "Unknown Customer";
				const initials = customerName
					.split(" ")
					.map((word) => word[0])
					.filter(Boolean)
					.slice(0, 2)
					.join("")
					.toUpperCase();

				const quantity = Number(so.products.quantity || 0);
				const unitPrice = Number(so.products.unitPrice || 0);
				const amount = quantity * unitPrice;

				return {
					originalId: so._id,
					type: "sales",
					orderNumber: so.orderNumber,
					date: formatDate(so.createdAt),
					customer: customerName,
					initials: initials || "SO",
					initialsBg: "#dbeafe",
					initialsColor: "#1d4ed8",
					contactEmail: so.contactEmail,
					itemName: so.products.itemName,
					quantity,
					unitPrice,
					amount: `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
					status: so.status,
					statusBg:
						so.status === "Approved"
							? "#dcfce7"
							: so.status === "Received"
								? "#dbeafe"
								: so.status === "Delayed"
									? "#fee2e2"
									: "#ffedd5",
					statusColor:
						so.status === "Approved"
							? "#15803d"
							: so.status === "Received"
								? "#2563eb"
								: so.status === "Delayed"
									? "#b91c1c"
									: "#c2410c",
				};
			}),
		[salesOrders],
	);

	const totalSalesPages = Math.max(1, Math.ceil(formattedSOs.length / PAGE_SIZE));
	const totalPurchasePages = Math.max(1, Math.ceil(formattedPOs.length / PAGE_SIZE));

	useEffect(() => {
		if (salesPage > totalSalesPages) {
			setSalesPage(totalSalesPages);
		}
	}, [salesPage, totalSalesPages]);

	useEffect(() => {
		if (purchasePage > totalPurchasePages) {
			setPurchasePage(totalPurchasePages);
		}
	}, [purchasePage, totalPurchasePages]);

	const currentPage = isSalesOrders ? salesPage : purchasePage;
	const rows = isSalesOrders ? formattedSOs : formattedPOs;
	const paginatedRows = rows.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

	const handleTabChange = (tab) => {
		setActiveTab(tab);
		handleMenuClose();
	};

	const handlePageChange = (page) => {
		if (isSalesOrders) {
			setSalesPage(page);
			return;
		}

		setPurchasePage(page);
	};

	return (
		<Paper elevation={0} sx={{ borderRadius: 2, border: "1px solid #e2e8f0", backgroundColor: "#fff", boxShadow: "0px 8px 16px rgba(15, 23, 42, 0.05)", overflow: "hidden" }}>
			<Box sx={{ display: "flex", alignItems: "center", borderBottom: "1px solid #e2e8f0", backgroundColor: "rgba(248, 250, 252, 0.5)", px: 3 }}>
				<Button onClick={() => handleTabChange("sales")} sx={tabButtonStyles(isSalesOrders)}>
					Sales Orders
				</Button>
				<Button onClick={() => handleTabChange("purchase")} sx={tabButtonStyles(!isSalesOrders)}>
					Purchase Orders
				</Button>
				<Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
					<IconButton sx={{ color: "#94a3b8", "&:hover": { color: "#475569" } }}>
						<MaterialIcon name="filter_list" sx={{ fontSize: 20 }} />
					</IconButton>
					<IconButton sx={{ color: "#94a3b8", "&:hover": { color: "#475569" } }}>
						<MaterialIcon name="download" sx={{ fontSize: 20 }} />
					</IconButton>
				</Box>
			</Box>
			<Box sx={{ overflowX: "auto" }}>
				<Table sx={{ minWidth: 900 }}>
					<TableHead>
						<TableRow sx={{ backgroundColor: "rgba(248, 250, 252, 0.3)" }}>
							{["Order ID", "Date", entityLabel, "Item Name", "Amount", "Status", ""].map((head, index) => (
								<TableCell key={index} sx={{ px: 3, py: 2, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: "#64748b", textAlign: index === 6 ? "right" : "left" }}>
									{head}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{paginatedRows.length > 0 ? (
							paginatedRows.map((row) => (
								<TableRow key={row.originalId} hover sx={{ "&:hover": { backgroundColor: "rgba(248, 250, 252, 0.5)" } }}>
									<TableCell sx={{ px: 3, py: 2 }}>
										<Box sx={{ fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: "#005faf" }}>
											{row.orderNumber}
										</Box>
									</TableCell>
									<TableCell sx={{ px: 3, py: 2, fontSize: 14, color: "#64748b" }}>
										{row.date}
									</TableCell>
									<TableCell sx={{ px: 3, py: 2 }}>
										<Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
											<Box sx={{ width: 32, height: 32, borderRadius: 1, backgroundColor: row.initialsBg, color: row.initialsColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>
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
										<Box sx={{ display: "inline-flex", alignItems: "center", px: 1.5, py: 0.5, borderRadius: 999, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", backgroundColor: row.statusBg, color: row.statusColor }}>
											{row.status}
										</Box>
									</TableCell>
									<TableCell sx={{ px: 3, py: 2, textAlign: "right" }}>
										<IconButton onClick={(event) => handleMenuClick(event, row)} sx={{ color: "#94a3b8", "&:hover": { color: "#005faf" } }}>
											<MaterialIcon name="more_vert" sx={{ fontSize: 18 }} />
										</IconButton>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={7} sx={{ px: 3, py: 5, textAlign: "center", color: "#64748b", fontSize: 14 }}>
									No {isSalesOrders ? "sales" : "purchase"} orders found.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</Box>
			<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} transformOrigin={{ horizontal: "right", vertical: "top" }} anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
				<MenuItem onClick={handleUpdateOrder} sx={{ fontSize: 14, py: 1, px: 2, gap: 1 }}>
					<MaterialIcon name="edit" sx={{ fontSize: 20 }} />
					Update
				</MenuItem>
				<MenuItem onClick={handleDeleteOrder} sx={{ fontSize: 14, py: 1, px: 2, gap: 1, color: "#dc2626" }}>
					<MaterialIcon name="delete" sx={{ fontSize: 20 }} />
					Delete Order
				</MenuItem>
			</Menu>
			<OrdersPagination page={currentPage} pageSize={PAGE_SIZE} totalCount={rows.length} onPageChange={handlePageChange} label={isSalesOrders ? "sales orders" : "purchase orders"} />
		</Paper>
	);
};

export default OrdersTable;
