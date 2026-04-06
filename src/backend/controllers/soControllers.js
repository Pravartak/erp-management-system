import SalesOrder from "../models/SalesOrders.js";

export const createSO = async (req, res) => {
    try {
        const newSO = await SalesOrder.create(req.body);
        res.json(newSO);
    } catch (e) {
        res.status(500).json({ msg: e.message });
    };
};

export const getSO = async (req, res) => {
    try {
        const existingSOs = await SalesOrder.find();
        res.json(existingSOs);
    } catch (e) {
        res.status(500).json({ msg: e.message });
    };
};

export const updateSO = async (req, res) => {
    try {
        const updatedSO = await SalesOrder.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.json(updatedSO);
    } catch (e) {
        res.status(500).json({ msg: e.message });
    };
};

export const deleteSO = async (req, res) => {
    try {
        await SalesOrder.findByIdAndDelete(req.params.id);
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
};