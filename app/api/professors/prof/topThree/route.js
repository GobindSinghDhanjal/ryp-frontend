import dbConnect from "@/app/utils/dbConnect";
import Professor from "@/app/models/Professor";
import { NextResponse } from "next/server";
import College from "@/app/models/College";
import University from "@/app/models/University";

// Function to calculate the average rating for each professor
const calculateAverageRating = (feedbacks) => {
  if (feedbacks.length === 0) return 0;
  const totalRating = feedbacks.reduce(
    (acc, feedback) => acc + feedback.rating,
    0
  );
  return totalRating / feedbacks.length;
};

export async function GET() {
  try {
    await dbConnect();

    // Fetch all professors from the database
    const professors = await Professor.find().populate("college");

    // Calculate average rating for each professor
    const professorsWithRatings = professors.map((professor) => ({
      ...professor.toObject(),
      averageRating: calculateAverageRating(professor.feedbacks),
    }));

    // Sort professors by average rating in descending order
    professorsWithRatings.sort((a, b) => b.averageRating - a.averageRating);

    // Get the top 3 professors
    const topProfessors = professorsWithRatings.slice(0, 3);

    return NextResponse.json(topProfessors);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching professors." },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    await dbConnect();

    // Fetch all professors from the database
    const professors = await Professor.find().populate("college");

    // Calculate average rating for each professor
    const professorsWithRatings = professors.map((professor) => ({
      ...professor.toObject(),
      averageRating: calculateAverageRating(professor.feedbacks),
    }));

    // Sort professors by average rating in descending order
    professorsWithRatings.sort((a, b) => b.averageRating - a.averageRating);

    // Get the top 3 professors
    const topProfessors = professorsWithRatings.slice(0, 3);

    return NextResponse.json({ success: true, data: topProfessors });
  } catch (error) {
    console.error("Error fetching professors:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred while fetching professors." },
      { status: 500 }
    );
  }
}
