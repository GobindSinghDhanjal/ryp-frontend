import dbConnect from "@/app/utils/dbConnect";
import Professor from "@/app/models/Professor";

export const POST = async (request, { params }) => {
  const { id } = params;
  const { rating, comment } = await request.json();

  try {
    if (!rating || rating === 0) {
      return new Response(
        JSON.stringify({ message: "Rating cannot be Null or Zero" }),
        { status: 400 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Find the professor by ID
    const professor = await Professor.findById(id);
    if (!professor) {
      return new Response(JSON.stringify({ message: "Professor not found" }), {
        status: 404,
      });
    }

    // Add the feedback
    const feedback = { rating, comment };
    professor.feedbacks.push(feedback);
    await professor.save();

    // Return the updated professor data
    return new Response(JSON.stringify(professor), { status: 201 });
  } catch (error) {
    console.error("Error adding feedback:", error);
    return new Response(JSON.stringify({ message: "Error adding feedback" }), {
      status: 400,
    });
  }
};
