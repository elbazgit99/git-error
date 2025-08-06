import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGODB_URL = process.env.STRING_URI;

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log("Connected to MongoDB Atlas");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1); // Exit the app if connection fails
    }
};
