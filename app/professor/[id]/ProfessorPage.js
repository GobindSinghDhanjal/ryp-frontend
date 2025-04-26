"use client";
import React, { useEffect, useState, Suspense } from "react";
import ProfessorSkeleton from "./ProfessorSkeleton";
import SuccessPage from "./RatingSuccess";
import Head from "next/head";
import { Skeleton } from "@mui/material";

const LazyProfessorRating = React.lazy(() => import("./ProfessorRating"));
const LazyStudentRating = React.lazy(() => import("./StudentRating"));
const LazyProfessorProfile = React.lazy(() => import("./ProfessorProfile"));

const ProfessorPage = ({ professor }) => {
  const [averageRating, setAverageRating] = useState(null);
  const [numberOfRatings, setNumberOfRatings] = useState(0);
  const [success, setSuccess] = useState(false);

  const calculateAverageRating = (professor) => {
    if (!professor.feedbacks || professor?.feedbacks.length === 0) {
      return null;
    }

    const ratings = professor.feedbacks.map((feedback) => feedback.rating);

    const averageRating =
      ratings.reduce((total, rating) => total + rating, 0) / ratings.length;

    setNumberOfRatings(ratings.length);
    return averageRating;
  };

  useEffect(() => {
    setAverageRating(calculateAverageRating(professor));
  }, [professor]);

  if (!professor) {
    return <ProfessorSkeleton />;
  }

  if (success) {
    return <SuccessPage />;
  }

  return (
    <>
      <Suspense fallback={<ProfessorSkeleton />}>
        <div className="professor container">
          <div className="sub-container">
            {/* Lazy load ProfessorProfile component */}
            <LazyProfessorProfile
              professor={professor}
              averageRating={averageRating}
              numberOfRatings={numberOfRatings}
            />
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
            {/* Lazy load StudentRating component */}

            <LazyStudentRating feedback={professor.feedbacks} />
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default ProfessorPage;
