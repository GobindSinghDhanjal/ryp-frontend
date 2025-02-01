import { NextResponse } from "next/server";
import dbConnect from "@/app/utils/dbConnect";
import TempProfessor from "@/app/models/TempProfessor";

// GET all temporary professors
export async function GET() {
  try {
    await dbConnect();
    const tempProfessors = await TempProfessor.find();
    return NextResponse.json(tempProfessors);
  } catch (err) {
    console.error(err.message);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}