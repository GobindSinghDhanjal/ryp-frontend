"use client";
import React, { useState, useEffect, Suspense } from "react";
import LoadingScreen from "../components/LoadingScreen";

const LazyUniversityList = React.lazy(() => import("./UniversityList"));

const Universities = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NEXT_BASE_URL}/universities`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch universities");
        }
        const data = await response.json();
        setUniversities(data);

        setTimeout(() => {
          setLoading(false);
        }, 100);
      } catch (error) {
        console.error("Error fetching universities:", error);
      }
    };

    fetchUniversities();
  }, []);

  return (
    <div className="container">
      <div className="sub-container">
        <h2>Universities</h2>
        <Suspense fallback={<LoadingScreen />}>
          {loading ? (
            <LoadingScreen />
          ) : (
            <LazyUniversityList universities={universities} />
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default Universities;
