import { Box } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../backend/api/api";
import DirectoryHeader from "../components/directory/DirectoryHeader";
import DirectoryQuickActions from "../components/directory/DirectoryQuickActions";
import DirectoryStats from "../components/directory/DirectoryStats";
import DirectoryTable from "../components/directory/DirectoryTable";
import MobileBottomNav from "../components/MobileBottomNav";
import SideNavBar from "../components/SideNavBar";
import TopNavBar from "../components/TopNavBar";
import { customColors } from "../theme";

const PAGE_SIZE = 6;

const DirectoryPage = () => {
	const [users, setUsers] = useState([]);
	const [products, setProducts] = useState([]);
	const [view, setView] = useState("all");
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);

	const fetchDirectoryData = useCallback(async () => {
		setIsLoading(true);
		try {
			const [usersResponse, productsResponse] = await Promise.all([
				api.get("/users"),
				api.get("/products"),
			]);
			setUsers(usersResponse.data);
			setProducts(productsResponse.data);
		} catch (e) {
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchDirectoryData();
	}, [fetchDirectoryData]);

	useEffect(() => {
		setPage(1);
	}, [view]);

	const records = useMemo(() => {
		const userRecords = users.map((user) => ({
			id: user._id,
			type: "user",
			name: user.name || "Unnamed user",
			details: user.role === "admin" ? "Admin account" : "Sales account",
			reference: user.email,
			status: "Active",
			statusTone: "success",
			metricLabel: "Joined",
			metricValue: user.createdAt,
		}));

		const productRecords = products.map((product) => ({
			id: product._id,
			type: "product",
			name: product.title || "Untitled product",
			details: product.category || "Uncategorized",
			reference: product.SKU || "No SKU",
			status: product.stock > 0 ? "In Stock" : "Out of Stock",
			statusTone: product.stock > 0 ? "info" : "danger",
			metricLabel: "Inventory Value",
			metricValue: Number(product.price || 0) * Number(product.stock || 0),
			price: product.price || 0,
			stock: product.stock || 0,
		}));

		if (view === "users") {
			return userRecords;
		}

		if (view === "products") {
			return productRecords;
		}

		return [...userRecords, ...productRecords];
	}, [products, users, view]);

	const totalPages = Math.max(1, Math.ceil(records.length / PAGE_SIZE));

	useEffect(() => {
		if (page > totalPages) {
			setPage(totalPages);
		}
	}, [page, totalPages]);

	const paginatedRecords = useMemo(() => {
		const start = (page - 1) * PAGE_SIZE;
		return records.slice(start, start + PAGE_SIZE);
	}, [page, records]);

	return (
		<Box
			sx={{
				backgroundColor: customColors.background,
				color: customColors["on-background"],
				minHeight: "100vh",
			}}>
			<TopNavBar searchVariant="dashboard" />
			<SideNavBar activeLabel="Directory" />
			<Box component="main" sx={{ pt: 8, pl: { xs: 0, md: 32 }, minHeight: "100vh" }}>
				<Box
					sx={{
						p: { xs: 3, lg: 5 },
						maxWidth: 1280,
						mx: "auto",
						display: "flex",
						flexDirection: "column",
						gap: 3,
					}}>
					<DirectoryHeader users={users} products={products} />
					<DirectoryStats users={users} products={products} isLoading={isLoading} />
					<DirectoryTable
						records={paginatedRecords}
						totalCount={records.length}
						page={page}
						pageSize={PAGE_SIZE}
						onPageChange={setPage}
						view={view}
						onViewChange={setView}
						isLoading={isLoading}
					/>
					<DirectoryQuickActions users={users} products={products} isLoading={isLoading} />
				</Box>
			</Box>
			<MobileBottomNav activeLabel="Home" />
		</Box>
	);
};

export default DirectoryPage;
