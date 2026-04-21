import { Box } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../backend/api/api";
import AddProductModal from "../components/product/AddProductModal";
import ProductFilters from "../components/product/ProductFilters";
import ProductFooter from "../components/product/ProductFooter";
import ProductHeader from "../components/product/ProductHeader";
import ProductTable from "../components/product/ProductTable";
import UpdateProductModal from "../components/product/UpdateProductModal";
import MobileBottomNav from "../components/MobileBottomNav";
import SideNavBar from "../components/SideNavBar";
import TopNavBar from "../components/TopNavBar";
import { customColors } from "../theme";

const PAGE_SIZE = 6;

const getStockStatus = (stock) => {
	const numericStock = Number(stock || 0);

	if (numericStock <= 0) {
		return "Out of Stock";
	}

	if (numericStock <= 10) {
		return "Low Stock";
	}

	return "In Stock";
};

const ProductManagementPage = () => {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All Categories");
	const [selectedStatus, setSelectedStatus] = useState("All Status");
	const [isAddModalOpen, setAddModalOpen] = useState(false);
	const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
	const [selectedProductId, setSelectedProductId] = useState(null);

	const fetchProducts = useCallback(async () => {
		setIsLoading(true);
		try {
			const res = await api.get("/products");
			setProducts(res.data);
		} catch (e) {
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	const categories = useMemo(() => {
		return Array.from(
			new Set(products.map((product) => product.category).filter(Boolean)),
		).sort();
	}, [products]);

	const filteredProducts = useMemo(() => {
		return products.filter((product) => {
			const matchesSearch = [product.title, product.SKU, product.category]
				.filter(Boolean)
				.some((value) =>
					value.toLowerCase().includes(searchTerm.toLowerCase()),
				);
			const matchesCategory =
				selectedCategory === "All Categories" ||
				product.category === selectedCategory;
			const status = getStockStatus(product.stock);
			const matchesStatus =
				selectedStatus === "All Status" || status === selectedStatus;

			return matchesSearch && matchesCategory && matchesStatus;
		});
	}, [products, searchTerm, selectedCategory, selectedStatus]);

	const totalPages = Math.max(
		1,
		Math.ceil(filteredProducts.length / PAGE_SIZE),
	);

	useEffect(() => {
		setPage(1);
	}, [searchTerm, selectedCategory, selectedStatus]);

	useEffect(() => {
		if (page > totalPages) {
			setPage(totalPages);
		}
	}, [page, totalPages]);

	const paginatedProducts = useMemo(() => {
		const start = (page - 1) * PAGE_SIZE;
		return filteredProducts.slice(start, start + PAGE_SIZE);
	}, [filteredProducts, page]);

	const handleAddOpenModal = () => {
		setAddModalOpen(true);
	};

	const handleUpdateOpenModal = (id) => {
		setSelectedProductId(id);
		setUpdateModalOpen(true);
	};

	const handleAddCloseModal = () => {
		setAddModalOpen(false);
	};

	const handleUpdateCloseModal = () => {
		setSelectedProductId(null);
		setUpdateModalOpen(false);
	};

	const handleDeleteProduct = async (id) => {
		try {
			await api.delete(`/products/${id}`);
			setProducts((currentProducts) =>
				currentProducts.filter((product) => product._id !== id),
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
				showNotificationDot={false}
				avatarSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuCqJn9p72NsgAFcB02G2GROwDkfXHpNIh8kiEAYBjggxXX2WsR2-Od8Qj9MYNNZ2cIPde7EvFfAA38ygrhPrQ_bWlALKJ1-F2lGZV7fVuEUgeANuA5Km000S57dQv0baj1P4KuwQ_uy80sk8zn995uaboNlVlNOsmSX5nBuJhYCvSZszgkumRb5cVgHwB6owt6i4xLo2nMhLD_ZPKlSQXIG8feBLbvzS5Yw_B-hb2J1YEG-TSSCYAM6wU3pPSTN5DSuiPJVsG8MQ3U"
			/>
			<SideNavBar activeLabel="Product Management" />
			<Box
				component="main"
				sx={{ pt: 8, pl: { xs: 0, md: 32 }, minHeight: "100vh", pb: { xs: 10, md: 0 } }}>
				<Box
					sx={{
						p: { xs: 2, sm: 3, lg: 5 },
						maxWidth: 1280,
						mx: "auto",
						display: "flex",
						flexDirection: "column",
						gap: 4,
					}}>
					<ProductHeader
						onAddNewProduct={handleAddOpenModal}
						products={products}
						filteredCount={filteredProducts.length}
						isLoading={isLoading}
						currentPageProducts={paginatedProducts}
					/>
					<AddProductModal
						open={isAddModalOpen}
						handleClose={handleAddCloseModal}
						onSuccess={fetchProducts}
					/>
					<UpdateProductModal
						open={isUpdateModalOpen}
						handleClose={handleUpdateCloseModal}
						id={selectedProductId}
						onSuccess={fetchProducts}
					/>
					<ProductFilters
						searchTerm={searchTerm}
						onSearchChange={setSearchTerm}
						selectedCategory={selectedCategory}
						onCategoryChange={setSelectedCategory}
						selectedStatus={selectedStatus}
						onStatusChange={setSelectedStatus}
						categories={categories}
						products={products}
						filteredCount={filteredProducts.length}
					/>
					<ProductTable
						products={paginatedProducts}
						totalCount={filteredProducts.length}
						page={page}
						pageSize={PAGE_SIZE}
						onPageChange={setPage}
						onUpdateProduct={handleUpdateOpenModal}
						onDeleteProduct={handleDeleteProduct}
						isLoading={isLoading}
					/>
					<ProductFooter
						products={products}
						filteredCount={filteredProducts.length}
						isLoading={isLoading}
					/>
				</Box>
			</Box>
			<MobileBottomNav activeLabel="Stock" />
		</Box>
	);
};

export default ProductManagementPage;
