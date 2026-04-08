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

const getInitialSalesOrderForm = () => ({
	orderNumber: "",
	customer: "",
	contactEmail: "",
	products: {
		itemName: "",
		quantity: "",
		unitPrice: "",
	},
	status: "Pending",
});

const UpdateOrdersModal = ({ open, handleClose, id, onSuccess }) => {
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

	const [poForm, setPOForm] = useState(getInitialPurchaseOrderForm);
	const [soForm, setSOForm] = useState(getInitialSalesOrderForm);
	const [products, setProducts] = useState([]);

	const isSalesOrder = id?.type === "sales";

	const resetForms = () => {
		setPOForm(getInitialPurchaseOrderForm());
		setSOForm(getInitialSalesOrderForm());
	};

	useEffect(() => {
		if (!open || isSalesOrder) {
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
	}, [open, isSalesOrder]);

	useEffect(() => {
		if (!open || !id) {
			return;
		}

		if (isSalesOrder) {
			setSOForm({
				orderNumber: id.orderNumber || "",
				customer: id.customer || "",
				contactEmail: id.contactEmail || "",
				products: {
					itemName: id.itemName || "",
					quantity: id.quantity ?? "",
					unitPrice: id.unitPrice ?? "",
				},
				status: id.status || "Pending",
			});
			return;
		}

		setPOForm({
			orderNumber: id.orderNumber || "",
			supplier: id.supplier || "",
			productId: id.productId || "",
			SKU: id.SKU || "",
			contactEmail: id.contactEmail || "",
			products: {
				itemName: id.itemName || "",
				quantity: id.quantity ?? "",
				unitPrice: id.unitPrice ?? "",
			},
			status: id.status || "Pending",
		});
	}, [open, id, isSalesOrder]);

	const handleFormChange = (event) => {
		const { name, value } = event.target;

		if (isSalesOrder) {
			setSOForm((currentForm) => ({
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
			return;
		}

		setPOForm((currentForm) => ({
			...currentForm,
			[name]: value,
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

	const handlePurchaseProductChange = (event) => {
		const selectedProduct = products.find((product) => product._id === event.target.value);

		setPOForm((currentForm) => ({
			...currentForm,
			productId: selectedProduct?._id || "",
			SKU: selectedProduct?.SKU || "",
			products: {
				...currentForm.products,
				itemName: selectedProduct?.title || "",
				unitPrice: selectedProduct?.price ?? currentForm.products.unitPrice,
			},
		}));
	};

	const handleModalClose = () => {
		resetForms();
		handleClose();
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!id?.originalId) {
			return;
		}

		try {
			if (isSalesOrder) {
				await api.put(`/salesOrders/${id.originalId}`, soForm);
			} else {
				await api.put(`/purchaseOrders/${id.originalId}`, poForm);
			}

			await onSuccess?.();
			resetForms();
			handleClose();
		} catch (e) {
			console.error(e);
		}
	};

	const selectedPurchaseProductMissing =
		!isSalesOrder && poForm.productId && !products.some((product) => product._id === poForm.productId);

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
			<DialogTitle component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${customColors["surface-container"]}`, p: 2 }}>
				<div>
					<Typography variant="h6" sx={{ fontWeight: 700 }}>
						{isSalesOrder ? "Update Sales Order" : "Update Purchase Order"}
					</Typography>
					<Typography variant="body2" sx={{ color: customColors["on-surface-variant"], mt: 0.5 }}>
						{isSalesOrder ? "SO Number" : "PO Number"}: {id?.orderNumber || "-"}
					</Typography>
				</div>
				<IconButton onClick={handleModalClose} sx={{ color: customColors.outline }}>
					<MaterialIcon name="close" />
				</IconButton>
			</DialogTitle>
			<DialogContent sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2.5, mt: 1 }}>
				<TextField autoFocus required margin="dense" id={isSalesOrder ? "customer" : "supplier"} name={isSalesOrder ? "customer" : "supplier"} label={isSalesOrder ? "Customer Name" : "Supplier Name"} type="text" fullWidth variant="outlined" sx={textFieldStyles} value={isSalesOrder ? soForm.customer : poForm.supplier} onChange={handleFormChange} />
				<TextField required margin="dense" id="contactEmail" name="contactEmail" label="Contact Email" type="email" fullWidth variant="outlined" sx={textFieldStyles} value={isSalesOrder ? soForm.contactEmail : poForm.contactEmail} onChange={handleFormChange} />
				{isSalesOrder ? (
					<TextField required margin="dense" id="itemName" name="itemName" label="Item Name" type="text" fullWidth variant="outlined" sx={textFieldStyles} value={soForm.products.itemName} onChange={handleFormChange} />
				) : (
					<>
						<FormControl fullWidth margin="dense" sx={textFieldStyles}>
							<InputLabel id="update-po-product-label">Product</InputLabel>
							<Select labelId="update-po-product-label" id="productId" name="productId" label="Product" value={poForm.productId} required onChange={handlePurchaseProductChange}>
								{selectedPurchaseProductMissing ? (
									<MenuItem value={poForm.productId}>{poForm.products.itemName || "Current Product"}</MenuItem>
								) : null}
								{products.map((product) => (
									<MenuItem key={product._id} value={product._id}>
										{product.title} {product.SKU ? `(${product.SKU})` : ""}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<TextField margin="dense" label="SKU" fullWidth variant="outlined" sx={textFieldStyles} value={poForm.SKU} InputProps={{ readOnly: true }} />
						<TextField margin="dense" label="Item Name" fullWidth variant="outlined" sx={textFieldStyles} value={poForm.products.itemName} InputProps={{ readOnly: true }} />
					</>
				)}
				<FormControl fullWidth margin="dense" sx={textFieldStyles}>
					<InputLabel id="status-label">Status</InputLabel>
					<Select labelId="status-label" id="status" name="status" label="Status" value={isSalesOrder ? soForm.status : poForm.status} required onChange={handleFormChange}>
						<MenuItem value="Pending">Pending</MenuItem>
						<MenuItem value="Approved">Approved</MenuItem>
						<MenuItem value="Received">Received</MenuItem>
						<MenuItem value="Delayed">Delayed</MenuItem>
					</Select>
				</FormControl>
				<div style={{ display: "flex", gap: 16 }}>
					<TextField required margin="dense" id="quantity" name="quantity" label="Quantity" type="number" fullWidth variant="outlined" sx={textFieldStyles} value={isSalesOrder ? soForm.products.quantity : poForm.products.quantity} onChange={handleFormChange} />
					<TextField required margin="dense" id="unitPrice" name="unitPrice" label="Unit Price" type="number" fullWidth variant="outlined" sx={textFieldStyles} value={isSalesOrder ? soForm.products.unitPrice : poForm.products.unitPrice} onChange={handleFormChange} />
				</div>
			</DialogContent>
			<DialogActions sx={{ p: 2, borderTop: `1px solid ${customColors["surface-container"]}` }}>
				<Button onClick={handleModalClose} variant="outlined" sx={{ borderColor: customColors.outline, color: customColors["on-surface"], textTransform: "none", fontWeight: 500, borderRadius: 2, px: 2, py: 1, "&:hover": { backgroundColor: customColors["surface-container"], borderColor: customColors.outline } }}>
					Cancel
				</Button>
				<Button type="submit" variant="contained" disableElevation disabled={!isSalesOrder && !poForm.productId} sx={{ backgroundColor: customColors.primary, color: customColors["on-primary"], textTransform: "none", fontWeight: 600, borderRadius: 2, px: 2, py: 1, "&:hover": { backgroundColor: customColors["primary-dim"] } }}>
					{isSalesOrder ? "Update SO" : "Update PO"}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default UpdateOrdersModal;
