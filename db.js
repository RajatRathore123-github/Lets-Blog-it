import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const connection = async () => {
  const URL = process.env.DB_URL;
  try {
    await mongoose.connect(URL, { useNewUrlParser: true });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting to the database", error);
  }
};

export default connection;
