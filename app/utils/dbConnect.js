// import mongoose from "mongoose";

// const MONGO_URI = process.env.NEXT_PUBLIC_MONGO_URI;

// if (!MONGO_URI) {
//   throw new Error("Please define the MONGO_URI environment variable");
// }

// let isConnected = null;

// export async function dbConnect() {
//   if (isConnected) {
//     return;
//   }

//   console.log("hello db");
  

//   try {
//     const connection = await mongoose.connect(MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     isConnected = connection.connections[0].readyState;
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("Failed to connect to MongoDB:", error);
//     throw error;
//   }
// }

import mongoose from "mongoose";

let isConnected = false; // To track database connection state

const dbConnect = async () => {
  if (isConnected) {
    console.log("Database is already connected.");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState;
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    throw new Error(error);
  }
};

export default dbConnect;
