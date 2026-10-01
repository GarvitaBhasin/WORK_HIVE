import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/jobportal";
        await mongoose.connect(mongoUri);
        console.log(`✅ MongoDB connected successfully to: ${mongoUri.includes('@') ? mongoUri.split('@')[1] : mongoUri}`);
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
        console.log("💡 Tip: Ensure MongoDB is running locally (e.g., MongoDB Compass/Community) or provide your MongoDB Atlas cluster URI in backend/.env");
    }
}
export default connectDB;