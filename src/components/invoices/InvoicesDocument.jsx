import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import MaterialIcon from "../MaterialIcon";
import { customColors } from "../../theme";

const formatCurrency = (value) => {
	const amount = Number(value || 0);
	return `$${amount.toFixed(2)}`;
};

const InvoicesDocument = ({ invoiceForm, onInvoiceFormChange }) => {
	const items = invoiceForm?.items || [];

	return (
		<Paper
			elevation={0}
			sx={{
				backgroundColor: "#fff",
				borderRadius: 2,
				boxShadow: "0px 20px 40px rgba(148, 163, 184, 0.3)",
				p: { xs: 2, sm: 3, lg: 6 },
				minHeight: { xs: "auto", lg: 1056 },
				display: "flex",
				flexDirection: "column",
			}}>
			<Box
				sx={{
					display: "flex",
					flexDirection: { xs: "column", sm: "row" },
					justifyContent: "space-between",
					alignItems: { xs: "stretch", sm: "flex-start" },
					gap: 3,
					mb: { xs: 4, sm: 6 },
				}}>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
					<Box
						sx={{
							width: 48,
							height: 48,
							borderRadius: 2,
							backgroundColor: customColors.primary,
							color: customColors["on-primary"],
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}>
						<MaterialIcon name="corporate_fare" sx={{ fontSize: 28 }} />
					</Box>
					<Box>
						<Typography
							sx={{
								fontSize: 20,
								fontWeight: 900,
								color: "#0f172a",
								letterSpacing: "-0.02em",
							}}>
							EnterpriseERP
						</Typography>
						<Typography
							sx={{ fontSize: 12, color: "#64748b", fontWeight: 500 }}>
							Global Solutions Inc.
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						textAlign: { xs: "left", sm: "right" },
						display: "flex",
						flexDirection: "column",
						gap: 1.5,
						minWidth: { xs: "100%", sm: 220 },
					}}>
					<Typography
						sx={{
							fontSize: { xs: 24, sm: 32 },
							fontWeight: 900,
							color: "rgba(15, 23, 42, 0.1)",
							letterSpacing: "0.2em",
							textTransform: "uppercase",
						}}>
						Invoice
					</Typography>
					<TextField
						size="small"
						label="Invoice Number"
						value={invoiceForm.invoiceNumber || ""}
						InputProps={{ readOnly: true }}
					/>
					<TextField
						size="small"
						type="date"
						label="Invoice Date"
						InputLabelProps={{ shrink: true }}
						value={invoiceForm.invoiceDate || ""}
						InputProps={{ readOnly: true }}
					/>
				</Box>
			</Box>

			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
					gap: { xs: 3, sm: 6 },
					mb: { xs: 4, sm: 6 },
				}}>
				<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
					<Typography
						sx={{
							fontSize: 10,
							textTransform: "uppercase",
							letterSpacing: "0.2em",
							color: "#94a3b8",
							fontWeight: 700,
						}}>
						Bill To
					</Typography>
					<TextField
						size="small"
						label="Customer"
						value={invoiceForm.customer || ""}
						InputProps={{ readOnly: true }}
					/>
					<TextField
						size="small"
						label="Contact Email"
						value={invoiceForm.contactEmail || ""}
						InputProps={{ readOnly: true }}
					/>
					<TextField
						size="small"
						multiline
						minRows={3}
						label="Billing Address"
						value={invoiceForm.billingAddress || ""}
						onChange={(event) =>
							onInvoiceFormChange("billingAddress", event.target.value)
						}
					/>
					<TextField
						size="small"
						label="VAT / Tax ID"
						value={invoiceForm.taxId || ""}
						onChange={(event) =>
							onInvoiceFormChange("taxId", event.target.value)
						}
					/>
				</Box>
				<Box
					sx={{
						backgroundColor: "#f8fafc",
						borderRadius: 2,
						p: 3,
						display: "flex",
						flexDirection: "column",
						gap: 2,
					}}>
					<TextField
						size="small"
						label="Order Reference"
						value={invoiceForm.salesOrderNumber || ""}
						InputProps={{ readOnly: true }}
					/>
					<TextField
						size="small"
						label="Payment Method"
						value={invoiceForm.paymentMethod || ""}
						onChange={(event) =>
							onInvoiceFormChange("paymentMethod", event.target.value)
						}
					/>
					<TextField
						size="small"
						label="Currency"
						value={invoiceForm.currency || ""}
						onChange={(event) =>
							onInvoiceFormChange("currency", event.target.value)
						}
					/>
					<TextField
						size="small"
						label="Status"
						value={invoiceForm.status || ""}
						onChange={(event) =>
							onInvoiceFormChange("status", event.target.value)
						}
					/>
				</Box>
			</Box>

			<Box sx={{ flex: 1, overflowX: "auto" }}>
				<Table sx={{ minWidth: { xs: 560, md: "auto" } }}>
					<TableHead>
						<TableRow>
							{["Description", "Qty", "Unit Price", "Total"].map(
								(head, index) => (
									<TableCell
										key={head}
										sx={{
											borderBottom: "2px solid #0f172a",
											fontSize: 11,
											fontWeight: 800,
											textTransform: "uppercase",
											letterSpacing: "0.12em",
											color: "#0f172a",
											textAlign:
												index === 0 ? "left" : index === 1 ? "center" : "right",
										}}>
										{head}
									</TableCell>
								),
							)}
						</TableRow>
					</TableHead>
					<TableBody>
						{items.map((row, index) => (
							<TableRow key={`${row.itemName}-${index}`}>
								<TableCell sx={{ py: 3 }}>
									<Typography
										sx={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>
										{row.itemName || ""}
									</Typography>
								</TableCell>
								<TableCell
									sx={{
										py: 3,
										textAlign: "center",
										fontSize: 14,
										fontWeight: 600,
									}}>
									{row.quantity || 0}
								</TableCell>
								<TableCell
									sx={{
										py: 3,
										textAlign: "right",
										fontSize: 14,
										fontWeight: 600,
									}}>
									{formatCurrency(row.unitPrice)}
								</TableCell>
								<TableCell
									sx={{
										py: 3,
										textAlign: "right",
										fontSize: 14,
										fontWeight: 800,
										color: "#0f172a",
									}}>
									{formatCurrency(row.lineTotal)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Box>

			<Box sx={{ mt: { xs: 4, sm: 6 }, display: "flex", justifyContent: "flex-end" }}>
				<Box
					sx={{
						width: "100%",
						maxWidth: 280,
						display: "flex",
						flexDirection: "column",
						gap: 1.5,
					}}>
					{[
						{ label: "Subtotal", value: formatCurrency(invoiceForm.subtotal) },
						{
							label: `Tax (${invoiceForm.taxRate || 0}%)`,
							value: formatCurrency(invoiceForm.taxAmount),
						},
					].map((item) => (
						<Box
							key={item.label}
							sx={{
								display: "flex",
								justifyContent: "space-between",
								fontSize: 14,
							}}>
							<Typography sx={{ color: "#64748b", fontWeight: 600 }}>
								{item.label}
							</Typography>
							<Typography sx={{ color: "#0f172a", fontWeight: 700 }}>
								{item.value}
							</Typography>
						</Box>
					))}
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							pt: 2,
							borderTop: "2px solid #0f172a",
						}}>
						<Typography
							sx={{
								fontWeight: 900,
								textTransform: "uppercase",
								color: "#0f172a",
							}}>
							Grand Total
						</Typography>
						<Typography
							sx={{
								fontWeight: 900,
								color: customColors.primary,
								fontSize: 20,
							}}>
							{formatCurrency(invoiceForm.totalAmount)}
						</Typography>
					</Box>
				</Box>
			</Box>

			<Box
				sx={{
					mt: { xs: 5, sm: 8 },
					pt: 4,
					borderTop: "1px solid #f1f5f9",
					display: "grid",
					gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
					gap: 4,
					alignItems: "end",
				}}>
				<Box>
					<Typography
						sx={{
							fontSize: 11,
							fontWeight: 700,
							textTransform: "uppercase",
							letterSpacing: "0.2em",
							color: "#0f172a",
							mb: 1,
						}}>
						Notes & Instructions
					</Typography>
					<Typography
						sx={{
							fontSize: 11,
							color: "#64748b",
							fontStyle: "italic",
							lineHeight: 1.6,
						}}>
						Please include the invoice number on your payment reference.
					</Typography>
				</Box>
				<Box sx={{ textAlign: { xs: "left", md: "right" } }}>
					<Typography sx={{ fontSize: 10, color: "#94a3b8", fontWeight: 600 }}>
						Authorized Signature
					</Typography>
					<Box
						sx={{
							mt: 2,
							borderBottom: "1px solid #cbd5e1",
							width: 128,
							ml: { xs: 0, md: "auto" },
						}}
					/>
					<Typography
						sx={{ mt: 1, fontSize: 12, fontWeight: 700, color: "#0f172a" }}>
						Finance Director
					</Typography>
				</Box>
			</Box>
		</Paper>
	);
};

export default InvoicesDocument;
