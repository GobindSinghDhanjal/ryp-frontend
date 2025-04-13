import dbConnect from "@/app/utils/dbConnect";
import Professor from "@/app/models/Professor";
import { NextResponse } from "next/server";

// Helper to calculate average rating
const calculateAverageRating = (feedbacks) => {
  if (!feedbacks.length) return 0;
  const total = feedbacks.reduce((sum, f) => sum + f.rating, 0);
  return total / feedbacks.length;
};

export async function GET() {
  try {
    await dbConnect();

    const professors = await Professor.find({}, "_id name image feedbacks");

    const sorted = professors
      .map((prof) => ({
        _id: prof._id,
        name: prof.name,
        image: prof.image,
        averageRating: calculateAverageRating(prof.feedbacks),
      }))
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, 3);

    return NextResponse.json(sorted);
  } catch (error) {
    return NextResponse.json(
      { error: "Error while fetching top professors." },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json({ message: "POST not implemented." });
}
