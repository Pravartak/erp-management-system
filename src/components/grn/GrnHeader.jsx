import { Box, Button, Typography } from "@mui/material";
import { customColors } from "../../theme";
import MaterialIcon from "../MaterialIcon";

const GrnHeader = ({ submitGRN }) => (
	<Box
		sx={{
			display: "flex",
			flexDirection: { xs: "column", md: "row" },
			justifyContent: "space-between",
			alignItems: { xs: "flex-start", md: "flex-end" },
			gap: 2,
			mb: 4,
		}}>
		<Box>
			<Typography
				variant="h5"
				sx={{
					fontWeight: 800,
					color: "#0f172a",
					letterSpacing: "-0.02em",
				}}>
				Create Goods Received Note
			</Typography>
			<Typography
				variant="body2"
				sx={{ color: customColors["on-surface-variant"] }}>
				Verify and record incoming stock against purchase orders.
			</Typography>
		</Box>
		<Box sx={{ display: "flex", gap: 1.5 }}>
			<Button
				variant="outlined"
				sx={{
					px: 2,
					py: 1,
					borderRadius: 2,
					textTransform: "none",
					fontWeight: 600,
					borderColor: customColors["outline-variant"],
					color: customColors["on-surface"],
					"&:hover": { backgroundColor: customColors["surface-container-low"] },
				}}>
				Discard
			</Button>
			<Button
				variant="contained"
				disableElevation
				startIcon={<MaterialIcon name="check_circle" sx={{ fontSize: 18 }} />}
				sx={{
					px: 2.5,
					py: 1,
					borderRadius: 2,
					textTransform: "none",
					fontWeight: 700,
					backgroundColor: customColors.primary,
					color: customColors["on-primary"],
					boxShadow: "0px 10px 20px rgba(0, 95, 175, 0.2)",
					"&:hover": { backgroundColor: customColors["primary-dim"] },
				}}
				onClick={submitGRN}>
				Submit GRN
			</Button>
		</Box>
	</Box>
);

export default GrnHeader;
