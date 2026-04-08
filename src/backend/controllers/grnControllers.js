import GRN from "../models/GRN.js";
import Product from "../models/Product.js";
import PurchaseOrder from "../models/PurchaseOrders.js";

export const createGRN = async (req, res) => {
    try {
        const newGRN = await GRN.create(req.body);

        const totalReceivedQuantity = (req.body.lineItems || []).reduce((total, item) => {
            if (item.condition === "Damaged") {
                return total;
            }

            return total + Number(item.receivedQuantity || 0);
        }, 0);

        if (req.body.productId) {
            const product = await Product.findById(req.body.productId);
            const firstLineItem = req.body.lineItems?.[0];

            if (product) {
                product.stock = Number(product.stock || 0) + totalReceivedQuantity;
                product.SKU = req.body.SKU || product.SKU;
                product.supplierName = req.body.supplier || product.supplierName;
                product.contactEmail = req.body.contactEmail || product.contactEmail;

                if (firstLineItem?.itemName) {
                    product.title = firstLineItem.itemName;
                }

                if (firstLineItem?.unitPrice !== undefined) {
                    product.price = Number(firstLineItem.unitPrice || 0);
                }

                await product.save();
            }
        }

        if (req.body.purchaseOrderId) {
            await PurchaseOrder.findByIdAndUpdate(req.body.purchaseOrderId, {
                status: "Received",
            });
        }

        res.json(newGRN);
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
};

export const getGRN = async (req, res) => {
    try {
        const existingGRNs = await GRN.find();
        res.json(existingGRNs);
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
};
