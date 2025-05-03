import dbConnect from "@/app/utils/dbConnect";
import Professor from "@/app/models/Professor";
import Count from "@/app/models/Count";
import College from "@/app/models/College";
import University from "@/app/models/University";
import TempProfessor from "@/app/models/TempProfessor";

// GET request to fetch professors
export async function GET(req, res) {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch professors with populated college and university fields
    const professors = await Professor.find()
      .populate({
        path: "college",
        select: "name", // Selecting only the name field from the College document
        populate: {
          path: "university",
          select: "name", // Selecting only the name field from the University document
        },
      })
      .select("name image createdAt updatedAt college university");

    // Increment the count by 1
    await Count.findOneAndUpdate(
      {}, // Find any document
      { $inc: { count: 1 } }, // Increment the `count` field by 1
      { new: true, upsert: true } // Create the document if it doesn't exist
    );

    // Return the professors data as JSON
    return new Response(JSON.stringify(professors), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// POST request to create a professor

export async function POST(req, res) {
  const {
    name,
    gender,
    department,
    title,
    image,
    subjects,
    collegeName,
    universityName,
    passcode,
    id,
  } = await req.json(); // Get data from the request body

  if (passcode !== process.env.NEXT_PUBLIC_PASSCODE) {
    return new Response("Forbidden: Invalid passcode", {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    await dbConnect();

    // Check or create the University
    let university = await University.findOne({ name: universityName });
    if (!university) {
      university = new University({ name: universityName });
      university = await university.save();
    }

    // Check or create the College
    let college = await College.findOne({
      name: collegeName,
      university: university._id,
    });
    if (!college) {
      college = new College({ name: collegeName, university: university._id });
      await college.save();
    }

    // Generate image URL if not provided
    let professorImage = image;
    if (!image) {
      const randomNum = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
      professorImage =
        gender === "Male"
          ? `/images/man/man-${randomNum}.png`
          : `/images/woman/woman-${randomNum}.png`;
    }

    // Create the Professor
    const professor = new Professor({
      name,
      gender,
      department,
      title,
      image: professorImage,
      subjects,
      college: college._id,
    });
    const newProfessor = await professor.save();

    // Remove the TempProfessor record
    const tempProfessor = await TempProfessor.findById(id);
    if (!tempProfessor) {
      return new Response(JSON.stringify({ msg: "TempProfessor not found" }), {
        status: 404,
      });
    }

    await TempProfessor.deleteOne({ _id: id });

    return new Response(JSON.stringify(newProfessor), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
