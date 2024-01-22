import mongoose from "mongoose";
import { DATABASE_URI } from "../config/envConfig.js";

const connectMongoDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(DATABASE_URI);
    const connectionHost = connectionInstance?.connections[0]?.host;
    console.log("database connected successfully !", connectionHost);
  } catch (error) {
    console.log("database connection field", error);
  }
};

export default connectMongoDB;
