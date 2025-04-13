"use client";
import React, { useEffect, useState } from "react";
import Banner from "./components/Banner";
import { Divider } from "@mui/material";
import SearchBox from "./components/SearchBox";
import TopRatedProfessor from "./components/TopRatedProfessor";
import TopRatedUniversities from "./components/TopRatedUniversities";

export default function Home() {
  const [professors, setProfessors] = useState([]);
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    // Fetch professors data
    const fetchProfessors = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NEXT_BASE_URL}/professors/prof/topThree`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch professors");
        }
        const data = await response.json();
        setProfessors(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    const fetchUniversities = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NEXT_BASE_URL}/universities`,
          { cache: "no-cache" }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch universities");
        }
        const data = await response.json();
        setUniversities(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUniversities();
    fetchProfessors();
  }, []);

  return (
    <div>
      <Banner />
      <div className="sub-container">
        {/* <SearchBox2 /> */}
        <SearchBox />

        <div className="divider-p">
          <Divider className="divider" />
        </div>

        <h3>Top Universities</h3>
        <TopRatedUniversities props={universities} />

        <br />
        <div className="divider-p">
          <Divider className="divider" />
        </div>

        <h3>Top Rated Professors</h3>
        <TopRatedProfessor props={professors} />
      </div>
    </div>
  );
}
