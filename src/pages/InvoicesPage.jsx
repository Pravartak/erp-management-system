import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import MobileBottomNav from "../components/MobileBottomNav";
import SideNavBar from "../components/SideNavBar";
import TopNavBar from "../components/TopNavBar";
import InvoicesDocument from "../components/invoices/InvoicesDocument";
import InvoicesHeader from "../components/invoices/InvoicesHeader";
import InvoicesHistory from "../components/invoices/InvoicesHistory";
import api from "../backend/api/api.js";
import { customColors } from "../theme";

const generateInvoiceNumber = () => {
	const date = new Date();
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const randomPart = Math.floor(1000 + Math.random() * 9000);

	return `INV-${year}${month}${day}-${randomPart}`;
};

const getInitialInvoiceForm = () => ({
	invoiceNumber: generateInvoiceNumber(),
	salesOrderId: "",
	salesOrderNumber: "",
	customer: "",
	contactEmail: "",
	billingAddress: "",
	taxId: "",
	invoiceDate: new Date().toISOString().split("T")[0],
	paymentMethod: "Bank Transfer",
	currency: "USD ($)",
	items: [],
	subtotal: 0,
	taxRate: 20,
	taxAmount: 0,
	totalAmount: 0,
	status: "Draft",
});

const InvoicesPage = () => {
	const [selectedSalesOrder, setSelectedSalesOrder] = useState("");
	const [allSOs, setAllSOs] = useState([]);
	const [savedInvoices, setSavedInvoices] = useState([]);
	const [invoiceForm, setInvoiceForm] = useState(getInitialInvoiceForm);

	const fetchAllSOs = async () => {
		try {
			const res = await api.get("/salesOrders");
			setAllSOs(res.data);
		} catch (e) {
			console.error(e);
		}
	};

	const fetchInvoices = async () => {
		try {
			const res = await api.get("/invoices");
			setSavedInvoices(res.data);
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		fetchAllSOs();
		fetchInvoices();
	}, []);

	const fetchSODetails = async (salesOrderId) => {
		const salesOrder = allSOs.find((so) => so._id === salesOrderId);
		if (!salesOrder) {
			return;
		}

		const items = salesOrder.products
			? Array.isArray(salesOrder.products)
				? salesOrder.products.map((item) => ({
					itemName: item.itemName || "",
					quantity: Number(item.quantity || 0),
					unitPrice: Number(item.unitPrice || 0),
					lineTotal: Number(item.quantity || 0) * Number(item.unitPrice || 0),
				}))
				: [
					{
						itemName: salesOrder.products.itemName || "",
						quantity: Number(salesOrder.products.quantity || 0),
						unitPrice: Number(salesOrder.products.unitPrice || 0),
						lineTotal: Number(salesOrder.products.quantity || 0) * Number(salesOrder.products.unitPrice || 0),
					},
				]
			: [];

		const subtotal = items.reduce((total, item) => total + item.lineTotal, 0);
		const taxRate = 20;
		const taxAmount = Math.ceil((taxRate / 100) * subtotal);
		const totalAmount = subtotal + taxAmount;

		setInvoiceForm({
			invoiceNumber: generateInvoiceNumber(),
			salesOrderId: salesOrder._id,
			salesOrderNumber: salesOrder.orderNumber || "",
			customer: salesOrder.customer || "",
			contactEmail: salesOrder.contactEmail || "",
			billingAddress: "",
			taxId: "",
			invoiceDate: new Date().toISOString().split("T")[0],
			paymentMethod: "Bank Transfer",
			currency: "USD ($)",
			items,
			subtotal,
			taxRate,
			taxAmount,
			totalAmount,
			status: "Draft",
		});
	};

	const handleInvoiceFormChange = (field, value) => {
		setInvoiceForm((currentForm) => ({
			...currentForm,
			[field]: value,
		}));
	};

	const handleSubmitForm = async () => {
		if (!invoiceForm.salesOrderId || invoiceForm.items.length === 0) {
			alert("Select a sales order before saving the invoice.");
			return;
		}

		if (!invoiceForm.billingAddress.trim()) {
			alert("Enter a billing address before saving the invoice.");
			return;
		}

		if (!invoiceForm.taxId.trim()) {
			alert("Enter VAT / Tax ID before saving the invoice.");
			return;
		}

		try {
			await api.post("/invoices", invoiceForm);
			alert("Invoice saved!");
			setSelectedSalesOrder("");
			setInvoiceForm(getInitialInvoiceForm());
			fetchInvoices();
		} catch (e) {
			console.error(e);
			alert("Could not save invoice.");
		}
	};

	return (
		<Box sx={{ backgroundColor: customColors.background, color: customColors["on-background"], minHeight: "100vh" }}>
			<TopNavBar searchVariant="dashboard" />
			<SideNavBar activeLabel="Invoices" />
			<Box component="main" sx={{ pt: 8, pl: { xs: 0, md: 32 }, minHeight: "100vh" }}>
				<Box sx={{ p: { xs: 3, lg: 5 }, maxWidth: 1280, mx: "auto", display: "flex", flexDirection: "column", gap: 2 }}>
					<InvoicesHeader
						salesOrders={allSOs}
						selectedSalesOrder={selectedSalesOrder}
						onSalesOrderChange={setSelectedSalesOrder}
						fetchSODetails={fetchSODetails}
						saveInvoice={handleSubmitForm}
					/>
					<Grid container spacing={4}>
						<Grid item xs={12} lg={8}>
							<InvoicesDocument invoiceForm={invoiceForm} onInvoiceFormChange={handleInvoiceFormChange} />
						</Grid>
						<Grid item xs={12} lg={4}>
							<InvoicesHistory invoices={savedInvoices} />
						</Grid>
					</Grid>
				</Box>
			</Box>
			<MobileBottomNav activeLabel="Invoices" />
		</Box>
	);
};

export default InvoicesPage;
