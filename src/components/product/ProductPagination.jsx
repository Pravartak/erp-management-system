import { Box, Button, IconButton, Typography } from "@mui/material";
import { customColors } from "../../theme";
import MaterialIcon from "../MaterialIcon";

const buildPages = (currentPage, totalPages) => {
	if (totalPages <= 1) {
		return [1];
	}

	const pages = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);
	return Array.from(pages)
		.filter((page) => page >= 1 && page <= totalPages)
		.sort((a, b) => a - b);
};

const ProductPagination = ({ page, pageSize, totalCount, onPageChange }) => {
	const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
	const start = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
	const end = Math.min(page * pageSize, totalCount);
	const pages = buildPages(page, totalPages);

	return (
		<Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", justifyContent: "space-between", gap: 2 }}>
			<Typography sx={{ fontSize: 14, color: customColors["on-surface-variant"] }}>
				Showing {start}-{end} of {totalCount} products
			</Typography>
			<Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flexWrap: "wrap", justifyContent: "center" }}>
				<IconButton disabled={page === 1} onClick={() => onPageChange(1)} sx={{ opacity: page === 1 ? 0.3 : 1 }}>
					<MaterialIcon name="first_page" />
				</IconButton>
				<IconButton disabled={page === 1} onClick={() => onPageChange(page - 1)} sx={{ opacity: page === 1 ? 0.3 : 1 }}>
					<MaterialIcon name="chevron_left" />
				</IconButton>
				<Box sx={{ display: "flex", alignItems: "center", gap: 0.5, px: 2 }}>
					{pages.map((pageNumber, index) => {
						const previousPage = pages[index - 1];
						const showGap = previousPage && pageNumber - previousPage > 1;
						return (
							<Box key={pageNumber} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
								{showGap ? <Typography sx={{ color: customColors["on-surface-variant"], px: 0.5 }}>...</Typography> : null}
								<Button
									onClick={() => onPageChange(pageNumber)}
									variant={pageNumber === page ? "contained" : "text"}
									disableElevation
									sx={{
										minWidth: 32,
										height: 32,
										borderRadius: "50%",
										backgroundColor: pageNumber === page ? customColors.primary : "transparent",
										color: pageNumber === page ? customColors["on-primary"] : customColors["on-surface"],
										fontWeight: 700,
										fontSize: 14,
										textTransform: "none",
										"&:hover": { backgroundColor: pageNumber === page ? customColors.primary : customColors["surface-container"] },
									}}>
									{pageNumber}
								</Button>
							</Box>
						);
					})}
				</Box>
				<IconButton disabled={page === totalPages || totalCount === 0} onClick={() => onPageChange(page + 1)} sx={{ "&:hover": { backgroundColor: customColors["surface-container"] } }}>
					<MaterialIcon name="chevron_right" />
				</IconButton>
				<IconButton disabled={page === totalPages || totalCount === 0} onClick={() => onPageChange(totalPages)} sx={{ "&:hover": { backgroundColor: customColors["surface-container"] } }}>
					<MaterialIcon name="last_page" />
				</IconButton>
			</Box>
		</Box>
	);
};

export default ProductPagination;
