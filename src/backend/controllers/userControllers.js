import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Get users
export const getUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (e) {
		res.status(500).json({ msg: e.message });
	}
};

// Update user
export const updateUser = async (req, res) => {
	const { name, email, password, role } = req.body;
	try {
		const updates = { name, email, role };

		if (password) {
			updates.password = await bcrypt.hash(password, 10);
		}

		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{ $set: updates },
			{
				new: true,
			},
		);
		res.json(updatedUser);
	} catch (e) {
		res.status(500).json({ msg: e.message });
	}
};

// Delete user
export const deleteUser = async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.json({ msg: "User deleted" });
	} catch (e) {
		res.status(500).json({ msg: e.message });
	}
};
