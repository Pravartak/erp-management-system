import { Box, Button, Typography } from "@mui/material";
import { customColors } from "../../theme";
import MaterialIcon from "../MaterialIcon";

const DirectoryHeader = ({ users, products }) => (
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
			<Typography variant="h5" sx={{ fontWeight: 700, color: customColors["on-surface"] }}>
				Directory
			</Typography>
			<Typography variant="body2" sx={{ color: customColors["on-surface-variant"] }}>
				Browse {users.length} internal users and {products.length} active catalog records from one place.
			</Typography>
		</Box>
		<Button
			variant="contained"
			disableElevation
			startIcon={<MaterialIcon name="sync" />}
			sx={{
				backgroundColor: "#005faf",
				color: "#fff",
				px: 2.5,
				py: 1.25,
				borderRadius: 2,
				textTransform: "none",
				fontWeight: 600,
				boxShadow: "0px 10px 24px rgba(59, 130, 246, 0.2)",
				"&:hover": { backgroundColor: "#00539a" },
			}}>
			Directory Synced
		</Button>
	</Box>
);

export default DirectoryHeader;
