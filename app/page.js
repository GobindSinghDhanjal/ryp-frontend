"use client";
import React, { useEffect, useState } from "react";
import Banner from "./components/Banner";
import { Divider } from "@mui/material";
import SingleAvatar from "./components/SingleAvatar";
import SearchBox from "./components/SearchBox";

export default function Home() {

  const [allySupportsCache, setAllySupportsCache] = useState(null);
  const [professors, setProfessors] = useState([]);
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    // Fetch ally-supports-cache data from localStorage
    // const fetchCacheData = () => {
    //   try {
    //     const cacheData = localStorage.getItem("ally-supports-cache");
    //     if (cacheData) {
    //       setAllySupportsCache(JSON.parse(cacheData));
    //     } else {
    //       console.log("No data found in localStorage for 'ally-supports-cache'");
    //     }
    //   } catch (error) {
    //     console.error("Error fetching data from localStorage:", error);
    //   }
    // };

    // Fetch professors data
    const fetchProfessors = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/professors/prof/topThree`);
        if (!response.ok) {
          throw new Error('Failed to fetch professors');
        }
        const data = await response.json();
        setProfessors(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    const fetchUniversities = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/universities`);
        if (!response.ok) {
          throw new Error('Failed to fetch universities');
        }
        const data = await response.json();
        setUniversities(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    // fetchCacheData();
    fetchUniversities()
    fetchProfessors();
  }, []);

  if(allySupportsCache!=null){
    // console.log("Ally Supports Cache:",JSON.stringify(allySupportsCache));
  }

  // if(professors!=null){
  //   console.log(professors);
  // }

  return (
    <div>
      <Banner />
      {/* <SwiperComponent/> */}
      <div className="sub-container">

      <SearchBox />
        <Divider className="divider" />

        <h3>Top Universities</h3>
        {/* <SingleAvatar props={colleges} /> */}
        <SingleAvatar props={universities} />
        <br />
        <Divider className="divider" />

        <h3>Top Rated Professors</h3>
        <SingleAvatar props={professors} />
      </div>
    </div>
  );
}
