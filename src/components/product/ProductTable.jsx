import {
	Box,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
	Menu,
	MenuItem,
} from "@mui/material";
import { useMemo, useState } from "react";
import { customColors } from "../../theme";
import MaterialIcon from "../MaterialIcon";
import ProductPagination from "./ProductPagination";

const getStockTone = (stock) => {
	const numericStock = Number(stock || 0);

	if (numericStock <= 0) {
		return {
			label: "Out of Stock",
			color: "#dc2626",
			bg: "#fee2e2",
			progress: "#ef4444",
		};
	}

	if (numericStock <= 10) {
		return {
			label: "Low Stock",
			color: "#d97706",
			bg: "#fef3c7",
			progress: "#f59e0b",
		};
	}

	if (numericStock <= 50) {
		return {
			label: "Healthy",
			color: "#2563eb",
			bg: "#dbeafe",
			progress: "#3b82f6",
		};
	}

	return {
		label: "Well Stocked",
		color: "#047857",
		bg: "#d1fae5",
		progress: "#10b981",
	};
};

const ProductTable = ({
	products,
	totalCount,
	page,
	pageSize,
	onPageChange,
	onUpdateProduct,
	onDeleteProduct,
	isLoading,
}) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedProductId, setSelectedProductId] = useState(null);

	const handleMenuClick = (event, id) => {
		setAnchorEl(event.currentTarget);
		setSelectedProductId(id);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const formattedProducts = useMemo(() => {
		return products.map((product) => {
			const stockTone = getStockTone(product.stock);
			const maxStock = Math.max(
				...products.map((entry) => Number(entry.stock || 0)),
				1,
				100,
			);
			return {
				originalId: product._id,
				id: `#${product._id.slice(-5)}`,
				name: product.title,
				SKU: `SKU: ${product.SKU}`,
				price: new Intl.NumberFormat("en-IN", {
					style: "currency",
					currency: "USD",
				}).format(Number(product.price || 0)),
				category: product.category,
				stockPercent: Math.min(
					100,
					Math.round((Number(product.stock || 0) / maxStock) * 100),
				),
				stockText: `${Number(product.stock || 0)} units`,
				stockColor: stockTone.progress,
				status: stockTone.label,
				statusBg: stockTone.bg,
				statusColor: stockTone.color,
			};
		});
	}, [products]);

	return (
		<Paper
			elevation={0}
			sx={{
				borderRadius: 3,
				border: `1px solid rgba(178, 177, 180, 0.5)`,
				overflow: "hidden",
				backgroundColor: customColors["surface-container-lowest"],
			}}>
			<Box sx={{ overflowX: "auto" }}>
				<Table sx={{ minWidth: 900 }}>
					<TableHead>
						<TableRow
							sx={{ backgroundColor: customColors["surface-container-low"] }}>
							{[
								"ID",
								"Name",
								"Category",
								"Price",
								"Stock Level",
								"Status",
								"Actions",
							].map((head, index) => (
								<TableCell
									key={head}
									sx={{
										px: 3,
										py: 2,
										fontSize: 11,
										fontWeight: 700,
										textTransform: "uppercase",
										letterSpacing: "0.12em",
										color: customColors["on-surface-variant"],
										textAlign:
											index === 3 ? "right" : index >= 5 ? "center" : "left",
									}}>
									{head}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{formattedProducts.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={7}
									sx={{
										px: 3,
										py: 6,
										textAlign: "center",
										color: customColors["on-surface-variant"],
									}}>
									{isLoading
										? "Loading products..."
										: "No products match the current filters."}
								</TableCell>
							</TableRow>
						) : (
							formattedProducts.map((row) => (
								<TableRow
									key={row.originalId}
									hover
									sx={{
										transition: "background-color 0.2s",
										"&:hover": {
											backgroundColor: customColors["surface-container-lowest"],
										},
									}}>
									<TableCell
										sx={{
											px: 3,
											py: 2,
											fontSize: 14,
											fontFamily: "monospace",
											color: customColors["on-surface-variant"],
										}}>
										{row.id}
									</TableCell>
									<TableCell sx={{ px: 3, py: 2 }}>
										<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
											<Box>
												<Typography
													sx={{
														fontSize: 14,
														fontWeight: 700,
														color: customColors["on-surface"],
													}}>
													{row.name}
												</Typography>
												<Typography
													sx={{
														fontSize: 12,
														color: customColors["on-surface-variant"],
													}}>
													{row.SKU}
												</Typography>
											</Box>
										</Box>
									</TableCell>
									<TableCell
										sx={{
											px: 3,
											py: 2,
											fontSize: 14,
											color: customColors["on-surface"],
										}}>
										{row.category}
									</TableCell>
									<TableCell
										sx={{
											px: 3,
											py: 2,
											fontSize: 14,
											fontWeight: 700,
											color: customColors["on-surface"],
											textAlign: "right",
										}}>
										{row.price}
									</TableCell>
									<TableCell sx={{ px: 3, py: 2 }}>
										<Box sx={{ width: "100%", maxWidth: 120 }}>
											<Box
												sx={{
													display: "flex",
													justifyContent: "space-between",
													fontSize: 10,
													fontWeight: 700,
													color: customColors["on-surface-variant"],
													mb: 0.5,
												}}>
												<span>{`${row.stockPercent}%`}</span>
												<span>{row.stockText}</span>
											</Box>
											<Box
												sx={{
													height: 6,
													width: "100%",
													backgroundColor: customColors["surface-container"],
													borderRadius: 999,
													overflow: "hidden",
												}}>
												<Box
													sx={{
														height: "100%",
														width: `${row.stockPercent}%`,
														backgroundColor: row.stockColor,
													}}
												/>
											</Box>
										</Box>
									</TableCell>
									<TableCell sx={{ px: 3, py: 2, textAlign: "center" }}>
										<Box
											sx={{
												display: "inline-flex",
												alignItems: "center",
												px: 1.5,
												py: 0.5,
												borderRadius: 999,
												fontSize: 12,
												fontWeight: 600,
												backgroundColor: row.statusBg,
												color: row.statusColor,
											}}>
											{row.status}
										</Box>
									</TableCell>
									<TableCell sx={{ px: 3, py: 2, textAlign: "center" }}>
										<IconButton
											onClick={(event) =>
												handleMenuClick(event, row.originalId)
											}
											sx={{
												color: customColors.outline,
												"&:hover": { color: customColors.primary },
											}}>
											<MaterialIcon name="more_vert" />
										</IconButton>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</Box>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleMenuClose}
				slotProps={{
					paper: {
						elevation: 3,
						sx: {
							backgroundColor: customColors["surface-container-lowest"],
							border: `1px solid ${customColors["surface-container-high"]}`,
							borderRadius: 2,
						},
					},
				}}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
				<MenuItem
					onClick={() => {
						onUpdateProduct(selectedProductId);
						handleMenuClose();
					}}
					sx={{ fontSize: 14, py: 1, px: 2, gap: 1 }}>
					<MaterialIcon name="edit" sx={{ fontSize: 20 }} />
					Update
				</MenuItem>
				<MenuItem
					onClick={() => {
						onDeleteProduct(selectedProductId);
						handleMenuClose();
					}}
					sx={{
						fontSize: 14,
						py: 1,
						px: 2,
						gap: 1,
						color: customColors.error,
					}}>
					<MaterialIcon name="delete" sx={{ fontSize: 20 }} />
					Delete
				</MenuItem>
			</Menu>
			<Box
				sx={{
					px: 3,
					py: 2,
					backgroundColor: customColors["surface-container-low"],
					borderTop: `1px solid rgba(178, 177, 180, 0.5)`,
				}}>
				<ProductPagination
					page={page}
					pageSize={pageSize}
					totalCount={totalCount}
					onPageChange={onPageChange}
				/>
			</Box>
		</Paper>
	);
};

export default ProductTable;
