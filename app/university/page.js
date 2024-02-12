"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SearchBox from "../components/SearchBox";
import { professors, universities } from "@/public/data/sampledata";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import SingleAvatar from "../components/SingleAvatar";
import SingleCard from "../components/SingleCard";

const page = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const router = useRouter();
  const [universityData, setUniversityData] = useState(null);
  const [filteredProfessors, setFilteredProfessors] = useState([]);

  useEffect(() => {
    if (!search) {
      router.push("/");
      return;
    }

    // Check if the university data exists in your dataset
    const data = universities.find((university) => university.name === search);

    if (data) {
      setUniversityData(data);

      // Filter professors based on university name
      const filteredProfessors = professors.filter(
        (professor) => professor.university === data.name
      );
      setFilteredProfessors(filteredProfessors);
    } else {
      router.push("/");
    }
  }, [search, router]);

  if (!universityData) {
    return <div>Loading...</div>;
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
        <SingleCard props={filteredProfessors} />
      </div>
    </div>
  );
};

export default page;
