import { Typography } from "@mui/material";
import { customColors } from "../../theme";

const ProductFooter = ({ products, filteredCount, isLoading }) => {
	const totalStock = products.reduce((sum, product) => sum + Number(product.stock || 0), 0);
	const lowStockCount = products.filter((product) => Number(product.stock || 0) > 0 && Number(product.stock || 0) <= 10).length;

	return (
		<Typography component="footer" sx={{ mt: 4, textAlign: "center", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 600, color: customColors["on-surface-variant"] }}>
			{isLoading
				? "Refreshing Inventory Workspace"
				: `${filteredCount} Visible • ${products.length} Total Products • ${totalStock} Units in Stock • ${lowStockCount} Low Stock`}
		</Typography>
	);
};

export default ProductFooter;
