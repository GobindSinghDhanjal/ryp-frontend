import dbConnect from "@/app/utils/dbConnect";
import Professor from "@/app/models/Professor";
import College from "@/app/models/College";
import University from "@/app/models/University";

export const searchProfessors = async (searchText) => {
  await dbConnect();

  return Professor.find(
    { name: { $regex: searchText, $options: "i" } },
    { name: 1, image: 1, title: 1, feedbacks: 1, college: 1 }
  ).populate({
    path: "college",
    select: "name",
    populate: {
      path: "university",
      select: "name",
    },
  });
};
