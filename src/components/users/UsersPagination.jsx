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

const UsersPagination = ({ page, pageSize, totalCount, onPageChange }) => {
	const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
	const start = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
	const end = Math.min(page * pageSize, totalCount);
	const pages = buildPages(page, totalPages);

	return (
		<Box
			sx={{
				px: 3,
				py: 2,
				backgroundColor: "rgba(248, 250, 252, 0.5)",
				borderTop: "1px solid #f1f5f9",
				display: "flex",
				flexDirection: { xs: "column", sm: "row" },
				alignItems: "center",
				justifyContent: "space-between",
				gap: 2,
			}}>
			<Typography sx={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "#64748b" }}>
				Showing {start}-{end} of {totalCount} users
			</Typography>
			<Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap", justifyContent: "center" }}>
				<Button
					disabled={page === 1}
					onClick={() => onPageChange(page - 1)}
					sx={{
						minWidth: 30,
						height: 30,
						borderRadius: 2,
						border: "1px solid #e2e8f0",
						color: "#94a3b8",
						"&.Mui-disabled": { opacity: 0.5 },
					}}>
					<MaterialIcon name="chevron_left" sx={{ fontSize: 18 }} />
				</Button>
				{pages.map((pageNumber, index) => {
					const previousPage = pages[index - 1];
					const showGap = previousPage && pageNumber - previousPage > 1;

					return (
						<Box key={pageNumber} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							{showGap ? <Typography sx={{ fontSize: 12, color: "#94a3b8", px: 0.5 }}>...</Typography> : null}
							<Button
								onClick={() => onPageChange(pageNumber)}
								sx={{
									minWidth: 32,
									height: 32,
									borderRadius: 2,
									backgroundColor: pageNumber === page ? "#2563eb" : "transparent",
									color: pageNumber === page ? "#fff" : "#64748b",
									fontSize: 12,
									fontWeight: 700,
									"&:hover": { backgroundColor: pageNumber === page ? "#2563eb" : "#fff" },
								}}>
								{pageNumber}
							</Button>
						</Box>
					);
				})}
				<Button
					disabled={page === totalPages || totalCount === 0}
					onClick={() => onPageChange(page + 1)}
					sx={{
						minWidth: 30,
						height: 30,
						borderRadius: 2,
						border: "1px solid #e2e8f0",
						color: "#94a3b8",
						"&:hover": { backgroundColor: "#fff" },
					}}>
					<MaterialIcon name="chevron_right" sx={{ fontSize: 18 }} />
				</Button>
			</Box>
		</Box>
	);
};

export default UsersPagination;
