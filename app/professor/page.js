"use client";
import {
  Avatar,
  Box,
  Grid,
  Rating,
  Skeleton,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProfessorRating from "./ProfessorRating";
import StudentRating from "./StudentRating";
import ProfessorSkeleton from "./ProfessorSkeleton";
import { Suspense } from 'react'

const ProfessorPage = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  // const { search } = router.query;
  const id = search;
  const [professor, setProfessor] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const [numberOfRatings, setNumberOfRatings] = useState(0);

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

  return (
    <Suspense>
    <div className="professor container">
      <div className="sub-container">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container alignItems="center" spacing={0}>
            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar className="professor-detail-avatar" alt={professor.name} src={professor.image} />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={7}>
              <h2>{professor.name}</h2>
              <p>{professor.title}</p>
              <hr />
              <h4>
                {professor.college.name}, {professor.college.university.name}
              </h4>
              <Rating
                name="read-only"
                value={averageRating}
                precision={0.5}
                sx={{ display: "flex", fontSize: 16 }}
                readOnly
              />
              <small>({numberOfRatings} Ratings)</small>
            </Grid>
          </Grid>
        </Box>
        <br />
        <hr />
        <ProfessorRating id={professor._id} />
        <br />
        <hr />
        <h3>Student Ratings</h3>
        <StudentRating feedback={professor.feedbacks} />
      </div>
    </div>
    </Suspense>
  );
};

export default ProfessorPage;
