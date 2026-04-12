import Invoice from "../models/Invoice.js";

export const createInvoice = async (req, res) => {
    try {
        const newInvoice = await Invoice.create(req.body);
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