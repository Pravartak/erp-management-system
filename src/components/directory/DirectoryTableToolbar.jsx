import { Box, Button } from "@mui/material";
import MaterialIcon from "../MaterialIcon";

const views = [
	{ id: "all", label: "All Records" },
	{ id: "users", label: "Users" },
	{ id: "products", label: "Products" },
];

const DirectoryTableToolbar = ({ view, onViewChange, records }) => (
	<Box sx={{ borderBottom: "1px solid #e2e8f0", px: 3, py: 2, display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center", justifyContent: "space-between", gap: 2 }}>
		<Box sx={{ display: "flex", p: 0.5, backgroundColor: "#f1f5f9", borderRadius: 2, width: { xs: "100%", sm: "auto" } }}>
			{views.map((option) => (
				<Button
					key={option.id}
					onClick={() => onViewChange(option.id)}
					sx={{
						flex: { xs: 1, sm: "none" },
						px: 3,
						py: 0.75,
						borderRadius: 1.5,
						fontSize: 14,
						fontWeight: view === option.id ? 600 : 500,
						textTransform: "none",
						backgroundColor: view === option.id ? "#fff" : "transparent",
						color: view === option.id ? "#1d4ed8" : "#64748b",
						boxShadow: view === option.id ? "0px 4px 10px rgba(15, 23, 42, 0.08)" : "none",
						"&:hover": { backgroundColor: view === option.id ? "#fff" : "transparent", color: view === option.id ? "#1d4ed8" : "#475569" },
					}}>
					{option.label}
				</Button>
			))}
		</Box>
		<Box sx={{ display: "flex", alignItems: "center", gap: 1.5, width: { xs: "100%", sm: "auto" } }}>
			<Button variant="outlined" disabled startIcon={<MaterialIcon name="filter_list" sx={{ fontSize: 18 }} />} sx={{ flex: { xs: 1, sm: "none" }, borderColor: "#cbd5e1", color: "#64748b", textTransform: "none", fontSize: 14, backgroundColor: "#fff" }}>
				Filters
			</Button>
			<Button
				variant="outlined"
				disabled={records.length === 0}
				startIcon={<MaterialIcon name="download" sx={{ fontSize: 18 }} />}
				onClick={() => {
					const rows = ["Type,Name,Details,Reference,Status"];
					records.forEach((record) => {
						rows.push([record.type, record.name, record.details, record.reference, record.status].map((value) => `"${value || ""}"`).join(","));
					});
					const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" });
					const link = document.createElement("a");
					link.href = URL.createObjectURL(blob);
					link.download = `directory-${view}.csv`;
					link.click();
					URL.revokeObjectURL(link.href);
				}}
				sx={{ flex: { xs: 1, sm: "none" }, borderColor: "#cbd5e1", color: "#64748b", textTransform: "none", fontSize: 14, backgroundColor: "#fff", "&:hover": { backgroundColor: "#f8fafc", borderColor: "#cbd5e1" } }}>
				Export
			</Button>
		</Box>
	</Box>
);

export default DirectoryTableToolbar;
