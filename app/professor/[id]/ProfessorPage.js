"use client";
import React, { useState } from "react";
import ProfessorSkeleton from "./ProfessorSkeleton";
import SuccessPage from "./RatingSuccess";
import StudentRating from "./StudentRating";
import ProfessorRating from "./ProfessorRating";
import ProfessorProfile from "@/app/components/ProfessorProfile/ProfessorProfile";
// import ProfessorProfile from "./ProfessorProfile";

const ProfessorPage = ({ professor }) => {
  const [success, setSuccess] = useState(false);

  if (!professor) {
    return <ProfessorSkeleton />;
  }

  if (success) {
    return <SuccessPage />;
  }

  return (
    <>
      <div className="professor container">
        <div className="sub-container">
          {/* <ProfessorProfile professor={professor} /> */}
          <ProfessorProfile professor={professor} />

          <br />
          <hr />

          <ProfessorRating id={professor._id} setSuccess={setSuccess} />
          <br />
          <hr />
          <h3>Student Ratings</h3>
          <StudentRating professorId={professor._id} />
        </div>
      </div>
    </>
  );
};

export default ProfessorPage;
