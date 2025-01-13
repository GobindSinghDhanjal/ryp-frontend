// import dbConnect from "@/app/utils/dbConnect";
// import Professor from "@/app/models/Professor";

// export async function GET(req) {
//   try {
//     await dbConnect();

//     const topProfessors = await Professor.aggregate([
//       {
//         $project: {
//           name: 1,
//           image: 1,
//           title: 1,
//           averageRating: { $avg: "$feedbacks.rating" },
//         },
//       },
//       {
//         $addFields: {
//           averageRating: { $round: ["$averageRating", 2] },
//         },
//       },
//       {
//         $sort: { averageRating: -1 },
//       },
//       {
//         $limit: 3,
//       },
//     ]);

//     return new Response(JSON.stringify(topProfessors), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//         "Cache-Control": "no-store", // Prevent caching
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching top professors:", error);
//     return new Response(
//       JSON.stringify({ message: "Error fetching top professors" }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   }
// }

// app/api/professors/top-rated/route.js

// app/api/professors/top-rated/route.js

// app/api/professors/top-rated/route.js

// import dbConnect from "@/app/utils/dbConnect";
// import Professor from "@/app/models/Professor";
// import { NextResponse } from 'next/server';  // Make sure to import NextResponse

// export async function GET() {
//   try {
//     await dbConnect();

//     // Using aggregation to get the top 3 professors based on average ratings
//     const professors = await Professor.aggregate([
//       {
//         $addFields: {
//           averageRating: {
//             $avg: "$feedbacks.rating", // Calculate average rating
//           },
//         },
//       },
//       {
//         $sort: { averageRating: -1 }, // Sort in descending order
//       },
//       {
//         $limit: 3, // Get the top 3 professors
//       },
//       {
//         $project: {
//           name: 1,
//           department: 1,
//           title: 1,
//           image: 1,
//           averageRating: 1, // Include the calculated averageRating
//         },
//       },
//     ]);

//     return NextResponse.json(professors);  // Correctly returning the JSON response
//   } catch (error) {
//     return NextResponse.json(
//       { error: "An error occurred while fetching professors." },
//       { status: 500 }
//     );
//   }
// }



// app/api/professors/top-rated/route.js

import dbConnect from "@/app/utils/dbConnect";
import Professor from "@/app/models/Professor";
import { NextResponse } from 'next/server';  // Make sure to import NextResponse

// Function to calculate the average rating for each professor
const calculateAverageRating = (feedbacks) => {
  if (feedbacks.length === 0) return 0;
  const totalRating = feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0);
  return totalRating / feedbacks.length;
};

export async function GET() {
  try {
    await dbConnect();

    // Fetch all professors from the database
    const professors = await Professor.find().populate('college');

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
