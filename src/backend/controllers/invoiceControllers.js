import Invoice from "../models/Invoice.js";
import Product from "../models/Product.js";

export const createInvoice = async (req, res) => {
    try {
        const newInvoice = await Invoice.create(req.body);
        const soldQuantitiesByTitle = (req.body.items || []).reduce((totals, item) => {
            const itemName = item?.itemName?.trim();
            const quantity = Number(item?.quantity || 0);

            if (!itemName || quantity <= 0) {
                return totals;
            }

            totals[itemName] = (totals[itemName] || 0) + quantity;
            return totals;
        }, {});

        const soldEntries = Object.entries(soldQuantitiesByTitle);

        if (soldEntries.length > 0) {
            await Promise.all(
                soldEntries.map(async ([title, soldQuantity]) => {
                    const product = await Product.findOne({ title });

                    if (!product) {
                        return;
                    }

                    product.stock = Math.max(0, Number(product.stock || 0) - soldQuantity);
                    await product.save();
                }),
            );
        }

        res.json(newInvoice);
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
};

export const getInvoices = async (req, res) => {
    try {
        const getInvoices = await Invoice.find();
        res.json(getInvoices);
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
};
