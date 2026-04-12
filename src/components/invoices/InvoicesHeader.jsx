import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from "@mui/material";
import { customColors } from "../../theme";
import MaterialIcon from "../MaterialIcon";

const InvoicesHeader = ({
	salesOrders,
	selectedSalesOrder,
	onSalesOrderChange,
	fetchSODetails,
	saveInvoice,
}) => (
	<Box
		component="section"
		sx={{
			display: "flex",
			flexDirection: { xs: "column", md: "row" },
			alignItems: { xs: "flex-start", md: "center" },
			justifyContent: "space-between",
			gap: 2,
			mb: 4,
		}}>
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: 2,
				minWidth: { xs: "100%", md: 320 },
			}}>
			<Typography
				variant="h5"
				sx={{
					fontWeight: 800,
					color: "#0f172a",
					letterSpacing: "-0.02em",
				}}>
				Invoice Preview
			</Typography>
			<FormControl size="small" fullWidth>
				<InputLabel id="sales-order-select-label">Sales Order</InputLabel>
				<Select
					labelId="sales-order-select-label"
					value={selectedSalesOrder}
					label="Sales Order"
					onChange={(event) => {
						onSalesOrderChange?.(event.target.value);
						fetchSODetails(event.target.value);
					}}>
					{salesOrders.map((salesOrder) => {
						const productNames = Array.isArray(salesOrder.products)
							? salesOrder.products.map((p) => p?.itemName).filter(Boolean).join(", ")
							: salesOrder.products?.itemName;
						return (
							<MenuItem key={salesOrder._id} value={salesOrder._id}>
								{productNames || "Unnamed item"}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
		</Box>
		<Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
			<Button
				variant="contained"
				disableElevation
				startIcon={<MaterialIcon name="save" sx={{ fontSize: 18 }} />}
				onClick={saveInvoice}
				sx={{
					backgroundColor: customColors.primary,
					color: customColors["on-primary"],
					textTransform: "none",
					fontWeight: 600,
					borderRadius: 2,
					px: 3,
					py: 1,
					boxShadow: "0px 10px 20px rgba(0, 95, 175, 0.2)",
					"&:hover": { backgroundColor: customColors["primary-dim"] },
				}}>
				Save Invoice
			</Button>
		</Box>
	</Box>
);

export default InvoicesHeader;
