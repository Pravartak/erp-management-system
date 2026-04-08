import mongoose from "mongoose";

const purchaseOrdersSchema = new mongoose.Schema({
    orderNumber: String,
    supplier: String,
    productId: String,
    SKU: String,
    contactEmail: String,
    products: {
        itemName: String,
        quantity: Number,
        unitPrice: Number
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Received", "Delayed"],
        default: "Pending"
    }
}, { timestamps: true });

export default mongoose.model("PurchaseOrder", purchaseOrdersSchema);