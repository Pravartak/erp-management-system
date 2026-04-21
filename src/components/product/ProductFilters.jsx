import { Box, Grid, InputBase, MenuItem, Paper, Select, Typography } from "@mui/material";
import { customColors } from "../../theme";
import MaterialIcon from "../MaterialIcon";

const ProductFilters = ({
	searchTerm,
	onSearchChange,
	selectedCategory,
	onCategoryChange,
	selectedStatus,
	onStatusChange,
	categories,
	products,
	filteredCount,
}) => (
	<Grid container spacing={2} sx={{ mb: 4 }}>
		<Grid item xs={12} lg={6}>
			<Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: `1px solid rgba(178, 177, 180, 0.5)`, display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "stretch", sm: "center" }, gap: 1.5, backgroundColor: customColors["surface-container-lowest"] }}>
				<Box sx={{ flex: 1, display: "flex", alignItems: "center", backgroundColor: customColors["surface-container-low"], borderRadius: 2, px: 2, py: 1, border: `1px solid rgba(178, 177, 180, 0.3)`, gap: 1 }}>
					<MaterialIcon name="search" sx={{ color: customColors["on-surface-variant"] }} />
					<InputBase placeholder="Search by name, SKU or category..." sx={{ flex: 1, fontSize: 14 }} value={searchTerm} onChange={(event) => onSearchChange(event.target.value)} />
				</Box>
				<Typography sx={{ fontSize: 12, color: customColors["on-surface-variant"], whiteSpace: "nowrap", textAlign: { xs: "right", sm: "left" } }}>
					{filteredCount}/{products.length}
				</Typography>
			</Paper>
		</Grid>
		<Grid item xs={12} lg={3}>
			<Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: `1px solid rgba(178, 177, 180, 0.5)`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, backgroundColor: customColors["surface-container-lowest"] }}>
				<Box sx={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
					<Typography sx={{ fontSize: 10, textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.2em", color: customColors["on-surface-variant"] }}>
						Category
					</Typography>
					<Select variant="standard" disableUnderline value={selectedCategory} onChange={(event) => onCategoryChange(event.target.value)} sx={{ fontSize: 14, fontWeight: 600, mt: 0.5, minWidth: 0 }}>
						<MenuItem value="All Categories">All Categories</MenuItem>
						{categories.map((category) => (
							<MenuItem key={category} value={category}>{category}</MenuItem>
						))}
					</Select>
				</Box>
				<MaterialIcon name="filter_list" sx={{ color: customColors.outline }} />
			</Paper>
		</Grid>
		<Grid item xs={12} lg={3}>
			<Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: `1px solid rgba(178, 177, 180, 0.5)`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, backgroundColor: customColors["surface-container-lowest"] }}>
				<Box sx={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
					<Typography sx={{ fontSize: 10, textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.2em", color: customColors["on-surface-variant"] }}>
						Stock Status
					</Typography>
					<Select variant="standard" disableUnderline value={selectedStatus} onChange={(event) => onStatusChange(event.target.value)} sx={{ fontSize: 14, fontWeight: 600, mt: 0.5, minWidth: 0 }}>
						<MenuItem value="All Status">All Status</MenuItem>
						<MenuItem value="In Stock">In Stock</MenuItem>
						<MenuItem value="Low Stock">Low Stock</MenuItem>
						<MenuItem value="Out of Stock">Out of Stock</MenuItem>
					</Select>
				</Box>
				<MaterialIcon name="inventory" sx={{ color: customColors.outline }} />
			</Paper>
		</Grid>
	</Grid>
);

export default ProductFilters;
