import dbConnect from "@/app/utils/dbConnect";
import Professor from "@/app/models/Professor";
import College from "@/app/models/College";
import University from "@/app/models/University";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { universityId } = params;

  try {
    await dbConnect();

    const professors = await Professor.find()
      .populate({
        path: "college",
        match: { university: universityId }, // Filter colleges by universityId
        populate: { path: "university" }, // Populate university details (if needed)
      })
      .collation({ locale: "en", strength: 1 })
      .sort({ name: 1 }) // Sort professors by name in ascending order
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
