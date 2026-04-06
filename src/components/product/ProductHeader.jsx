import { Box, Button, Typography } from "@mui/material";
import { customColors } from "../../theme";
import MaterialIcon from "../MaterialIcon";

const ProductHeader = ({ onAddNewProduct, products, filteredCount, isLoading, currentPageProducts }) => {
	const totalInventoryValue = products.reduce(
		(total, product) => total + Number(product.price || 0) * Number(product.stock || 0),
		0,
	);

	return (
		<Box component="section" sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "flex-start", md: "center" }, justifyContent: "space-between", gap: 2 }}>
			<Box>
				<Typography variant="h5" sx={{ fontWeight: 800, color: customColors["on-surface"], letterSpacing: "-0.02em" }}>
					Product Management
				</Typography>
				<Typography variant="body2" sx={{ color: customColors["on-surface-variant"] }}>
					{isLoading
						? "Refreshing inventory snapshot..."
						: `Tracking ${products.length} products with ${filteredCount} currently matching your filters. Inventory value: ${new Intl.NumberFormat("en-IN", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(totalInventoryValue)}.`}
				</Typography>
			</Box>
			<Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
				<Button variant="contained" disableElevation onClick={onAddNewProduct} startIcon={<MaterialIcon name="add" />} sx={{ backgroundColor: customColors["primary-container"], color: customColors["on-primary-container"], textTransform: "none", fontWeight: 600, borderRadius: 2, px: 2, py: 1, "&:hover": { backgroundColor: "rgba(212, 227, 255, 0.8)" } }}>
					Add New Product
				</Button>
				<Button
					variant="outlined"
					startIcon={<MaterialIcon name="file_download" />}
					disabled={currentPageProducts.length === 0}
					onClick={() => {
						const rows = ["Title,SKU,Category,Price,Stock"];
						currentPageProducts.forEach((product) => {
							rows.push([product.title, product.SKU, product.category, product.price, product.stock].map((value) => `"${value ?? ""}"`).join(","));
						});
						const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" });
						const link = document.createElement("a");
						link.href = URL.createObjectURL(blob);
						link.download = "products-current-page.csv";
						link.click();
						URL.revokeObjectURL(link.href);
					}}
					sx={{ borderColor: customColors.outline, color: customColors["on-surface"], textTransform: "none", fontWeight: 500, borderRadius: 2, px: 2, py: 1, "&:hover": { backgroundColor: customColors["surface-container"], borderColor: customColors.outline } }}>
					Export
				</Button>
			</Box>
		</Box>
	);
};

export default ProductHeader;
