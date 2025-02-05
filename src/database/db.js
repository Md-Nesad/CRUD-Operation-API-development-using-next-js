import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const connection = await mongoose.connect("mongodb://localhost:27017", {
      dbName: "crud",
    });
    console.log("Database connection successful..");
  } catch (error) {
    console.log(error);
    console.log("Database connection failed!");
  }
};
