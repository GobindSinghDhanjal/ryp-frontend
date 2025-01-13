import dbConnect from "@/app/utils/dbConnect";
import Professor from "@/app/models/Professor";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { universityId } = params;

  try {
    await dbConnect();

    // Fetch all professors and populate college and university details
    const professors = await Professor.find()
      .populate({
        path: "college",
        match: { university: universityId },
        populate: { path: "university" },
      })
      .exec();

    // Filter out professors whose college is not associated with the specified universityId
    const filteredProfessors = professors.filter(
      (professor) => professor.college !== null
    );

    return NextResponse.json(filteredProfessors);
  } catch (error) {
    console.error("Error fetching professors:", error);
    return NextResponse.json(
      { message: "Error fetching professors" },
      { status: 500 }
    );
  }
}
