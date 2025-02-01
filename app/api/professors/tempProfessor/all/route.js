import { NextResponse } from "next/server";
import dbConnect from "@/app/utils/dbConnect";
import TempProfessor from "@/app/models/TempProfessor";

export async function GET() {
  try {
    await dbConnect();
    const tempProfessors = await TempProfessor.find();

    return NextResponse.json(tempProfessors, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error(err.message);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const tempProfessors = await TempProfessor.find();

    return NextResponse.json(tempProfessors);
  } catch (err) {
    console.error("Error fetching temp professors:", err.message);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
