import { Box, Grid, Typography, Button, Paper } from "@mui/material";
import { customColors } from "../theme";
import MaterialIcon from "../components/MaterialIcon";
import MetricCard from "../components/dashboard/MetricCard";
import SideNavBar from "../components/SideNavBar";
import TopNavBar from "../components/TopNavBar";
import MobileBottomNav from "../components/MobileBottomNav";
import { useEffect, useState } from "react";
import api from "../backend/api/api.js";
import { Line, Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
	Filler,
);

const revenueData = {
	labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
	datasets: [
		{
			label: "Revenue ($)",
			data: [12000, 19000, 15000, 22000, 30000, 28000, 35000],
			borderColor: customColors.primary,
			backgroundColor: "rgba(0, 95, 175, 0.1)",
			fill: true,
			tension: 0.4,
		},
	],
};

const chartOptions = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: { position: "top" },
	},
};

const DashboardPage = () => {
	const [allData, setAllData] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await api.get("/dashboard");
				setAllData(res.data);
				console.log(res.data);
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, []);

	return (
		<Box
			sx={{
				backgroundColor: customColors.background,
				color: customColors["on-background"],
				minHeight: "100vh",
			}}>
			<TopNavBar />
			<SideNavBar activeLabel="Dashboard" />
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
						gap: 4,
					}}>
					{/* <DashboardHeader /> */}
					<Box
						component="section"
						sx={{
							display: "flex",
							flexDirection: { xs: "column", md: "row" },
							justifyContent: "space-between",
							alignItems: { xs: "flex-start", md: "center" },
							gap: 2,
						}}>
						<Box>
							<Typography
								variant="h5"
								sx={{
									fontWeight: 800,
									color: customColors["on-surface"],
									letterSpacing: "-0.02em",
								}}>
								Executive Dashboard
							</Typography>
							<Typography
								variant="body2"
								sx={{ color: customColors["on-surface-variant"] }}>
								Real-time enterprise metrics and performance insights.
							</Typography>
						</Box>
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							<Button
								variant="contained"
								disableElevation
								startIcon={
									<MaterialIcon name="calendar_today" sx={{ fontSize: 18 }} />
								}
								sx={{
									backgroundColor: customColors["surface-container-high"],
									color: customColors["on-surface"],
									textTransform: "none",
									fontWeight: 600,
									borderRadius: 2,
									"&:hover": {
										backgroundColor: customColors["surface-container-highest"],
									},
								}}>
								Last 30 Days
							</Button>
							<Button
								variant="contained"
								disableElevation
								startIcon={
									<MaterialIcon name="download" sx={{ fontSize: 18 }} />
								}
								sx={{
									backgroundColor: customColors.primary,
									color: customColors["on-primary"],
									textTransform: "none",
									fontWeight: 600,
									borderRadius: 2,
									boxShadow: "0px 8px 20px rgba(0, 95, 175, 0.25)",
									"&:hover": {
										backgroundColor: customColors["primary-dim"],
									},
								}}>
								Export Report
							</Button>
						</Box>
					</Box>
					<Grid container spacing={3} component="section" sx={{ mb: 4 }}>
						<Grid item xs={12} md={6} lg={3}>
							<MetricCard
								icon="inventory_2"
								iconBg={customColors["secondary-container"]}
								iconColor={customColors["on-secondary-container"]}
								badge={{ text: "Updated" }}
								badgeBg="#f1f5f9"
								badgeColor="#64748b"
								title="Total Products"
								value={allData.totalProducts || "0"}
								hoverBorder="rgba(0, 95, 175, 0.3)"
							/>
						</Grid>
						<Grid item xs={12} md={6} lg={3}>
							<MetricCard
								icon="shopping_basket"
								iconBg={customColors["primary-container"]}
								iconColor={customColors.primary}
								badge={{ icon: "trending_up", text: "8%" }}
								badgeBg="#ecfdf5"
								badgeColor="#059669"
								title="Total Sales Orders"
								value={allData.totalSalesOrders || "0"}
								hoverBorder="rgba(0, 95, 175, 0.3)"
							/>
						</Grid>
						<Grid item xs={12} md={6} lg={3}>
							<MetricCard
								icon="receipt"
								iconBg={customColors["tertiary-container"]}
								iconColor={customColors["on-tertiary-container"]}
								badge={{ text: "Active" }}
								badgeBg="#f1f5f9"
								badgeColor="#64748b"
								title="Total Purchase Orders"
								value={allData.totalPurchaseOrders || "0"}
								hoverBorder="rgba(0, 95, 175, 0.3)"
							/>
						</Grid>
						<Grid item xs={12} md={6} lg={3}>
							<MetricCard
								icon="payments"
								iconBg="#ecfdf5"
								iconColor="#059669"
								badge={{ icon: "trending_up", text: "15%" }}
								badgeBg="#d1fae5"
								badgeColor="#047857"
								title="Total Revenue"
								value={"$" + allData.totalRevenue || "$0"}
								hoverBorder="rgba(5, 150, 105, 0.3)"
							/>
						</Grid>
					</Grid>
					<Grid container spacing={3} component="section" sx={{ pb: 6 }}>
						<Grid item xs={12} lg={8}>
							<Paper
								elevation={0}
								sx={{
									p: 3,
									borderRadius: 3,
									border: `1px solid ${customColors["surface-container"]}`,
									backgroundColor: customColors["surface-container-lowest"],
									height: 400,
								}}>
								<Typography
									sx={{
										fontWeight: 700,
										fontSize: 18,
										color: customColors["on-surface"],
										mb: 2,
									}}>
									Revenue Over Time
								</Typography>
								<Box sx={{ height: 300 }}>
									<Line data={revenueData} options={chartOptions} />
								</Box>
							</Paper>
						</Grid>
						<Grid item xs={12} lg={4}>
							<Paper
								elevation={0}
								sx={{
									p: 3,
									borderRadius: 3,
									border: `1px solid ${customColors["surface-container"]}`,
									backgroundColor: customColors["surface-container-lowest"],
									height: 400,
								}}>
								<Typography
									sx={{
										fontWeight: 700,
										fontSize: 18,
										color: customColors["on-surface"],
										mb: 2,
									}}>
									Orders Overview
								</Typography>
								<Box sx={{ height: 300 }}>
									<Bar
										data={{
											labels: ["Orders"],
											datasets: [
												{
													label: "Sales",
													data: [allData.totalSalesOrders || 0],
													backgroundColor: customColors.primary,
													borderRadius: 4,
												},
												{
													label: "Purchase",
													data: [allData.totalPurchaseOrders || 0],
													backgroundColor: "#059669",
													borderRadius: 4,
												},
											],
										}}
										options={chartOptions}
									/>
								</Box>
							</Paper>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<MobileBottomNav activeLabel="Home" />
		</Box>
	);
};

export default DashboardPage;
