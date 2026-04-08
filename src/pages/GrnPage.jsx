import { Box, Grid } from "@mui/material";
import { customColors } from "../theme";
import MobileBottomNav from "../components/MobileBottomNav";
import SideNavBar from "../components/SideNavBar";
import TopNavBar from "../components/TopNavBar";
import GrnDeliveryDocuments from "../components/grn/GrnDeliveryDocuments";
import GrnHeader from "../components/grn/GrnHeader";
import GrnInspectionNotes from "../components/grn/GrnInspectionNotes";
import GrnLineItems from "../components/grn/GrnLineItems";
import GrnPrimaryDetails from "../components/grn/GrnPrimaryDetails";
import api from "../backend/api/api.js";
import { useState } from "react";

const getInitialGrnForm = () => ({
	poRef: "",
	receptionDate: "",
	supplier: "",
	productId: "",
	SKU: "",
	contactEmail: "",
	purchaseOrderId: "",
	purchaseOrderStatus: "",
	lineItems: [],
});

const GrnPage = () => {
	const [orderDetails, setOrderDetails] = useState(null);
	const [completeForm, setCompleteForm] = useState(getInitialGrnForm);

	const resetForm = () => {
		setOrderDetails(null);
		setCompleteForm(getInitialGrnForm());
	};

	const fetchPO = async (orderNumber) => {
		const normalizedOrderNumber = orderNumber?.trim();

		if (!normalizedOrderNumber) {
			resetForm();
			return;
		}

		try {
			const response = await api.get("/purchaseOrders");
			const purchaseOrder =
				response.data.find((po) => po.orderNumber === normalizedOrderNumber) ||
				null;

			if (!purchaseOrder) {
				alert("Purchase order not found.");
				resetForm();
				return;
			}

			setOrderDetails(purchaseOrder);
			setCompleteForm({
				poRef: normalizedOrderNumber,
				receptionDate: "",
				supplier: purchaseOrder.supplier || "",
				productId: purchaseOrder.productId || "",
				SKU: purchaseOrder.SKU || "",
				contactEmail: purchaseOrder.contactEmail || "",
				purchaseOrderId: purchaseOrder._id || "",
				purchaseOrderStatus: purchaseOrder.status || "",
				lineItems: [
					{
						itemName: purchaseOrder.products?.itemName || "",
						quantityOrdered: Number(purchaseOrder.products?.quantity || 0),
						receivedQuantity: Number(purchaseOrder.products?.quantity || 0),
						condition: "Good",
						unitPrice: Number(purchaseOrder.products?.unitPrice || 0),
					},
				],
			});
		} catch (e) {
			console.error(e);
			alert("Unable to load the purchase order.");
		}
	};

	const handleGRNSubmit = async () => {
		if (
			!completeForm.purchaseOrderId ||
			!completeForm.productId ||
			completeForm.lineItems.length === 0
		) {
			alert("Load a valid purchase order before submitting the GRN.");
			return;
		}

		const payload = {
			poRef: completeForm.poRef,
			supplier: completeForm.supplier,
			productId: completeForm.productId,
			SKU: completeForm.SKU,
			contactEmail: completeForm.contactEmail,
			purchaseOrderId: completeForm.purchaseOrderId,
			purchaseOrderStatus: completeForm.purchaseOrderStatus,
			lineItems: completeForm.lineItems.map((item) => ({
				itemName: item.itemName,
				receivedQuantity: Number(item.receivedQuantity || 0),
				condition: item.condition,
				unitPrice: Number(item.unitPrice || 0),
			})),
		};

		try {
			await api.post("/grn", payload);
			alert("GRN submitted successfully.");
			resetForm();
		} catch (e) {
			console.error(e);
			alert("Unable to submit the GRN.");
		}
	};

	const handleDiscard = () => {
		resetForm();
	};

	const handlePrimaryDetailsChange = (field, value) => {
		setCompleteForm((currentForm) => ({
			...currentForm,
			[field]: value,
		}));
	};

	const handleLineItemsChange = (lineItems) => {
		setCompleteForm((currentForm) => ({
			...currentForm,
			lineItems,
		}));
	};

	const handleRemoveLineItem = (index) => {
		setCompleteForm((currentForm) => ({
			...currentForm,
			lineItems: currentForm.lineItems.filter(
				(_, itemIndex) => itemIndex !== index,
			),
		}));
	};

	return (
		<Box
			sx={{
				backgroundColor: customColors.background,
				color: customColors["on-background"],
				minHeight: "100vh",
			}}>
			<TopNavBar
				searchVariant="dashboard"
				searchPlaceholder="Search orders, items..."
			/>
			<SideNavBar activeLabel="GRN" />
			<Box
				component="main"
				sx={{ pt: 8, pl: { xs: 0, md: 32 }, minHeight: "100vh" }}>
				<Box
					sx={{
						p: { xs: 3, lg: 5 },
						maxWidth: 1280,
						mx: "auto",
						display: "flex",
						flexDirection: "column",
						gap: 2,
					}}>
					<GrnHeader onDiscard={handleDiscard} onSubmit={handleGRNSubmit} />
					<Grid container spacing={3}>
						<Grid item xs={12} lg={8}>
							<Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
								<GrnPrimaryDetails
									giveOrderNumber={fetchPO}
									orderDetails={orderDetails}
									completeForm={completeForm}
									onFormChange={handlePrimaryDetailsChange}
								/>
								<GrnLineItems
									orderDetails={orderDetails}
									lineItems={completeForm.lineItems}
									onLineItemsChange={handleLineItemsChange}
									onRemoveLineItem={handleRemoveLineItem}
								/>
							</Box>
						</Grid>
						<Grid item xs={12} lg={4}>
							<Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
								<GrnInspectionNotes />
								<GrnDeliveryDocuments />
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<MobileBottomNav activeLabel="Invoices" />
		</Box>
	);
};

export default GrnPage;
