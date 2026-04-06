import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    role: {
        type: String,
        enum: ["admin", "sales"],
        default: "sales"
    }
}, { timestamps: true });

export default mongoose.model("User", userSchema);