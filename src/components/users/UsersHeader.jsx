import { Box, Button, Typography } from "@mui/material";
import { customColors } from "../../theme";
import MaterialIcon from "../MaterialIcon";

const UsersHeader = ({ onAddNewUser }) => (
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
					fontWeight: 800,
					color: "#0f172a",
					letterSpacing: "-0.02em",
				}}>
				User Management
			</Typography>
			<Typography variant="body2" sx={{ color: customColors["on-surface-variant"], mt: 0.5 }}>
				Manage system access levels, permissions, and internal accounts.
			</Typography>
		</Box>
		<Button
			variant="contained"
			disableElevation
			startIcon={<MaterialIcon name="person_add" sx={{ fontSize: 20 }} />}
			onClick={onAddNewUser}
			sx={{
				backgroundColor: customColors.primary,
				color: customColors["on-primary"],
				textTransform: "none",
				fontWeight: 600,
				borderRadius: 2.5,
				px: 2.5,
				py: 1.25,
				boxShadow: "0px 10px 20px rgba(0, 95, 175, 0.2)",
				"&:hover": { backgroundColor: customColors["primary-dim"] },
				"&:active": { transform: "scale(0.98)" },
			}}>
			Add New User
		</Button>
	</Box>
);

export default UsersHeader;
