"use client";
import LoadingScreen from "@/app/components/LoadingScreen";
import ProfessorList from "@/app/components/ProfessorList/ProfessorList";
import { useEffect, useState, Suspense } from "react";

const FilteredProfessors = ({ universityId }) => {
  const [filteredProfessors, setFilteredProfessors] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NEXT_BASE_URL}/professors/byUniversity/${universityId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch professors");
        }
        const data = await response.json();
        setFilteredProfessors(data);
      } catch (error) {
        console.error("Error fetching professors:", error);
      } finally {
        setLoading(false);
      }
    };

    if (universityId) {
      fetchProfessors();
    }
  }, [universityId]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <ProfessorList props={filteredProfessors} />
    </Suspense>
  );
};

export default FilteredProfessors;
