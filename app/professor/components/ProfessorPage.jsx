import { Suspense } from "react";
import RatingForm from "./RatingForm";
import StudentRating from "./StudentRating";
import { Skeleton } from "@mui/material";
import ProfessorProfile from "./ProfessorProfile";

export default function ProfessorDetails() {
  return (
    <div className="professor container">
      <div className="sub-container">
        <ProfessorProfile
          professor={professor}
          averageRating={averageRating}
          numberOfRatings={numberOfRatings}
        />

        <br />
        <hr />

        <Suspense
          fallback={<Skeleton variant="text" height={280} width="100%" />}
        >
          <RatingForm id={professor._id} />
        </Suspense>

        <br />
        <hr />

        <h3>Student Ratings</h3>

        <StudentRating feedback={professor.feedbacks} />
      </div>
    </div>
  );
}
