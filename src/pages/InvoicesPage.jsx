import { Box, Fab, Grid } from "@mui/material";
import MobileBottomNav from "../components/MobileBottomNav";
import SideNavBar from "../components/SideNavBar";
import TopNavBar from "../components/TopNavBar";
import { customColors } from "../theme";
import InvoicesClientHealth from "../components/invoices/InvoicesClientHealth";
import InvoicesDocument from "../components/invoices/InvoicesDocument";
import InvoicesHeader from "../components/invoices/InvoicesHeader";
import InvoicesHistory from "../components/invoices/InvoicesHistory";
import InvoicesSettings from "../components/invoices/InvoicesSettings";
import MaterialIcon from "../components/MaterialIcon";

const InvoicesPage = () => (
	<Box
		sx={{
			backgroundColor: customColors.background,
			color: customColors["on-background"],
			minHeight: "100vh",
		}}>
		<TopNavBar searchVariant="dashboard" />
		<SideNavBar activeLabel="Invoices" />
		<Box
			component="main"
			sx={{ pt: 8, pl: { xs: 0, md: 32 }, minHeight: "100vh" }}>
			<Box
				sx={{
					p: { xs: 3, lg: 5 },
					maxWidth: 1280,
					mx: "auto",
					display: "flex",
					flexDirection: "column",
					gap: 2,
				}}>
				<InvoicesHeader />
				<Grid container spacing={4}>
					<Grid item xs={12} lg={8}>
						<InvoicesDocument />
					</Grid>
					<Grid item xs={12} lg={4}>
						<Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
							<InvoicesSettings />
							<InvoicesClientHealth />
							<InvoicesHistory />
						</Box>
					</Grid>
				</Grid>
			</Box>
		</Box>
		<Fab
			variant="circular"
			sx={{
				position: "fixed",
				bottom: 32,
				right: 32,
				width: 56,
				height: 56,
				borderRadius: 3,
				backgroundColor: customColors["primary-container"],
				color: customColors["on-primary-container"],
				boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.2)",
				"&:hover": {
					transform: "scale(1.1)",
					backgroundColor: customColors["primary-container"],
				},
				zIndex: 50,
			}}>
			<MaterialIcon name="add" sx={{ fontSize: 24 }} />
		</Fab>
		<MobileBottomNav activeLabel="Invoices" />
	</Box>
);

export default InvoicesPage;
