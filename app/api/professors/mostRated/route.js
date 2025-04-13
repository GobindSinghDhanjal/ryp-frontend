import dbConnect from "@/app/utils/dbConnect";
import Professor from "@/app/models/Professor";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const professors = await Professor.find({}, "name image feedbacks");

    const sortedProfessors = professors
      .map((prof) => ({
        _id: prof._id,
        name: prof.name,
        image: prof.image,
        feedbackCount: prof.feedbacks?.length || 0,
      }))
      .sort((a, b) => b.feedbackCount - a.feedbackCount)
      .slice(0, 3);

    return NextResponse.json(sortedProfessors);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch top rated professors." },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json({
    success: true,
    message: "Empty POST request received",
  });
}
