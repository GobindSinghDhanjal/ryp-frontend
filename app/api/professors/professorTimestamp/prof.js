// import dbConnect from "@/app/utils/dbConnect";
// import Professor from "@/app/models/Professor";

// export async function GET() {
//   try {
//     await dbConnect();

//     const now = new Date();

//     // Count documents missing `createdAt`
//     const missing = await Professor.find({ createdAt: { $exists: false } });
//     console.log("Missing createdAt:", missing.length);

//     // Bypass Mongoose, use native MongoDB driver
//     const result = await Professor.collection.updateMany(
//       { createdAt: { $exists: false } },
//       { $set: { createdAt: now } }
//     );

//     console.log(result); // Should show { acknowledged: true, modifiedCount: X }

//     return new Response(
//       JSON.stringify({
//         message: "Manually set createdAt where missing",
//         modifiedCount: result.modifiedCount,
//         acknowledged: result.acknowledged,
//       }),
//       {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   } catch (error) {
//     return new Response(JSON.stringify({ message: error.message }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }
// import dbConnect from "@/app/utils/dbConnect";
// import Professor from "@/app/models/Professor";

// // Generate random date between two dates
// function getRandomDate(start, end) {
//   return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
// }

// // Add 1 or 2 days to a given date
// function addRandomDays(date) {
//   const daysToAdd = Math.floor(Math.random() * 2) + 1; // 1 or 2
//   const newDate = new Date(date);
//   newDate.setDate(date.getDate() + daysToAdd);
//   return newDate;
// }

// export async function GET() {
//   try {
//     await dbConnect();

//     const startDate = new Date("2025-01-01T00:00:00+05:30");
//     const endDate = new Date("2025-04-30T23:59:59+05:30");

//     const missing = await Professor.find({ createdAt: { $exists: false } });
//     console.log(`Missing createdAt: ${missing.length}`);

//     const bulkOps = missing.map((doc) => {
//       const createdAt = getRandomDate(startDate, endDate);
//       const updatedAt = addRandomDays(createdAt);

//       return {
//         updateOne: {
//           filter: { _id: doc._id },
//           update: {
//             $set: {
//               createdAt,
//               updatedAt,
//             },
//           },
//         },
//       };
//     });

//     if (bulkOps.length > 0) {
//       const result = await Professor.collection.bulkWrite(bulkOps);
//       console.log(result);

//       return new Response(
//         JSON.stringify({
//           message: "Random createdAt and updatedAt set",
//           modifiedCount: result.modifiedCount,
//         }),
//         {
//           status: 200,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//     } else {
//       return new Response(JSON.stringify({ message: "No records to update." }), {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       });
//     }
//   } catch (error) {
//     return new Response(JSON.stringify({ message: error.message }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }
