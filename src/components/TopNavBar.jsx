import {
	AppBar,
	Avatar,
	Box,
	IconButton,
	InputAdornment,
	InputBase,
	Toolbar,
	Typography,
} from "@mui/material";
import { customColors } from "../theme";
import MaterialIcon from "./MaterialIcon";

const defaultAvatarSrc =
	"https://lh3.googleusercontent.com/aida-public/AB6AXuDioZOU7DBUwQrqF2FEyJW5FmnasPILhMd7ELXXlQpfs2M8JQvWM6cWiKfQIpZwefeMd4pLqxjEYH4acSAU_OHdRa0vBOA2cGeWKgTuQb7eO9EVFO6BJYD3rhdwvTkIYRab4CJy6rYldRRT3jOVS51kQVEtss9mYRTPH-CQ4B47yDkhOLPqw3JEUR36VW8p5Jd0AEcpV3heTni8_hI6S90hg8FLuh7uax9B0Ia1N8SGLwopOxKCgT7qeNlHrv8iUvwWDIcyJjxKukk";

const TopNavBar = ({
	searchVariant = "dashboard",
	showNotificationDot = true,
	avatarBorderColor,
	avatarSrc = defaultAvatarSrc,
	searchPlaceholder,
}) => {
	const resolvedAvatarBorder =
		avatarBorderColor || customColors["outline-variant"];
	const placeholder = searchPlaceholder || "Search resources...";

	return (
		<AppBar
			position="fixed"
			elevation={0}
			sx={{
				backgroundColor: customColors["surface-container-lowest"],
				color: customColors["on-surface"],
				borderBottom: `1px solid ${customColors["surface-container"]}`,
				height: 64,
				justifyContent: "center",
				zIndex: (theme) => theme.zIndex.drawer + 2,
			}}>
			<Toolbar
				sx={{
					px: 3,
					minHeight: 64,
					display: "flex",
					justifyContent: "space-between",
				}}>
				<Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
					<Typography
						sx={{
							fontSize: 20,
							fontWeight: 700,
							color: "#1d4ed8",
						}}>
						ERP Core
					</Typography>

					<Box
						sx={{
							display: { xs: "none", md: "flex" },
							alignItems: "center",
							position: "relative",
						}}>
						<InputBase
							placeholder={placeholder}
							startAdornment={
								<InputAdornment position="start">
									<MaterialIcon
										name="search"
										sx={{ color: "#94a3b8", fontSize: 20 }}
									/>
								</InputAdornment>
							}
							sx={{
								pl: 0.5,
								pr: 2,
								py: 0.5,
								backgroundColor: customColors["surface-container-low"],
								borderRadius: 2,
								fontSize: 14,
								width: 256,
								transition: "all 0.2s",
								"&:focus-within": {
									boxShadow: `0 0 0 2px ${customColors.primary}`,
								},
							}}
						/>
					</Box>
				</Box>
				<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
					<IconButton
						sx={{
							color: "#64748b",
							backgroundColor: "transparent",
							"&:hover": {
								backgroundColor: customColors["surface-container-low"],
							},
							position: "relative",
						}}>
						<MaterialIcon name="notifications" />
						{showNotificationDot ? (
							<Box
								sx={{
									position: "absolute",
									top: 10,
									right: 10,
									width: 8,
									height: 8,
									borderRadius: "50%",
									backgroundColor: customColors.error,
									border: `2px solid ${customColors["surface-container-lowest"]}`,
								}}
							/>
						) : null}
					</IconButton>
					<IconButton
						sx={{
							color: "#64748b",
							backgroundColor: "transparent",
							"&:hover": {
								backgroundColor: customColors["surface-container-low"],
							},
						}}>
						<MaterialIcon name="settings" />
					</IconButton>
					<Avatar
						alt="User Profile"
						src={avatarSrc}
						sx={{
							width: 32,
							height: 32,
							border: `1px solid ${resolvedAvatarBorder}`,
						}}
					/>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default TopNavBar;
