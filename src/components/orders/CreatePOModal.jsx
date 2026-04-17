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
import { useEffect, useMemo, useState } from "react";
import { customColors } from "../../theme";
import MaterialIcon from "../MaterialIcon";
import api from "../../backend/api/api";

const getInitialPurchaseOrderForm = () => ({
	orderNumber: "",
	supplier: "",
	productId: "",
	SKU: "",
	contactEmail: "",
	products: {
		itemName: "",
		quantity: "",
		unitPrice: "",
	},
	status: "Pending",
});

const CreatePOModal = ({ open, handleClose, purchaseOrders, onSuccess }) => {
	const textFieldStyles = useMemo(
		() => ({
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
		}),
		[],
	);

	const [form, setForm] = useState(getInitialPurchaseOrderForm);
	const [products, setProducts] = useState([]);

	const resetForm = () => {
		setForm(getInitialPurchaseOrderForm());
	};

	useEffect(() => {
		if (!open) {
			return;
		}

		const loadProducts = async () => {
			try {
				const response = await api.get("/products");
				setProducts(response.data || []);
			} catch (e) {
				console.error(e);
				setProducts([]);
			}
		};

		loadProducts();
	}, [open]);

	const nextPurchaseOrderNumber = useMemo(() => {
		try {
			const numericIds = purchaseOrders
				.map((order) => Number(order.orderNumber.replace(/[^0-9]/g, "")))
				.filter((value) => Number.isFinite(value));
			const highest = numericIds.length > 0 ? Math.max(...numericIds) : 0;
			return highest + 1;
		} catch (e) {
			console.error(e);
			return 1;
		}
	}, [purchaseOrders]);

	useEffect(() => {
		if (!open) {
			return;
		}

		setForm((currentForm) =>
			currentForm.orderNumber
				? currentForm
				: {
						...currentForm,
						orderNumber: `#PO-${nextPurchaseOrderNumber}`,
					},
		);
	}, [open, nextPurchaseOrderNumber]);

	const handleFormChange = (event) => {
		const { name, value } = event.target;

		setForm((currentForm) => ({
			...currentForm,
			[name]: value,
			...(name === "itemName" && {
				products: {
					...currentForm.products,
					itemName: value,
				},
			}),
			...(name === "quantity" && {
				products: {
					...currentForm.products,
					quantity: value,
				},
			}),
			...(name === "unitPrice" && {
				products: {
					...currentForm.products,
					unitPrice: value,
				},
			}),
		}));
	};

	const handleProductChange = (event) => {
		const value = event.target.value;

		if (value === "new") {
			setForm((currentForm) => ({
				...currentForm,
				productId: "new",
				supplier: "",
				contactEmail: "",
				SKU: "",
				products: {
					...currentForm.products,
					itemName: "",
					unitPrice: "",
				},
			}));
			return;
		}

		const selectedProduct = products.find(
			(product) => product._id === value,
		);

		setForm((currentForm) => ({
			...currentForm,
			productId: selectedProduct?._id || "",
			supplier: selectedProduct?.supplierName || "",
			contactEmail: selectedProduct?.contactEmail || "",
			SKU: selectedProduct?.SKU || "",
			products: {
				...currentForm.products,
				itemName: selectedProduct?.title || "",
				unitPrice: selectedProduct?.price ?? currentForm.products.unitPrice,
			},
		}));
	};

	const handleModalClose = () => {
		resetForm();
		handleClose();
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const payload = { ...form };
		if (payload.productId === "new") {
			delete payload.productId;
		}

		try {
			await api.post("/purchaseOrders", payload);
			await onSuccess?.();
			resetForm();
			handleClose();
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Dialog
			open={open}
			onClose={handleModalClose}
			PaperProps={{
				component: "form",
				onSubmit: handleSubmit,
				sx: {
					backgroundColor: customColors["surface-container-lowest"],
					color: customColors["on-surface"],
					borderRadius: 3,
					border: `1px solid ${customColors["surface-container-high"]}`,
					width: "100%",
					maxWidth: "560px",
				},
			}}>
			<DialogTitle
				component="div"
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					borderBottom: `1px solid ${customColors["surface-container"]}`,
					p: 2,
				}}>
				<div>
					<Typography variant="h6" sx={{ fontWeight: 700 }}>
						Create Purchase Order
					</Typography>
					<Typography
						variant="body2"
						sx={{ color: customColors["on-surface-variant"], mt: 0.5 }}>
						PO Number: {`#PO-${nextPurchaseOrderNumber}`}
					</Typography>
				</div>
				<IconButton
					onClick={handleModalClose}
					sx={{ color: customColors.outline }}>
					<MaterialIcon name="close" />
				</IconButton>
			</DialogTitle>
			<DialogContent
				sx={{
					p: 3,
					display: "flex",
					flexDirection: "column",
					gap: 2.5,
					mt: 1,
				}}>
				<TextField
					autoFocus
					required
					margin="dense"
					id="supplier"
					name="supplier"
					label="Supplier Name"
					type="text"
					fullWidth
					variant="outlined"
					sx={textFieldStyles}
					value={form.supplier}
					onChange={handleFormChange}
				/>
				<TextField
					required
					margin="dense"
					id="contactEmail"
					name="contactEmail"
					label="Contact Email"
					type="email"
					fullWidth
					variant="outlined"
					sx={textFieldStyles}
					value={form.contactEmail}
					onChange={handleFormChange}
				/>
				<FormControl fullWidth margin="dense" sx={textFieldStyles}>
					<InputLabel id="po-product-label">Product</InputLabel>
					<Select
						labelId="po-product-label"
						id="productId"
						name="productId"
						label="Product"
						value={form.productId}
						required
						onChange={handleProductChange}>
						<MenuItem value="new">+ Add New Product</MenuItem>
						{products.length > 0 ? (
							products.map((product) => (
								<MenuItem key={product._id} value={product._id}>
									{product.title} {product.SKU ? `(${product.SKU})` : ""}
								</MenuItem>
							))
						) : (
							<MenuItem value="" disabled>
								No products available
							</MenuItem>
						)}
					</Select>
				</FormControl>
				<TextField
					margin="dense"
					id="SKU"
					name="SKU"
					label="SKU"
					fullWidth
					variant="outlined"
					sx={textFieldStyles}
					value={form.SKU}
					onChange={handleFormChange}
					InputProps={{ readOnly: form.productId !== "new" }}
				/>
				<TextField
					margin="dense"
					id="itemName"
					name="itemName"
					label="Item Name"
					fullWidth
					variant="outlined"
					sx={textFieldStyles}
					value={form.products.itemName}
					onChange={handleFormChange}
					InputProps={{ readOnly: form.productId !== "new" }}
				/>
				<FormControl fullWidth margin="dense" sx={textFieldStyles}>
					<InputLabel id="status-label">Status</InputLabel>
					<Select
						labelId="status-label"
						id="status"
						name="status"
						label="Status"
						value={form.status}
						required
						onChange={handleFormChange}>
						<MenuItem value="Pending">Pending</MenuItem>
						<MenuItem value="Approved">Approved</MenuItem>
						<MenuItem value="Received">Received</MenuItem>
						<MenuItem value="Delayed">Delayed</MenuItem>
					</Select>
				</FormControl>
				<div style={{ display: "flex", gap: 16 }}>
					<TextField
						required
						margin="dense"
						id="quantity"
						name="quantity"
						label="Quantity"
						type="number"
						fullWidth
						variant="outlined"
						sx={textFieldStyles}
						value={form.products.quantity}
						onChange={handleFormChange}
					/>
					<TextField
						required
						margin="dense"
						id="unitPrice"
						name="unitPrice"
						label="Unit Price"
						type="number"
						fullWidth
						variant="outlined"
						sx={textFieldStyles}
						value={form.products.unitPrice}
						onChange={handleFormChange}
					/>
				</div>
			</DialogContent>
			<DialogActions
				sx={{
					p: 2,
					borderTop: `1px solid ${customColors["surface-container"]}`,
				}}>
				<Button
					onClick={handleModalClose}
					variant="outlined"
					sx={{
						borderColor: customColors.outline,
						color: customColors["on-surface"],
						textTransform: "none",
						fontWeight: 500,
						borderRadius: 2,
						px: 2,
						py: 1,
						"&:hover": {
							backgroundColor: customColors["surface-container"],
							borderColor: customColors.outline,
						},
					}}>
					Cancel
				</Button>
				<Button
					type="submit"
					variant="contained"
					disableElevation
					disabled={!form.productId || (form.productId === "new" && !form.products.itemName)}
					sx={{
						backgroundColor: customColors.primary,
						color: customColors["on-primary"],
						textTransform: "none",
						fontWeight: 600,
						borderRadius: 2,
						px: 2,
						py: 1,
						"&:hover": { backgroundColor: customColors["primary-dim"] },
					}}>
					Save PO
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default CreatePOModal;
