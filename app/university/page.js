"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import SearchBox from "../components/SearchBox";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import SingleAvatar from "../components/SingleAvatar";
import UniversityPageSkeleton from "./UniversityPageSkeleton";
import SingleCard from "../components/SingleCard"; // Import SingleCard
import LoadingScreen from "../components/LoadingScreen";
import ProfessorCard from "../components/ProfessorCard";

const Page = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const router = useRouter();

  const [universityData, setUniversityData] = useState(null);
  const [filteredProfessors, setFilteredProfessors] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    const fetchData = async () => {
      if (!search) {
        router.push("/");
        return;
      }

      try {
        const universityResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/universities/${search}`
        );
        if (!universityResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const universityData = await universityResponse.json();
        setUniversityData(universityData);

        // Start timer for minimum loading time of 2 seconds
        const startTime = Date.now();

        // Fetch professors associated with the university
        const professorsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/professors/byUniversity/${universityData._id}`
        );
        if (!professorsResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const professorsData = await professorsResponse.json();

        // Calculate remaining time for minimum loading
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(2000 - elapsedTime, 0);

        // Set filteredProfessors after minimum loading time
        setTimeout(() => {
          setFilteredProfessors(professorsData);
          setLoading(false); // Set loading to false after fetching data
        }, remainingTime);
      } catch (error) {
        console.error("Error fetching university data:", error);
        router.push("/");
      }
    };

    fetchData();
  }, [search, router]);

  if (!universityData) {
    return <UniversityPageSkeleton />;
  }

  return (
    <div className="container">
      <div className="sub-container">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container alignItems="center" spacing={0}>
            <Grid xs={4}>
              <SingleAvatar props={[universityData]} />
            </Grid>
            <Grid xs={8}>
              <h2>{universityData.name}</h2>
            </Grid>
          </Grid>
        </Box>

        <SearchBox />
        {/* Show loading text until filteredProfessors is fetched */}
        {loading ? (
          <LoadingScreen />
        ) : (
          <Suspense fallback={<LoadingScreen />}>
          <ProfessorCard props={filteredProfessors} />
            {/* <SingleCard props={filteredProfessors} /> */}
            {/* <Grid container spacing={2} justifyContent="center">
              {filteredProfessors.map((professor, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <SingleCard props={filteredProfessors} />
                </Grid>
              ))}
            </Grid> */}
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default Page;
