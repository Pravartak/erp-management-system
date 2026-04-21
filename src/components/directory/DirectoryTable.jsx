import {
	Box,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import MaterialIcon from "../MaterialIcon";
import DirectoryPagination from "./DirectoryPagination";
import DirectoryTableToolbar from "./DirectoryTableToolbar";

const formatMetric = (record) => {
	if (record.type === "product") {
		return new Intl.NumberFormat("en-IN", {
			style: "currency",
			currency: "USD",
			maximumFractionDigits: 0,
		}).format(record.metricValue || 0);
	}

	if (!record.metricValue) {
		return "N/A";
	}

	return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(new Date(record.metricValue));
};

const getStatusColors = (tone) => {
	if (tone === "danger") {
		return { bg: "#fee2e2", color: "#dc2626" };
	}

	if (tone === "success") {
		return { bg: "#d1fae5", color: "#047857" };
	}

	return { bg: "#dbeafe", color: "#2563eb" };
};

const getInitials = (value) =>
	value
		.split(" ")
		.map((part) => part[0])
		.filter(Boolean)
		.slice(0, 2)
		.join("")
		.toUpperCase();

const DirectoryTable = ({
	records,
	totalCount,
	page,
	pageSize,
	onPageChange,
	view,
	onViewChange,
	isLoading,
}) => (
	<Paper elevation={0} sx={{ backgroundColor: "#fff", borderRadius: 2, border: "1px solid #e2e8f0", boxShadow: "0px 8px 16px rgba(15, 23, 42, 0.06)", overflow: "hidden" }}>
		<DirectoryTableToolbar view={view} onViewChange={onViewChange} records={records} />
		<Box sx={{ display: { xs: "flex", md: "none" }, flexDirection: "column", gap: 1.5, p: 2 }}>
			{records.length === 0 ? (
				<Box sx={{ px: 2, py: 4, textAlign: "center", color: "#64748b", border: "1px dashed #cbd5e1", borderRadius: 2 }}>
					{isLoading ? "Loading directory..." : "No records available for this view."}
				</Box>
			) : (
				records.map((record) => {
					const statusColors = getStatusColors(record.statusTone);
					return (
						<Box key={`${record.type}-${record.id}`} sx={{ border: "1px solid #e2e8f0", borderRadius: 2, p: 2, display: "flex", flexDirection: "column", gap: 1.25 }}>
							<Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
								<Box sx={{ width: 40, height: 40, borderRadius: 1, backgroundColor: record.type === "product" ? "#eef2ff" : "#eff6ff", color: record.type === "product" ? "#4f46e5" : "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
									{getInitials(record.name)}
								</Box>
								<Box sx={{ minWidth: 0, flex: 1 }}>
									<Typography sx={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{record.name}</Typography>
									<Typography sx={{ fontSize: 12, color: "#64748b", textTransform: "capitalize" }}>{record.type}</Typography>
								</Box>
								<IconButton sx={{ color: "#94a3b8" }}>
									<MaterialIcon name="more_vert" />
								</IconButton>
							</Box>
							<Typography sx={{ fontSize: 13, color: "#475569" }}>{record.details}</Typography>
							<Typography sx={{ fontSize: 13, color: "#64748b", fontStyle: "italic", wordBreak: "break-word" }}>{record.reference}</Typography>
							<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1 }}>
								<Box sx={{ display: "inline-flex", px: 1.5, py: 0.5, borderRadius: 999, fontSize: 10, fontWeight: 700, textTransform: "uppercase", backgroundColor: statusColors.bg, color: statusColors.color }}>
									{record.status}
								</Box>
								<Typography sx={{ fontFamily: "monospace", fontSize: 13, color: "#0f172a" }}>
									{formatMetric(record)}
								</Typography>
							</Box>
						</Box>
					);
				})
			)}
		</Box>
		<Box sx={{ overflowX: "auto", display: { xs: "none", md: "block" } }}>
			<Table sx={{ minWidth: 900 }}>
				<TableHead sx={{ backgroundColor: "#f8fafc" }}>
					<TableRow>
						{["Name", "Details", "Reference", "Status", "Metric", ""].map((head, index) => (
							<TableCell key={head || index} sx={{ px: 3, py: 2, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "#64748b", textAlign: index === 3 ? "center" : index === 4 ? "right" : "left" }}>
								{head}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{records.length === 0 ? (
						<TableRow>
							<TableCell colSpan={6} sx={{ px: 3, py: 6, textAlign: "center", color: "#64748b" }}>
								{isLoading ? "Loading directory..." : "No records available for this view."}
							</TableCell>
						</TableRow>
					) : (
						records.map((record) => {
							const statusColors = getStatusColors(record.statusTone);
							return (
								<TableRow key={`${record.type}-${record.id}`} hover sx={{ "&:hover": { backgroundColor: "#f8fafc" } }}>
									<TableCell sx={{ px: 3, py: 2 }}>
										<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
											<Box sx={{ width: 40, height: 40, borderRadius: 1, backgroundColor: record.type === "product" ? "#eef2ff" : "#eff6ff", color: record.type === "product" ? "#4f46e5" : "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
												{getInitials(record.name)}
											</Box>
											<Box>
												<Typography sx={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{record.name}</Typography>
												<Typography sx={{ fontSize: 12, color: "#64748b", textTransform: "capitalize" }}>{record.type}</Typography>
											</Box>
										</Box>
									</TableCell>
									<TableCell sx={{ px: 3, py: 2, fontSize: 14, color: "#475569" }}>{record.details}</TableCell>
									<TableCell sx={{ px: 3, py: 2, fontSize: 14, color: "#64748b", fontStyle: "italic" }}>{record.reference}</TableCell>
									<TableCell sx={{ px: 3, py: 2, textAlign: "center" }}>
										<Box sx={{ display: "inline-flex", px: 1.5, py: 0.5, borderRadius: 999, fontSize: 10, fontWeight: 700, textTransform: "uppercase", backgroundColor: statusColors.bg, color: statusColors.color }}>
											{record.status}
										</Box>
									</TableCell>
									<TableCell sx={{ px: 3, py: 2, textAlign: "right", fontFamily: "monospace", fontSize: 14, color: "#0f172a" }}>
										{formatMetric(record)}
									</TableCell>
									<TableCell sx={{ px: 3, py: 2, textAlign: "right" }}>
										<IconButton sx={{ color: "#94a3b8", "&:hover": { color: "#475569" } }}>
											<MaterialIcon name="more_vert" />
										</IconButton>
									</TableCell>
								</TableRow>
							);
						})
					)}
				</TableBody>
			</Table>
		</Box>
		<DirectoryPagination page={page} pageSize={pageSize} totalCount={totalCount} onPageChange={onPageChange} />
	</Paper>
);

export default DirectoryTable;
