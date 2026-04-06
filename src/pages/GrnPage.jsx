import { Box, Grid } from "@mui/material";
import { customColors } from "../theme";
import MobileBottomNav from "../components/MobileBottomNav";
import SideNavBar from "../components/SideNavBar";
import TopNavBar from "../components/TopNavBar";
import GrnDeliveryDocuments from "../components/grn/GrnDeliveryDocuments";
import GrnHeader from "../components/grn/GrnHeader";
import GrnInspectionNotes from "../components/grn/GrnInspectionNotes";
import GrnLineItems from "../components/grn/GrnLineItems";
import GrnPrimaryDetails from "../components/grn/GrnPrimaryDetails";
import GrnReceiptInfo from "../components/grn/GrnReceiptInfo";

const GrnPage = () => (
	<Box
		sx={{
			backgroundColor: customColors.background,
			color: customColors["on-background"],
			minHeight: "100vh",
		}}>
		<TopNavBar
			searchVariant="dashboard"
			searchPlaceholder="Search orders, items..."
		/>
		<SideNavBar activeLabel="GRN" />
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
				<GrnHeader />
				<Grid container spacing={3}>
					<Grid item xs={12} lg={8}>
						<Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
							<GrnPrimaryDetails />
							<GrnLineItems />
						</Box>
					</Grid>
					<Grid item xs={12} lg={4}>
						<Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
							<GrnInspectionNotes />
							<GrnDeliveryDocuments />
							<GrnReceiptInfo />
						</Box>
					</Grid>
				</Grid>
			</Box>
		</Box>
		<MobileBottomNav activeLabel="Invoices" />
	</Box>
);

export default GrnPage;
