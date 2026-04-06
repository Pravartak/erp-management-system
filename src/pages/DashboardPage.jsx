import { Box, Grid, Typography, Button, Paper, Divider } from "@mui/material";
import { customColors } from "../theme";
import MaterialIcon from "../components/MaterialIcon";
import MetricCard from "../components/dashboard/MetricCard";
import SideNavBar from "../components/SideNavBar";
import TopNavBar from "../components/TopNavBar";
import MobileBottomNav from "../components/MobileBottomNav";
import { useEffect } from "react";
import api from '../backend/api/api.js';

const months = [
	{ label: "Jan", prev: "50%", current: "75%" },
	{ label: "Feb", prev: "66%", current: "80%" },
	{ label: "Mar", prev: "75%", current: "90%" },
	{ label: "Apr", prev: "50%", current: "75%" },
	{ label: "May", prev: "80%", current: "100%" },
	{ label: "Jun", prev: "66%", current: "85%" },
];

const trendItems = [
	{ label: "Bulk Orders", value: 72, color: customColors.primary },
	{ label: "Express Shipping", value: 48, color: customColors.secondary },
	{ label: "Pending Invoices", value: 15, color: customColors.tertiary },
];

const transactions = [
	{
		title: "Order #89210-A",
		detail: "2 mins ago • Tech Logistics Inc.",
		value: "+$4,200.00",
		icon: "add_shopping_cart",
		iconBg: "#d1fae5",
		iconColor: "#059669",
	},
	{
		title: "Order #89209-B",
		detail: "15 mins ago • Global Retail Corp.",
		value: "+$1,850.50",
		icon: "local_shipping",
		iconBg: "#f1f5f9",
		iconColor: "#64748b",
	},
	{
		title: "Refund #RF-0021",
		detail: "1 hour ago • Anonymous User",
		value: "-$299.00",
		icon: "undo",
		iconBg: "#fee2e2",
		iconColor: customColors.error,
		valueColor: customColors.error,
	},
];

const regions = [
	{
		label: "North America",
		value: "42.5%",
		color: customColors.primary,
		border: customColors["primary-container"],
		width: "42%",
	},
	{
		label: "Europe",
		value: "28.1%",
		color: customColors.secondary,
		border: customColors["secondary-container"],
		width: "28%",
	},
	{
		label: "Asia Pacific",
		value: "19.4%",
		color: customColors.tertiary,
		border: customColors["tertiary-container"],
		width: "19%",
	},
	{
		label: "Others",
		value: "10.0%",
		color: customColors["on-surface-variant"],
		border: customColors["surface-container-highest"],
		width: "10%",
	},
];

const DashboardPage = () => {
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await api.get("/protected");

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
					{/* <MetricsGrid /> */}
					<Grid container spacing={3} component="section">
						<Grid item xs={12} md={6} lg={3}>
							<MetricCard
								icon="payments"
								iconBg={customColors["primary-container"]}
								iconColor={customColors.primary}
								badge={{ icon: "trending_up", text: "12%" }}
								badgeBg="#ecfdf5"
								badgeColor="#059669"
								title="Total Sales"
								value="$2,482,900"
								hoverBorder="rgba(0, 95, 175, 0.3)"
							/>
						</Grid>
						<Grid item xs={12} md={6} lg={3}>
							<MetricCard
								icon="inventory"
								iconBg={customColors["secondary-container"]}
								iconColor={customColors["on-secondary-container"]}
								badge={{ text: "Stable" }}
								badgeBg="#f1f5f9"
								badgeColor="#64748b"
								title="Inventory Value"
								value="$842,000"
								hoverBorder="rgba(0, 95, 175, 0.3)"
							/>
						</Grid>
						<Grid item xs={12} md={6} lg={3}>
							<MetricCard
								icon="warning"
								iconBg="rgba(254, 137, 131, 0.3)"
								iconColor={customColors.error}
								badge={{ text: "Action Req." }}
								badgeBg="rgba(254, 137, 131, 0.2)"
								badgeColor={customColors.error}
								title="Low Stock Alerts"
								value="24 Items"
								hoverBorder="rgba(159, 64, 61, 0.3)"
							/>
						</Grid>
						<Grid item xs={12} md={6} lg={3}>
							<MetricCard
								icon="shopping_basket"
								iconBg={customColors["tertiary-container"]}
								iconColor={customColors["on-tertiary-container"]}
								badge={{ icon: "sync", text: "Processing" }}
								badgeBg={customColors["primary-container"]}
								badgeColor={customColors.primary}
								title="Open Orders"
								value="1,104"
								hoverBorder="rgba(0, 95, 175, 0.3)"
							/>
						</Grid>
					</Grid>
					<Grid container spacing={3} component="section">
						<Grid item xs={12} lg={8}>
							{/* <MonthlyRevenue /> */}
							<Paper
								elevation={0}
								sx={{
									p: 3,
									borderRadius: 3,
									border: `1px solid ${customColors["surface-container"]}`,
									backgroundColor: customColors["surface-container-lowest"],
									overflow: "hidden",
								}}>
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										mb: 4,
									}}>
									<Box>
										<Typography
											sx={{
												fontWeight: 700,
												fontSize: 18,
												color: customColors["on-surface"],
											}}>
											Monthly Revenue
										</Typography>
										<Typography
											sx={{
												fontSize: 12,
												color: customColors["on-surface-variant"],
											}}>
											Comparison between current and previous year
										</Typography>
									</Box>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											gap: 2,
											fontSize: 12,
										}}>
										<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
											<Box
												sx={{
													width: 12,
													height: 12,
													borderRadius: "50%",
													backgroundColor: customColors.primary,
												}}
											/>
											<Typography
												sx={{
													fontSize: 12,
													color: customColors["on-surface-variant"],
												}}>
												2024
											</Typography>
										</Box>
										<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
											<Box
												sx={{
													width: 12,
													height: 12,
													borderRadius: "50%",
													backgroundColor: customColors["primary-container"],
												}}
											/>
											<Typography
												sx={{
													fontSize: 12,
													color: customColors["on-surface-variant"],
												}}>
												2023
											</Typography>
										</Box>
									</Box>
								</Box>
								<Box
									sx={{
										height: 256,
										display: "flex",
										alignItems: "flex-end",
										justifyContent: "space-between",
										gap: 1,
										px: 1,
									}}>
									{months.map((month) => (
										<Box
											key={month.label}
											sx={{
												flex: 1,
												display: "flex",
												flexDirection: "column",
												alignItems: "center",
												gap: 1,
												height: "100%",
												justifyContent: "flex-end",
											}}>
											<Box
												sx={{
													width: "100%",
													display: "flex",
													justifyContent: "center",
													alignItems: "flex-end",
													gap: 0.5,
													height: "75%",
												}}>
												<Box
													sx={{
														width: 16,
														height: month.prev,
														backgroundColor: customColors["primary-container"],
														borderTopLeftRadius: 4,
														borderTopRightRadius: 4,
													}}
												/>
												<Box
													sx={{
														width: 16,
														height: month.current,
														backgroundColor: customColors.primary,
														borderTopLeftRadius: 4,
														borderTopRightRadius: 4,
													}}
												/>
											</Box>
											<Typography
												sx={{
													fontSize: 10,
													fontWeight: 500,
													color: customColors["on-surface-variant"],
												}}>
												{month.label}
											</Typography>
										</Box>
									))}
								</Box>
							</Paper>
						</Grid>
						<Grid item xs={12} lg={4}>
							{/* <OrderTrends /> */}
							<Paper
								elevation={0}
								sx={{
									p: 3,
									borderRadius: 3,
									border: `1px solid ${customColors["surface-container"]}`,
									backgroundColor: customColors["surface-container-lowest"],
									display: "flex",
									flexDirection: "column",
								}}>
								<Typography
									sx={{
										fontWeight: 700,
										fontSize: 18,
										color: customColors["on-surface"],
										mb: 0.5,
									}}>
									Order Trends
								</Typography>
								<Typography
									sx={{
										fontSize: 12,
										color: customColors["on-surface-variant"],
										mb: 3,
									}}>
									Daily processing velocity
								</Typography>
								<Box
									sx={{
										flex: 1,
										display: "flex",
										flexDirection: "column",
										gap: 3,
									}}>
									{trendItems.map((item) => (
										<Box
											key={item.label}
											sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
											<Box
												sx={{
													display: "flex",
													justifyContent: "space-between",
													fontSize: 12,
													fontWeight: 700,
												}}>
												<Typography sx={{ fontSize: 12, fontWeight: 700 }}>
													{item.label}
												</Typography>
												<Typography
													sx={{
														fontSize: 12,
														fontWeight: 700,
														color: item.color,
													}}>{`${item.value}%`}</Typography>
											</Box>
											<Box
												sx={{
													width: "100%",
													backgroundColor: customColors["surface-container"],
													borderRadius: 999,
													height: 8,
												}}>
												<Box
													sx={{
														width: `${item.value}%`,
														height: 8,
														backgroundColor: item.color,
														borderRadius: 999,
													}}
												/>
											</Box>
										</Box>
									))}
								</Box>
								<Box
									sx={{
										mt: 4,
										pt: 3,
										borderTop: `1px solid ${customColors["surface-container"]}`,
									}}>
									<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
										<Box sx={{ flex: 1, textAlign: "center" }}>
											<Typography
												sx={{
													fontSize: 12,
													color: customColors["on-surface-variant"],
													mb: 0.5,
												}}>
												Weekly Avg
											</Typography>
											<Typography sx={{ fontSize: 18, fontWeight: 800 }}>
												412
											</Typography>
										</Box>
										<Box
											sx={{
												width: 1,
												height: 40,
												backgroundColor: customColors["surface-container"],
											}}
										/>
										<Box sx={{ flex: 1, textAlign: "center" }}>
											<Typography
												sx={{
													fontSize: 12,
													color: customColors["on-surface-variant"],
													mb: 0.5,
												}}>
												Peak Hour
											</Typography>
											<Typography sx={{ fontSize: 18, fontWeight: 800 }}>
												14:00
											</Typography>
										</Box>
									</Box>
								</Box>
							</Paper>
						</Grid>
					</Grid>
					<Grid container spacing={3} component="section" sx={{ pb: 6 }}>
						<Grid item xs={12} lg={6}>
							{/* <RecentTransactions /> */}
							<Paper
								elevation={0}
								sx={{
									borderRadius: 3,
									border: `1px solid ${customColors["surface-container"]}`,
									backgroundColor: customColors["surface-container-lowest"],
									overflow: "hidden",
								}}>
								<Box
									sx={{
										p: 3,
										borderBottom: `1px solid ${customColors["surface-container"]}`,
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
									}}>
									<Typography
										sx={{ fontWeight: 700, color: customColors["on-surface"] }}>
										Recent Global Transactions
									</Typography>
									<Typography
										sx={{
											fontSize: 12,
											fontWeight: 700,
											color: customColors.primary,
										}}>
										View All
									</Typography>
								</Box>
								<Box>
									{transactions.map((item, index) => (
										<Box key={item.title}>
											<Box
												sx={{
													p: 2,
													display: "flex",
													alignItems: "center",
													justifyContent: "space-between",
													transition: "background-color 0.2s",
													"&:hover": {
														backgroundColor:
															customColors["surface-container-low"],
													},
												}}>
												<Box
													sx={{
														display: "flex",
														alignItems: "center",
														gap: 2,
													}}>
													<Box
														sx={{
															width: 40,
															height: 40,
															borderRadius: 2,
															backgroundColor: item.iconBg,
															color: item.iconColor,
															display: "flex",
															alignItems: "center",
															justifyContent: "center",
														}}>
														<MaterialIcon name={item.icon} />
													</Box>
													<Box>
														<Typography
															sx={{
																fontSize: 14,
																fontWeight: 700,
																color: customColors["on-surface"],
															}}>
															{item.title}
														</Typography>
														<Typography
															sx={{
																fontSize: 10,
																color: customColors["on-surface-variant"],
															}}>
															{item.detail}
														</Typography>
													</Box>
												</Box>
												<Typography
													sx={{
														fontSize: 14,
														fontWeight: 800,
														color:
															item.valueColor || customColors["on-surface"],
													}}>
													{item.value}
												</Typography>
											</Box>
											{index < transactions.length - 1 ? (
												<Divider
													sx={{
														borderColor: customColors["surface-container"],
													}}
												/>
											) : null}
										</Box>
									))}
								</Box>
							</Paper>
						</Grid>
						<Grid item xs={12} lg={6}>
							{/* <RegionalDistribution /> */}
							<Paper
								elevation={0}
								sx={{
									borderRadius: 3,
									border: `1px solid ${customColors["surface-container"]}`,
									backgroundColor: customColors["surface-container-lowest"],
									p: 3,
								}}>
								<Typography
									sx={{
										fontWeight: 700,
										color: customColors["on-surface"],
										mb: 3,
									}}>
									Regional Distribution
								</Typography>
								<Box
									sx={{
										position: "relative",
										height: 256,
										width: "100%",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}>
									<Box
										sx={{
											position: "absolute",
											inset: 0,
											opacity: 0.1,
										}}>
										<Box
											component="img"
											src="https://lh3.googleusercontent.com/aida-public/AB6AXuCASb3iXiKy3xXp6I-PiYGfeEgnYOIhcvGZjl7JI9QjxjZ5_JKnQ1bM3qYKW5-zS-RrS08vYehu5srszIO18X8TD7J2cWMdkyh_VP1XLNlGCHt7JiuVjrBcpgbwvxRp8d8kUQ0GnN_N9NltoaE1O2C4NOQgupf_ToiPUFYfhxE1JLUtekVILdbUMyZY0RMsI8W1IpYXC0dng_ieIlMHrAu1da5wQtR6jCClz8ltSt-_wRS6_e7kl84mE_xL24dZaqgq41o5mK4l21w"
											alt="Stylized world map showing global regions"
											sx={{
												width: "100%",
												height: "100%",
												objectFit: "cover",
												borderRadius: 2,
											}}
										/>
									</Box>
									<Box
										sx={{
											zIndex: 1,
											display: "grid",
											gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
											gap: 3,
											width: "100%",
										}}>
										{regions.map((region) => (
											<Box
												key={region.label}
												sx={{
													backgroundColor: "rgba(255, 255, 255, 0.8)",
													backdropFilter: "blur(6px)",
													p: 2,
													borderRadius: 2,
													border: `1px solid ${region.border}`,
												}}>
												<Typography
													sx={{
														fontSize: 10,
														textTransform: "uppercase",
														fontWeight: 800,
														color: region.color,
														mb: 0.5,
													}}>
													{region.label}
												</Typography>
												<Typography sx={{ fontSize: 20, fontWeight: 700 }}>
													{region.value}
												</Typography>
												<Box
													sx={{
														width: "100%",
														backgroundColor: "#f1f5f9",
														height: 4,
														mt: 1,
														borderRadius: 999,
														overflow: "hidden",
													}}>
													<Box
														sx={{
															width: region.width,
															height: "100%",
															backgroundColor: region.color,
														}}
													/>
												</Box>
											</Box>
										))}
									</Box>
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
