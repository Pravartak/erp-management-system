import { Box, Button, Typography } from "@mui/material";
import { customColors } from "../../theme";
import MaterialIcon from "../MaterialIcon";

const OrdersHeader = ({ onCreatePurchaseOrder }) => (
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
		<Box>
			<Typography
				variant="h5"
				sx={{
					fontWeight: 700,
					color: "#0f172a",
				}}>
				Order Management
			</Typography>
			<Typography variant="body2" sx={{ color: customColors["on-surface-variant"]}}>
				Track and manage your global supply chain orders.
			</Typography>
		</Box>
		<Button
			variant="contained"
			disableElevation
			startIcon={<MaterialIcon name="add" sx={{ fontSize: 20 }} />}
			onClick={onCreatePurchaseOrder}
			sx={{
				backgroundColor: customColors.primary,
				color: customColors["on-primary"],
				px: 2.5,
				py: 1.25,
				borderRadius: 2,
				textTransform: "none",
				fontWeight: 600,
				fontSize: 14,
				boxShadow: "0px 8px 16px rgba(0, 95, 175, 0.25)",
				"&:hover": { backgroundColor: customColors["primary-dim"] },
				"&:active": { transform: "scale(0.95)" },
			}}>
			Create New PO
		</Button>
	</Box>
);

export default OrdersHeader;
