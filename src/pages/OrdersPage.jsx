import { useEffect, useState, useCallback } from "react";
import { Box, Grid } from "@mui/material";
import { customColors } from "../theme";
import MobileBottomNav from "../components/MobileBottomNav";
import SideNavBar from "../components/SideNavBar";
import TopNavBar from "../components/TopNavBar";
import CreatePOModal from "../components/orders/CreatePOModal";
import CreateSOModal from "../components/orders/CreateSOModal";
import UpdateOrdersModal from "../components/orders/UpdateOrdersModal";
import OrdersAnalytics from "../components/orders/OrdersAnalytics";
import OrdersHeader from "../components/orders/OrdersHeader";
import OrdersLiveActivity from "../components/orders/OrdersLiveActivity";
import OrdersSummary from "../components/orders/OrdersSummary";
import OrdersTable from "../components/orders/OrdersTable";
import api from "../backend/api/api";

const OrdersPage = () => {
	const [isCreatePOModalOpen, setCreatePOModalOpen] = useState(false);
	const [isCreateSOModalOpen, setCreateSOModalOpen] = useState(false);
	const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
	const [purchaseOrders, setPurchaseOrders] = useState([]);
	const [salesOrders, setSalesOrders] = useState([]);
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const fetchOrders = useCallback(async () => {
		setIsLoading(true);
		try {
			const [purchaseOrdersResponse, salesOrdersResponse] = await Promise.all([
				api.get("/purchaseOrders"),
				api.get("/salesOrders"),
			]);

			setPurchaseOrders(purchaseOrdersResponse.data);
			setSalesOrders(salesOrdersResponse.data);
		} catch (e) {
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchOrders();
	}, [fetchOrders]);

	const handleDeletePurchaseOrder = async (id) => {
		try {
			await api.delete(`/purchaseOrders/${id}`);
			setPurchaseOrders((currentOrders) =>
				currentOrders.filter((order) => order._id !== id),
			);
		} catch (e) {
			console.error(e);
		}
	};

	const handleUpdateOpenModal = (id) => {
		setSelectedOrder(id);
		setUpdateModalOpen(true);
	};

	const handleUpdateCloseModal = () => {
		setSelectedOrder(null);
		setUpdateModalOpen(false);
	};

	const handleDeleteSalesOrder = async (id) => {
		try {
			await api.delete(`/salesOrders/${id}`);
			setSalesOrders((currentOrders) =>
				currentOrders.filter((order) => order._id !== id),
			);
		} catch (e) {
			console.error(e);
		}
	};

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
						onCreateSalesOrders={() => setCreateSOModalOpen(true)}
					/>
					<CreatePOModal
						open={isCreatePOModalOpen}
						handleClose={() => setCreatePOModalOpen(false)}
						purchaseOrders={purchaseOrders}
						onSuccess={fetchOrders}
					/>
					<CreateSOModal
						open={isCreateSOModalOpen}
						handleClose={() => setCreateSOModalOpen(false)}
						salesOrders={salesOrders}
						onSuccess={fetchOrders}
					/>
					<OrdersSummary />
					<OrdersTable
						purchaseOrders={purchaseOrders}
						salesOrders={salesOrders}
						onDeletePurchaseOrder={handleDeletePurchaseOrder}
						onDeleteSalesOrder={handleDeleteSalesOrder}
						onUpdateOrder={handleUpdateOpenModal}
						isLoading={isLoading}
					/>
					<UpdateOrdersModal
						open={isUpdateModalOpen}
						handleClose={handleUpdateCloseModal}
						id={selectedOrder}
						onSuccess={fetchOrders}
					/>
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
