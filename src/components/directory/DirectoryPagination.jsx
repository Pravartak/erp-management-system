import { Box, Button, Typography } from "@mui/material";
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

const DirectoryPagination = ({ page, pageSize, totalCount, onPageChange }) => {
	const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
	const start = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
	const end = Math.min(page * pageSize, totalCount);
	const pages = buildPages(page, totalPages);

	return (
		<Box sx={{ px: 3, py: 2, backgroundColor: "#f8fafc", borderTop: "1px solid #e2e8f0", display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center", justifyContent: "space-between", gap: 2 }}>
			<Typography sx={{ fontSize: 12, color: "#64748b" }}>
				Showing {start} to {end} of {totalCount} results
			</Typography>
			<Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap", justifyContent: "center" }}>
				<Button disabled={page === 1} onClick={() => onPageChange(page - 1)} sx={{ width: 32, height: 32, minWidth: 32, borderRadius: 1, border: "1px solid #cbd5e1", backgroundColor: "#fff", color: "#64748b", "&.Mui-disabled": { opacity: 0.5, color: "#94a3b8" } }}>
					<MaterialIcon name="chevron_left" sx={{ fontSize: 18 }} />
				</Button>
				{pages.map((pageNumber, index) => {
					const previousPage = pages[index - 1];
					const showGap = previousPage && pageNumber - previousPage > 1;
					return (
						<Box key={pageNumber} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							{showGap ? <Typography sx={{ fontSize: 12, color: "#94a3b8", px: 0.5 }}>...</Typography> : null}
							<Button onClick={() => onPageChange(pageNumber)} sx={{ width: 32, height: 32, minWidth: 32, borderRadius: 1, border: pageNumber === page ? "1px solid #3b82f6" : "1px solid #cbd5e1", backgroundColor: pageNumber === page ? "#3b82f6" : "#fff", color: pageNumber === page ? "#fff" : "#64748b", fontSize: 12, fontWeight: 600, "&:hover": { backgroundColor: pageNumber === page ? "#3b82f6" : "#f8fafc" } }}>
								{pageNumber}
							</Button>
						</Box>
					);
				})}
				<Button disabled={page === totalPages || totalCount === 0} onClick={() => onPageChange(page + 1)} sx={{ width: 32, height: 32, minWidth: 32, borderRadius: 1, border: "1px solid #cbd5e1", backgroundColor: "#fff", color: "#64748b", "&:hover": { backgroundColor: "#f8fafc" } }}>
					<MaterialIcon name="chevron_right" sx={{ fontSize: 18 }} />
				</Button>
			</Box>
		</Box>
	);
};

export default DirectoryPagination;
