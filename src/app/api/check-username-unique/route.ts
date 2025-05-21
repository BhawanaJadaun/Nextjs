"use client";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { NextResponse } from "next/server";

function isValidUsername(username: string) {
  return typeof username === "string" && username.trim().length > 0;
}

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParam = searchParams.get("username");

    if (!queryParam) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing username query parameter",
        },
        { status: 400 }
      );
    }

    const username = queryParam;

    if (!isValidUsername(username)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid username",
        },
        { status: 400 }
      );
    }

    // Check if username exists and is verified
    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Username is unique",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking username", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error checking username",
      },
      { status: 500 }
    );
  }
}
