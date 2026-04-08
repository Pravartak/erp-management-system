import mongoose from "mongoose";

const grnSchema = new mongoose.Schema({
    poRef: String,
    supplier: String,
    productId: String,
    SKU: String,
    contactEmail: String,
    purchaseOrderId: String,
    purchaseOrderStatus: String,
    lineItems: [
        {
            itemName: String,
            receivedQuantity: Number,
            condition: String,
            unitPrice: Number
        }
    ]
}, {timestamps: true});

export default mongoose.model("GRN", grnSchema);