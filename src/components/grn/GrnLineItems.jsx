import {
	Box,
	IconButton,
	MenuItem,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import MaterialIcon from "../MaterialIcon";

const CONDITION_OPTIONS = ["Good", "Partial", "Damaged"];

const GrnLineItems = ({ orderDetails, lineItems = [], onLineItemsChange }) => {
	const handleItemChange = (index, field, value) => {
		const nextItems = lineItems.map((item, itemIndex) => {
			if (itemIndex !== index) {
				return item;
			}

			return {
				...item,
				[field]: field === "receivedQuantity" ? Number(value || 0) : value,
			};
		});

		onLineItemsChange(nextItems);
	};

	return (
		<Paper
			elevation={0}
			sx={{
				borderRadius: 2,
				border: "1px solid #e2e8f0",
				backgroundColor: "#fff",
				overflow: "hidden",
			}}>
			<Box
				sx={{
					p: 3,
					borderBottom: "1px solid #f1f5f9",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					backgroundColor: "rgba(248, 250, 252, 0.5)",
				}}>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					<MaterialIcon name="inventory_2" sx={{ color: "#005faf" }} />
					<Typography sx={{ fontWeight: 700, color: "#1e293b" }}>
						Line Items
					</Typography>
				</Box>
			</Box>
			<Box sx={{ overflowX: "auto" }}>
				<Table sx={{ minWidth: 700 }}>
					<TableHead>
						<TableRow sx={{ backgroundColor: "#f8fafc", color: "#475569" }}>
							{["Item Name", "Qty Ordered", "Qty Received", "Condition", ""].map((head, index) => (
								<TableCell
									key={head || index}
									sx={{
										px: 3,
										py: 2,
										fontSize: 10,
										fontWeight: 700,
										textTransform: "uppercase",
										letterSpacing: "0.12em",
										color: "#475569",
										textAlign: index === 4 ? "center" : "left",
									}}>
									{head}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{lineItems.length > 0 ? (
							lineItems.map((item, index) => (
								<TableRow key={`${item.itemName}-${index}`} hover sx={{ "&:hover": { backgroundColor: "#f8fafc" } }}>
									<TableCell sx={{ px: 3, py: 2 }}>
										<Typography sx={{ fontWeight: 600, color: "#0f172a" }}>{item.itemName}</Typography>
										<Typography sx={{ mt: 0.5, fontSize: 12, color: "#64748b" }}>
											{orderDetails?.orderNumber || "PO not linked"}
										</Typography>
									</TableCell>
									<TableCell sx={{ px: 3, py: 2, color: "#64748b" }}>{item.quantityOrdered}</TableCell>
									<TableCell sx={{ px: 3, py: 2 }}>
										<TextField
											size="small"
											type="number"
											value={item.receivedQuantity}
											inputProps={{ min: 0, style: { textAlign: "center", width: 60 } }}
											sx={{
												"& .MuiOutlinedInput-root": {
													borderRadius: 1,
													height: 32,
												},
											}}
											onChange={(event) => handleItemChange(index, "receivedQuantity", event.target.value)}
										/>
									</TableCell>
									<TableCell sx={{ px: 3, py: 2 }}>
										<TextField
											select
											size="small"
											value={CONDITION_OPTIONS.includes(item.condition) ? item.condition : "Good"}
											sx={{ minWidth: 160, "& .MuiOutlinedInput-root": { borderRadius: 2, backgroundColor: "#fff" } }}
											onChange={(event) => handleItemChange(index, "condition", event.target.value)}>
											{CONDITION_OPTIONS.map((condition) => (
												<MenuItem key={condition} value={condition}>
													{condition}
												</MenuItem>
											))}
										</TextField>
									</TableCell>
									<TableCell sx={{ px: 3, py: 2, textAlign: "center" }}>
										<IconButton sx={{ color: "#94a3b8", "&:hover": { color: "#9f403d" } }}>
											<MaterialIcon name="delete" />
										</IconButton>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={5} sx={{ px: 3, py: 5, textAlign: "center", color: "#64748b" }}>
									Search a purchase order to load line items.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</Box>
		</Paper>
	);
};

export default GrnLineItems;
