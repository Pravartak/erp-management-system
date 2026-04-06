import { Box, Button, Typography } from "@mui/material";
import { customColors } from "../../theme";
import MaterialIcon from "../MaterialIcon";

const InvoicesHeader = () => (
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
		<Typography
    variant="h5"
			sx={{
				fontWeight: 800,
				color: "#0f172a",
				letterSpacing: "-0.02em",
			}}>
			Invoice Preview
		</Typography>
		<Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
			<Button
				variant="outlined"
				startIcon={<MaterialIcon name="download" sx={{ fontSize: 18 }} />}
				sx={{
					backgroundColor: "#fff",
					borderColor: "#e2e8f0",
					color: "#475569",
					textTransform: "none",
					fontWeight: 600,
					borderRadius: 2,
					px: 2,
					py: 1,
					"&:hover": { backgroundColor: "#f8fafc", borderColor: "#e2e8f0" },
				}}>
				Download PDF
			</Button>
			<Button
				variant="contained"
				disableElevation
				startIcon={<MaterialIcon name="send" sx={{ fontSize: 18 }} />}
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
				Send via Email
			</Button>
		</Box>
	</Box>
);

export default InvoicesHeader;
