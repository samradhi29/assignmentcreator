import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

import Assignment from "@/models/schema";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    await connectDB();

    const { id } = await params;

    const assignment = await Assignment.findById(id).lean();

    if (!assignment) {
      return NextResponse.json(
        {
          success: false,
          message: "Assignment not found",
        },
        {
          status: 404,
        }
      );
    }

  
    const serialized = JSON.parse(JSON.stringify(assignment));

    return NextResponse.json(serialized);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}