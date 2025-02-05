import { connectDb } from "@/database/db";
import { Employee } from "@/models/Employee";
import { NextResponse } from "next/server";
//database connected
connectDb();

//Get employee API
export async function GET() {
  try {
    const getEmployee = await Employee.find();
    return NextResponse.json(getEmployee);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Failed to get Employee",
      },
      {
        status: 404,
      }
    );
  }
}

//ROUTE 2 : POST Employee Detail [http://localhost:3000/api/employee]
export async function POST(request) {
  // get Employee data from frontend
  const { name, email, address, salary } = await request.json();

  // validation
  if (!name || !email || !address || !salary) {
    return NextResponse.json(
      {
        error: "All fields must be required",
      },
      {
        status: 404,
      }
    );
  }

  // find employee through email
  const empl = await Employee.findOne({ email });

  // Condition
  if (empl) {
    return NextResponse.json(
      {
        error: "This employee already exists",
      },
      {
        status: 404,
      }
    );
  }

  // Create Employee
  const employee = new Employee({
    name,
    email,
    address,
    salary,
  });

  try {
    // Create Saved Employee
    const savedEmployee = await employee.save();

    // Return savedEmployee, message, and status
    return NextResponse.json(
      {
        savedEmployee,
        message: "Employee saved successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);

    // return error and status
    return NextResponse.json(
      {
        error: "Failed to save employee",
      },
      {
        status: 404,
      }
    );
  }
}
