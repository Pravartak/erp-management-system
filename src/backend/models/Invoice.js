import mongoose from "mongoose";

const invoice = new mongoose.Schema({
    invoiceNumber: String,
    salesOrderId: String,
    salesOrderNumber: String,

    customer: String,
    contactEmail: String,

    billingAddress: String,
    taxId: String,
    invoiceDate: Date,
    paymentMethod: String,
    currency: String,

    items: [
        {
            itemName: String,
            quantity: Number,
            unitPrice: Number,
            lineTotal: Number,
        }
    ],

    subtotal: Number,
    taxRate: Number,
    taxAmount: Number,
    totalAmount: Number,

    status: String,
});

export default mongoose.model("Invoice", invoice);
