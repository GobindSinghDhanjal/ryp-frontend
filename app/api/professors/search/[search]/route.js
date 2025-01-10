import { searchProfessors } from "@/app/utils/searchProfessors";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const searchText = params.search; // Extract the search text from the URL parameters

    // Call the search function to get professors based on the search text
    const professors = await searchProfessors(searchText);

    // Slice the results to get only the top 4 professors
    const topProfessors = professors.slice(0, 4);

    // Return the top 4 results as JSON
    return NextResponse.json(topProfessors, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
