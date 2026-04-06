import PurchaseOrder from "../models/PurchaseOrders.js";

export const createPO = async (req, res) => {
    try {
        const newPO = await PurchaseOrder.create(req.body);
        res.json(newPO);
    } catch (e) {
        res.status(500).json({ msg: e.message });
    };
};

export const getPO = async (req, res) => {
    try {
        const existingPOs = await PurchaseOrder.find();
        res.json(existingPOs);
    } catch (e) {
        res.status(500).json({ msg: e.message });
    };
};

export const updatePO = async (req, res) => {
    try {
        const updatedPO = await PurchaseOrder.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.json(updatedPO);
    } catch (e) {
        res.status(500).json({ msg: e.message });
    };
};

export const deletePO = async (req, res) => {
    try {
        await PurchaseOrder.findByIdAndDelete(req.params.id);
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
};