"use client";
import React, { useEffect, useState, Suspense } from "react";
import ProfessorSkeleton from "./ProfessorSkeleton";
import SuccessPage from "./RatingSuccess";
// import Head from "next/head";
import { Skeleton } from "@mui/material";
import StudentRating from "./StudentRating";

const LazyProfessorRating = React.lazy(() => import("./ProfessorRating"));
// const LazyStudentRating = React.lazy(() => import("./StudentRating"));
const LazyProfessorProfile = React.lazy(() => import("./ProfessorProfile"));

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
          {/* Lazy load ProfessorProfile component */}
          <LazyProfessorProfile professor={professor} />
          <br />
          <hr />
          {/* Lazy load ProfessorRating component */}
          <Suspense
            fallback={<Skeleton variant="text" height={280} width="100%" />}
          >
            <LazyProfessorRating id={professor._id} setSuccess={setSuccess} />
          </Suspense>
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
