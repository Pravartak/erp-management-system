import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
	IconButton,
	Typography,
	MenuItem,
	FormControl,
	InputLabel,
	Select,
} from "@mui/material";
import { customColors } from "../../theme";
import MaterialIcon from "../MaterialIcon";
import { useState } from "react";
import api from "../../backend/api/api.js";

const AddUserModal = ({ open, handleClose, onSuccess }) => {
	const textFieldStyles = {
		"& .MuiInputBase-root": {
			backgroundColor: customColors["surface-container-low"],
			borderRadius: 1,
		},
		"& .MuiOutlinedInput-notchedOutline": {
			borderColor: "rgba(178, 177, 180, 0.3)",
		},
		"&:hover .MuiOutlinedInput-notchedOutline": {
			borderColor: "rgba(178, 177, 180, 0.7)",
		},
		"& .MuiInputLabel-root": {
			color: customColors["on-surface-variant"],
		},
		"& .MuiInputBase-input": {
			color: customColors["on-surface"],
		},
		"& .Mui-focused .MuiOutlinedInput-notchedOutline": {
			borderColor: customColors.primary,
		},
		"& .MuiInputLabel-shrink": {
			color: customColors.primary,
		},
	};

	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		role: "",
	});

	const handleFormChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			PaperProps={{
				component: "form",
				onSubmit: async (event) => {
					event.preventDefault();
					try {
						await api.post("/users", form);
						await onSuccess?.();
						setForm({ name: "", email: "", password: "", role: "" });
					} catch (e) {
						console.error(e);
					}
					handleClose();
				},
				sx: {
					backgroundColor: customColors["surface-container-lowest"],
					color: customColors["on-surface"],
					borderRadius: 3,
					border: `1px solid ${customColors["surface-container-high"]}`,
					width: "100%",
					maxWidth: "500px",
				},
			}}>
			<DialogTitle component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${customColors["surface-container"]}`, p: 2 }}>
				<Typography variant="h6" sx={{ fontWeight: 700 }}>
					Add New User
				</Typography>
				<IconButton onClick={handleClose} sx={{ color: customColors.outline }}>
					<MaterialIcon name="close" />
				</IconButton>
			</DialogTitle>
			<DialogContent sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2.5, mt: 1 }}>
				<TextField autoFocus required margin="dense" id="fullName" name="name" label="Name" type="text" fullWidth variant="outlined" sx={textFieldStyles} value={form.name} onChange={handleFormChange} />
				<TextField required margin="dense" id="email" name="email" label="Email Address" type="email" fullWidth variant="outlined" sx={textFieldStyles} value={form.email} onChange={handleFormChange} />
				<FormControl fullWidth margin="dense" sx={textFieldStyles}>
					<InputLabel id="role-label">Role</InputLabel>
					<Select labelId="role-label" id="role" name="role" label="Role" value={form.role} required onChange={handleFormChange}>
						<MenuItem value="admin">Admin</MenuItem>
						<MenuItem value="sales">Sales</MenuItem>
					</Select>
				</FormControl>
				<TextField required margin="dense" id="password" name="password" label="Password" type="password" fullWidth variant="outlined" sx={textFieldStyles} value={form.password} onChange={handleFormChange} />
			</DialogContent>
			<DialogActions sx={{ p: 2, borderTop: `1px solid ${customColors["surface-container"]}` }}>
				<Button onClick={handleClose} variant="outlined" sx={{ borderColor: customColors.outline, color: customColors["on-surface"], textTransform: "none", fontWeight: 500, borderRadius: 2, px: 2, py: 1, "&:hover": { backgroundColor: customColors["surface-container"], borderColor: customColors.outline } }}>
					Cancel
				</Button>
				<Button type="submit" variant="contained" disableElevation sx={{ backgroundColor: customColors.primary, color: customColors["on-primary"], textTransform: "none", fontWeight: 600, borderRadius: 2, px: 2, py: 1, "&:hover": { backgroundColor: customColors["primary-dim"] } }}>
					Save User
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AddUserModal;
