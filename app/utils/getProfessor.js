import dbConnect from "@/app/utils/dbConnect";
import Professor from "@/app/models/Professor";

export const getProfessorById = async (id) => {
  await dbConnect();

  return Professor.findById(id).populate({
    path: "college",
    populate: { path: "university" },
  });
};
