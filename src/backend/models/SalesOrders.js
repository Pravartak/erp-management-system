import mongoose from "mongoose";

const salesOrdersSchema = new mongoose.Schema(
	{
		orderNumber: String,
		customer: String,
		contactEmail: String,
		products: [
			{
				itemName: String,
				quantity: Number,
				unitPrice: Number,
			},
		],
		status: {
			type: String,
			enum: ["Pending", "Approved", "Received", "Delayed"],
			default: "Pending",
		},
	},
	{ timestamps: true },
);

export default mongoose.model("SalesOrder", salesOrdersSchema);
