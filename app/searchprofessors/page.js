"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import LoadingScreen from "../components/LoadingScreen";
import SingleCard from "../components/SingleCard";
import Link from "next/link";

const Page = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [professors, setProfessors] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timer;
    if (search) {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/professors/search/${search}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Introduce a delay of 2 seconds
          timer = setTimeout(() => {
            setProfessors(data);
            console.log(data);
            setLoading(false);
          }, 2000);
        })
        .catch((error) => {
          console.error("Error:", error);
          setLoading(false);
        });
    }

    return () => clearTimeout(timer); // Clear the timer on unmount or re-render
  }, [search]);

  return (
    <div className="container">
      <div className="sub-container">
        <h2 style={{ textAlign: "center" }}>Search Results</h2>
        {loading ? (
          <LoadingScreen />
        ) : (
          <div className="professors">
            {professors && professors.length > 0 ? (
              <Suspense fallback={<LoadingScreen />}>
                <SingleCard props={professors} />
              </Suspense>
            ) : (
              <div style={{ textAlign: "center" }}>
              <br />
                <p>No professor with name "{search}"</p>
                <br />
                <hr />
                <br />
                  <Link href="/addprofessor">
                    Didn't Find Your Professor? <br/> Add Now
                  </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
