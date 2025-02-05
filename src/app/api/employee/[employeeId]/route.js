import { Employee } from "@/models/Employee";
import { NextResponse } from "next/server";

//getting single id API
export async function GET(_request, { params }) {
  const { employeeId } = params;

  try {
    const getSingleEmployee = await Employee.findById(employeeId);

    return NextResponse.json(
      {
        getSingleEmployee,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Failed to get single employee",
      },
      {
        status: 404,
      }
    );
  }
}

//creating updateAPI
export async function PUT(request, { params }) {
  const { employeeId } = params;

  //get data from frontend
  const { name, email, address, salary } = await request.json();

  try {
    let employee = await Employee.findById(employeeId);
    //update name
    employee.name = name;
    //update email
    employee.email = email;
    //update address
    employee.address = address;
    //update salary
    employee.salary = salary;
    //saving the update data
    const updateEmployee = await employee.save();

    return NextResponse.json(
      {
        updateEmployee,
        message: "Employee update succesfull",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Employee update failed",
      },
      {
        status: 404,
      }
    );
  }
}

//create delete API
export async function DELETE(_request, { params }) {
  const { employeeId } = params;

  try {
    await Employee.deleteOne({
      _id: employeeId,
    });

    return NextResponse.json(
      {
        message: "Employee deleted successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);

    // Return Error And Status
    return NextResponse.json(
      {
        error: "failed to delete employee",
      },
      {
        status: 404,
      }
    );
  }
}
