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

import dbConnect, { forceReconnect } from "@/app/utils/dbConnect";
import Professor from "@/app/models/Professor";

export async function GET(req) {
  try {
    await forceReconnect(); // Force a reconnection for real-time data

    const topProfessors = await Professor.aggregate([
      {
        $project: {
          name: 1,
          image: 1,
          title: 1,
          averageRating: { $avg: "$feedbacks.rating" },
        },
      },
      {
        $addFields: {
          averageRating: { $round: ["$averageRating", 2] },
        },
      },
      {
        $sort: { averageRating: -1 },
      },
      {
        $limit: 3,
      },
    ]);

    return new Response(JSON.stringify(topProfessors), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store", // Prevent caching
      },
    });
  } catch (error) {
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
