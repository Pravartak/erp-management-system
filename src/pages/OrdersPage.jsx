import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { customColors } from "../theme";
import MobileBottomNav from "../components/MobileBottomNav";
import SideNavBar from "../components/SideNavBar";
import TopNavBar from "../components/TopNavBar";
import CreatePOModal from "../components/orders/CreatePOModal";
import OrdersAnalytics from "../components/orders/OrdersAnalytics";
import OrdersHeader from "../components/orders/OrdersHeader";
import OrdersLiveActivity from "../components/orders/OrdersLiveActivity";
import OrdersSummary from "../components/orders/OrdersSummary";
import OrdersTable from "../components/orders/OrdersTable";
import api from "../backend/api/api";

const OrdersPage = () => {
	const [isCreatePOModalOpen, setCreatePOModalOpen] = useState(false);
	const [purchaseOrders, setPurchaseOrders] = useState([]);

	useEffect(() => {
		const fetchPOs = async () => {
			try {
				const res = await api.get("/purchaseOrders");
				setPurchaseOrders(res.data);
			} catch (e) {
				console.error(e);
			}
		};
		fetchPOs();
	});

	return (
		<Box
			sx={{
				backgroundColor: customColors.background,
				color: customColors["on-background"],
				minHeight: "100vh",
			}}>
			<TopNavBar
				searchVariant="dashboard"
				searchPlaceholder="Search orders, customers, or IDs..."
			/>
			<SideNavBar activeLabel="Orders" />
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
					<OrdersHeader
						onCreatePurchaseOrder={() => setCreatePOModalOpen(true)}
					/>
					<CreatePOModal
						open={isCreatePOModalOpen}
						handleClose={() => setCreatePOModalOpen(false)}
						purchaseOrders={purchaseOrders}
					/>
					<OrdersSummary />
					<OrdersTable purchaseOrders={purchaseOrders} />
					<Grid container spacing={3} sx={{ mt: 4 }}>
						<Grid item xs={12} lg={8}>
							<OrdersAnalytics />
						</Grid>
						<Grid item xs={12} lg={4}>
							<OrdersLiveActivity />
						</Grid>
					</Grid>
				</Box>
			</Box>
			<MobileBottomNav activeLabel="Orders" />
		</Box>
	);
};

export default OrdersPage;
