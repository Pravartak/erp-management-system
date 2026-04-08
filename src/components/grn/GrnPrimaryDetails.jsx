import {
	Box,
	MenuItem,
	Paper,
	TextField,
	Typography,
	Button,
} from "@mui/material";
import MaterialIcon from "../MaterialIcon";

const GrnPrimaryDetails = ({ giveOrderNumber, orderDetails, completeForm, onFormChange }) => {
	const handleFormChange = (event) => {
		const { name, value } = event.target;
		onFormChange(name, value);
	};

	const searchPO = () => {
		if (!completeForm.poRef?.trim()) {
			return;
		}

		giveOrderNumber(completeForm.poRef.trim());
	};

	const handlePoRefBlur = () => {
		if (completeForm.poRef?.trim()) {
			searchPO();
		}
	};

	const handlePoRefKeyDown = (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			searchPO();
		}
	};

	return (
		<Paper
			elevation={0}
			sx={{
				p: 3,
				borderRadius: 2,
				border: "1px solid #e2e8f0",
				backgroundColor: "#fff",
			}}>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					gap: 1,
					mb: 3,
					borderBottom: "1px solid #f1f5f9",
					pb: 2,
				}}>
				<MaterialIcon name="assignment" sx={{ color: "#005faf" }} />
				<Typography sx={{ fontWeight: 700, color: "#1e293b" }}>
					Primary Reference
				</Typography>
			</Box>
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
					gap: 3,
				}}>
				<Box>
					<Typography sx={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#475569", mb: 1 }}>
						PO Reference
					</Typography>
					<Box sx={{ position: "relative" }}>
						<TextField
							fullWidth
							placeholder="e.g. #PO-2023-0045"
							size="small"
							name="poRef"
							value={completeForm.poRef}
							sx={{
								"& .MuiOutlinedInput-root": {
									borderRadius: 2,
									backgroundColor: "#fff",
								},
							}}
							onChange={handleFormChange}
							onBlur={handlePoRefBlur}
							onKeyDown={handlePoRefKeyDown}
						/>
						<Button onClick={searchPO} sx={{ minWidth: 0, position: "absolute", right: 4, top: 4, p: 1 }}>
							<MaterialIcon name="search" sx={{ color: "#94a3b8" }} />
						</Button>
					</Box>
				</Box>
				<Box>
					<Typography sx={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#475569", mb: 1 }}>
						Reception Date
					</Typography>
					<TextField
						fullWidth
						type="date"
						size="small"
						name="receptionDate"
						value={completeForm.receptionDate}
						sx={{
							"& .MuiOutlinedInput-root": {
								borderRadius: 2,
								backgroundColor: "#fff",
							},
						}}
						onChange={handleFormChange}
					/>
				</Box>
				<Box sx={{ gridColumn: { xs: "1", md: "1 / span 2" } }}>
					<Typography sx={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#475569", mb: 1 }}>
						Supplier
					</Typography>
					<TextField
						select
						fullWidth
						size="small"
						name="supplier"
						value={completeForm.supplier || ""}
						sx={{
							"& .MuiOutlinedInput-root": {
								borderRadius: 2,
								backgroundColor: "#fff",
							},
						}}
						onChange={handleFormChange}>
						<MenuItem value="">Select Supplier...</MenuItem>
						{orderDetails?.supplier ? <MenuItem value={orderDetails.supplier}>{orderDetails.supplier}</MenuItem> : null}
					</TextField>
				</Box>
				<Box>
					<Typography sx={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#475569", mb: 1 }}>
						Product ID
					</Typography>
					<TextField
						fullWidth
						placeholder="e.g. PRD-001"
						size="small"
						name="productId"
						value={completeForm.productId || ""}
						sx={{
							"& .MuiOutlinedInput-root": {
								borderRadius: 2,
								backgroundColor: "#fff",
							},
						}}
						InputProps={{ readOnly: true }}
					/>
				</Box>
				<Box>
					<Typography sx={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#475569", mb: 1 }}>
						SKU
					</Typography>
					<TextField
						fullWidth
						placeholder="e.g. SKU-12345"
						size="small"
						name="SKU"
						value={completeForm.SKU || ""}
						sx={{
							"& .MuiOutlinedInput-root": {
								borderRadius: 2,
								backgroundColor: "#fff",
							},
						}}
						InputProps={{ readOnly: true }}
					/>
				</Box>
			</Box>
		</Paper>
	);
};

export default GrnPrimaryDetails;
