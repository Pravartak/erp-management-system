import { Box, Paper, Typography } from "@mui/material";
import { customColors } from "../../theme";
import MaterialIcon from "../MaterialIcon";

const MetricCard = ({
	icon,
	iconBg,
	iconColor,
	badge,
	badgeBg,
	badgeColor,
	title,
	value,
	hoverBorder,
}) => (
	<Paper
		elevation={0}
		sx={{
			backgroundColor: customColors["surface-container-lowest"],
			p: 3,
			borderRadius: 3,
			border: `1px solid ${customColors["surface-container"]}`,
			boxShadow: "0px 8px 16px rgba(59, 130, 246, 0.08)",
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-between",
			transition: "all 0.2s",
			"&:hover": {
				borderColor: hoverBorder,
			},
		}}>
		<Box
			sx={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "flex-start",
				mb: 2,
			}}>
			<Box
				sx={{
					p: 1.5,
					backgroundColor: iconBg,
					borderRadius: 2,
					color: iconColor,
					display: "flex",
				}}>
				<MaterialIcon name={icon} sx={{ fontSize: 28 }} />
			</Box>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					gap: 0.5,
					px: 1,
					py: 0.5,
					borderRadius: 1,
					fontSize: 12,
					fontWeight: 700,
					backgroundColor: badgeBg,
					color: badgeColor,
				}}>
				{badge?.icon ? (
					<MaterialIcon name={badge.icon} sx={{ fontSize: 14 }} />
				) : null}
				{badge?.text}
			</Box>
		</Box>
		<Box>
			<Typography
				sx={{
					color: customColors["on-surface-variant"],
					fontSize: 11,
					fontWeight: 700,
					textTransform: "uppercase",
					letterSpacing: "0.12em",
					mb: 0.5,
				}}>
				{title}
			</Typography>
			<Typography
				sx={{
					fontSize: 28,
					fontWeight: 800,
					color: customColors["on-surface"],
				}}>
				{value}
			</Typography>
		</Box>
	</Paper>
);

export default MetricCard;
