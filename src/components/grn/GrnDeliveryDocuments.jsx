import { Box, Paper, Typography } from "@mui/material";
import { customColors } from "../../theme";
import MaterialIcon from "../MaterialIcon";

const GrnDeliveryDocuments = () => (
	<Paper
		elevation={0}
		sx={{
			p: 3,
			borderRadius: 2,
			border: `1px solid ${customColors["secondary-container"]}`,
			backgroundColor: "rgba(201, 231, 247, 0.3)",
		}}>
		<Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
			<MaterialIcon name="upload_file" sx={{ color: customColors.secondary }} />
			<Typography
				sx={{ fontWeight: 700, color: customColors["on-secondary-container"] }}>
				Delivery Documents
			</Typography>
		</Box>
		<Box
			sx={{
				border: "2px dashed rgba(58, 87, 100, 0.3)",
				borderRadius: 2,
				p: 4,
				textAlign: "center",
				cursor: "pointer",
				backgroundColor: "transparent",
				"&:hover": { backgroundColor: "rgba(201, 231, 247, 0.5)" },
			}}>
			<MaterialIcon
				name="add_a_photo"
				sx={{ fontSize: 32, color: customColors["secondary-dim"], mb: 1 }}
			/>
			<Typography
				sx={{
					fontSize: 12,
					fontWeight: 600,
					color: customColors["secondary-dim"],
				}}>
				Upload Delivery Note or Photo of Goods
			</Typography>
			<Typography sx={{ fontSize: 10, color: "#64748b", mt: 0.5 }}>
				PDF, JPG, PNG (Max 5MB)
			</Typography>
		</Box>
	</Paper>
);

export default GrnDeliveryDocuments;
