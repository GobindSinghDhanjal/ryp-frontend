"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import SearchBox from "../components/SearchBox/SearchBox";
import styles from "./university.module.css";
import { Avatar } from "@mui/material";
import UniversityPageSkeleton from "./UniversityPageSkeleton";
import LoadingScreen from "../components/LoadingScreen";
import ProfessorList from "../components/ProfessorList/ProfessorList";

const University = () => {
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
          `${process.env.NEXT_PUBLIC_NEXT_BASE_URL}/universities/${search}`
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
          `${process.env.NEXT_PUBLIC_NEXT_BASE_URL}/professors/byUniversity/${universityData._id}`
        );
        if (!professorsResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const professorsData = await professorsResponse.json();

        setFilteredProfessors(professorsData);
        setLoading(false);
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
        <div className={styles.universityHeader}>
          <div className={styles.image}>
            <Avatar
              className={styles.universityImage}
              alt={universityData.name}
              src={universityData.image}
            />
          </div>
          <div className={styles.details}>
            <h2>{universityData.name}</h2>
          </div>
        </div>

        <SearchBox />

        {loading ? (
          <LoadingScreen />
        ) : (
          <Suspense fallback={<LoadingScreen />}>
            <ProfessorList props={filteredProfessors} />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default University;
