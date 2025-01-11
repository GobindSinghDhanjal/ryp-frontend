import dbConnect from "@/app/utils/dbConnect";
import Professor from "@/app/models/Professor";

export async function GET(req) {
  try {
    await dbConnect();

    const topProfessors = await Professor.aggregate([
      {
        // Only select the necessary fields and exclude 'feedbacks'
        $project: {
          name: 1,
          image: 1,
          title: 1,
          averageRating: { $avg: "$feedbacks.rating" }, // Calculate average rating
        },
      },
      {
        // Round the average rating to two decimal places
        $addFields: {
          averageRating: { $round: ["$averageRating", 2] },
        },
      },
      {
        // Sort professors by the average rating in descending order
        $sort: { averageRating: -1 },
      },
      {
        // Limit the results to the top 3 professors
        $limit: 3,
      },
    ]);

    // Send the result as a JSON response
    return new Response(JSON.stringify(topProfessors), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Handle any errors
    console.error("Error fetching top professors:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching top professors" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
