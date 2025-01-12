"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProfessorSkeleton from "./ProfessorSkeleton";
import SuccessPage from "./RatingSuccess";
import Head from "next/head";
import { Skeleton } from "@mui/material";

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

  useEffect(() => {
    if (!id) {
      router.push("/");
      return;
    }

    async function fetchProfessorData() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NEXT_BASE_URL}/professors/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch professor data");
        }
        const data = await response.json();
        setAverageRating(calculateAverageRating(data));
        setProfessor(data);

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

  if (!professor) {
    return <ProfessorSkeleton />;
  }

  if (success) {
    return <SuccessPage />;
  }

  return (
    <>
      <Head>
        <title>{`${professor.name} - Rate Your Professor`}</title>
        <meta
          name="description"
          content={`Read reviews and ratings for ${professor.name}, a professor at ${professor.college.name}, ${professor.college.university.name}.`}
        />
        <meta
          name="keywords"
          content={`${professor.name}, ${professor.title}, professor ratings, rate your professor`}
        />
        <meta
          property="og:title"
          content={`${professor.name} - Rate Your Professor`}
        />
        <meta
          property="og:description"
          content={`Read reviews and ratings for ${professor.name}, a professor at ${professor.college.name}, ${professor.college.university.name}.`}
        />
        <meta property="og:image" content={professor.image} />
        <meta
          property="og:url"
          content={`https://www.rateyourprofessor.in/professor?search=${professor._id}`}
        />
      </Head>
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
