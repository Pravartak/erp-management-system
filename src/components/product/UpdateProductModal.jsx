import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
	Box,
	IconButton,
	Typography,
	MenuItem,
	FormControl,
	InputLabel,
	Select,
} from "@mui/material";
import { customColors } from "../../theme";
import MaterialIcon from "../MaterialIcon";
import { useState, useEffect } from "react";
import api from "../../backend/api/api.js";

const UpdateProductModal = ({ open, handleClose, id, onSuccess }) => {
	const textFieldStyles = {
		"& .MuiInputBase-root": { backgroundColor: customColors["surface-container-low"], borderRadius: 1 },
		"& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(178, 177, 180, 0.3)" },
		"&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(178, 177, 180, 0.7)" },
		"& .MuiInputLabel-root": { color: customColors["on-surface-variant"] },
		"& .MuiInputBase-input": { color: customColors["on-surface"] },
		"& .Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: customColors.primary },
		"& .MuiInputLabel-shrink": { color: customColors.primary },
	};

	const [form, setForm] = useState({ title: "", SKU: "", category: "", price: "", stock: "" });

	useEffect(() => {
		if (open && id) {
			const fetchProduct = async () => {
				try {
					const res = await api.get("/products");
					const product = res.data.find((entry) => entry._id === id);
					if (!product) {
						return;
					}
					setForm({
						title: product.title || "",
						SKU: product.SKU || "",
						category: product.category || "",
						price: product.price || "",
						stock: product.stock || "",
					});
				} catch (error) {
					console.error("Failed to fetch product data:", error);
				}
			};
			fetchProduct();
		}
	}, [open, id]);

	const handleFormChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	return (
		<Dialog open={open} onClose={handleClose} PaperProps={{ component: "form", onSubmit: async (event) => {
			event.preventDefault();
			try {
				await api.put(`/products/${id}`, form);
				await onSuccess?.();
			} catch (e) {
				console.error(e);
			}
			handleClose();
		}, sx: { backgroundColor: customColors["surface-container-lowest"], color: customColors["on-surface"], borderRadius: 3, border: `1px solid ${customColors["surface-container-high"]}`, width: "100%", maxWidth: "500px" } }}>
			<DialogTitle component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${customColors["surface-container"]}`, p: 2 }}>
				<Typography variant="h6" sx={{ fontWeight: 700 }}>Update Product</Typography>
				<IconButton onClick={handleClose} sx={{ color: customColors.outline }}><MaterialIcon name="close" /></IconButton>
			</DialogTitle>
			<DialogContent sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2.5, mt: 1 }}>
				<TextField autoFocus required margin="dense" id="name" name="title" label="Product Name" type="text" fullWidth variant="outlined" sx={textFieldStyles} value={form.title} onChange={handleFormChange} />
				<TextField required margin="dense" id="sku" name="SKU" label="SKU" type="text" fullWidth variant="outlined" sx={textFieldStyles} value={form.SKU} onChange={handleFormChange} />
				<FormControl fullWidth margin="dense" sx={textFieldStyles}>
					<InputLabel id="category-label">Category</InputLabel>
					<Select labelId="category-label" id="category" name="category" label="Category" value={form.category} required onChange={handleFormChange}>
						<MenuItem value="Electronics">Electronics</MenuItem>
						<MenuItem value="Hardware">Hardware</MenuItem>
						<MenuItem value="Industrial">Industrial</MenuItem>
					</Select>
				</FormControl>
				<Box sx={{ display: "flex", gap: 2 }}>
					<TextField required margin="dense" id="stock" name="stock" label="Stock" type="number" fullWidth variant="outlined" sx={textFieldStyles} value={form.stock} onChange={handleFormChange} />
					<TextField required margin="dense" id="price" name="price" label="Price" type="number" fullWidth variant="outlined" sx={textFieldStyles} InputProps={{ startAdornment: <Typography sx={{ mr: 0.5, color: customColors["on-surface-variant"] }}>$</Typography> }} value={form.price} onChange={handleFormChange} />
				</Box>
			</DialogContent>
			<DialogActions sx={{ p: 2, borderTop: `1px solid ${customColors["surface-container"]}` }}>
				<Button onClick={handleClose} variant="outlined" sx={{ borderColor: customColors.outline, color: customColors["on-surface"], textTransform: "none", fontWeight: 500, borderRadius: 2, px: 2, py: 1, "&:hover": { backgroundColor: customColors["surface-container"], borderColor: customColors.outline } }}>Cancel</Button>
				<Button type="submit" variant="contained" disableElevation sx={{ backgroundColor: customColors.primary, color: customColors["on-primary"], textTransform: "none", fontWeight: 600, borderRadius: 2, px: 2, py: 1, "&:hover": { backgroundColor: customColors["primary-dim"] } }}>Save Product</Button>
			</DialogActions>
		</Dialog>
	);
};

export default UpdateProductModal;
