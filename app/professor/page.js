"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProfessorSkeleton from "./ProfessorSkeleton";
import SuccessPage from "./RatingSuccess";
import LoadingScreen from "../components/LoadingScreen";

const LazyProfessorRating = React.lazy(() => import("./ProfessorRating"));
const LazyStudentRating = React.lazy(() => import("./StudentRating"));
const LazyProfessorProfile = React.lazy(() => import("./ProfessorProfile"));

const ProfessorPage = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const id = search;
  const [professor, setProfessor] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const [numberOfRatings, setNumberOfRatings] = useState(0);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    if (!id) {
      router.push("/");
      return;
    }

    async function fetchProfessorData() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/professors/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch professor data");
        }
        const data = await response.json();
        setAverageRating(calculateAverageRating(data));
        setProfessor(data);
        setLoading(false); // Set loading to false after fetching data
        window.scrollTo({ top: 0, behavior: "instant" });
      } catch (error) {
        console.error("Error fetching professor data:", error);
        router.push("/");
      }
    }

    fetchProfessorData();
  }, [id, router]);

  const calculateAverageRating = (professor) => {
    if (!professor.feedbacks || professor.feedbacks.length === 0) {
      return null;
    }

    const ratings = professor.feedbacks.map((feedback) => feedback.rating);

    const averageRating =
      ratings.reduce((total, rating) => total + rating, 0) / ratings.length;

    setNumberOfRatings(ratings.length);
    return averageRating;
  };

  // if (loading) {
  //   // Show loading screen for at least 2 seconds
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);

  //   return <LoadingScreen />;
  // }

  if (!professor) {
    return <ProfessorSkeleton />;
  }

  if (success) {
    return <SuccessPage />;
  }

  return (
    <div className="professor container">
      <div className="sub-container">
        {/* Lazy load ProfessorProfile component */}
        <Suspense fallback={<ProfessorSkeleton />}>
          <LazyProfessorProfile
            professor={professor}
            averageRating={averageRating}
            numberOfRatings={numberOfRatings}
          />
        </Suspense>
        <br />
        <hr />
        {/* Lazy load ProfessorRating component */}
        <Suspense fallback={<ProfessorSkeleton />}>
          <LazyProfessorRating id={professor._id} setSuccess={setSuccess} />
        </Suspense>
        <br />
        <hr />
        <h3>Student Ratings</h3>
        {/* Lazy load StudentRating component */}
        <Suspense fallback={<ProfessorSkeleton />}>
          <LazyStudentRating feedback={professor.feedbacks} />
        </Suspense>
      </div>
    </div>
  );
};

export default ProfessorPage;
