import Product from "../models/Product.js";

// To create products
export const createProduct = async (req, res) => {
	try {
		const product = await Product.create(req.body);
		res.json(product);
	} catch (e) {
		res.status(500).json({ msg: e.message });
	}
};

// To read products
export const getProducts = async (req, res) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (e) {
		res.status(500).json({ msg: e.message });
	}
};

// To update products
export const updateProducts = async (req, res) => {
	try {
		const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.json(product);
	} catch (e) {
		res.status(500).json({ msg: e.message });
	}
};

// To delete products
export const deleteProducts = async (req, res) => {
	try {
		await Product.findByIdAndDelete(req.params.id);
		res.json({ msg: "Product deleted" });
	} catch (e) {
		res.status(500).json({ msg: e.message });
	}
};
