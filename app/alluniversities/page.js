"use client";
import React, { useState, useEffect, Suspense } from "react";
import LoadingScreen from "../components/LoadingScreen"; // Import LoadingScreen

const LazyUniversityList = React.lazy(() => import("./UniversityList"));

const Page = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/universities`);
        if (!response.ok) {
          throw new Error("Failed to fetch universities");
        }
        const data = await response.json();
        setUniversities(data);

        // Simulate loading for at least 2 seconds
        setTimeout(() => {
          setLoading(false);
        }, 2000);
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

export default Page;
