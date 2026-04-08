import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: String,
    SKU: String,
    category: String,
    price: Number,
    stock: Number,
    supplierName: String,
    contactEmail: String,
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
