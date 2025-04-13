import dbConnect from "@/app/utils/dbConnect";
import University from "@/app/models/University";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const universities = await University.find().limit(3);
    return NextResponse.json(universities);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
