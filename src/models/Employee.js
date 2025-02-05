import mongoose, { Schema } from "mongoose";
//mongoose schema class
const EmployeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

//model is also a class in mongoose
export const Employee =
  mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);
