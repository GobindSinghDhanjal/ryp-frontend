// "use client";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import SearchBox from "../components/SearchBox";
// import { professors } from "@/public/data/sampledata"; // Assuming professors are fetched from another source
// import * as React from "react";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Unstable_Grid2";
// import SingleAvatar from "../components/SingleAvatar";
// import SingleCard from "../components/SingleCard";
// import UniversityPageSkeleton from "./UniversityPageSkeleton";

// const Page = () => {
//   const searchParams = useSearchParams();
//   const search = searchParams.get("search");
//   const router = useRouter();
  
//   const [universityData, setUniversityData] = useState(null);
//   const [filteredProfessors, setFilteredProfessors] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!search) {
//         router.push("/");
//         return;
//       }

//       try {
//         const universityResponse = await fetch(`http://localhost:3005/universities/${search}`);
//         if (!universityResponse.ok) {
//           throw new Error('Network response was not ok');
//         }

//         // const data = await response.json();
//         // setUniversityData(data);

//         const universityData = await universityResponse.json();
//         setUniversityData(universityData);

//         // Fetch professors associated with the university
//         const professorsResponse = await fetch(`http://localhost:3005/professors/byUniversity/${universityData._id}`);
//         if (!professorsResponse.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const professorsData = await professorsResponse.json();
//         setFilteredProfessors(professorsData);

//         // // Filter professors based on university name
//         // const filteredProfessors = professors.filter(
//         //   (professor) => professor.university === data.name
//         // );
//         // setFilteredProfessors(filteredProfessors);
//       } catch (error) {
//         console.error('Error fetching university data:', error);
//         router.push("/");
//       }
//     };

//     fetchData();
//   }, [search, router]);

//   if (!universityData) {
//     return <UniversityPageSkeleton/>;
//   }

//   return (
//     <div className="container">
//       <div className="sub-container">
//         <Box sx={{ flexGrow: 1 }}>
//           <Grid container alignItems="center" spacing={0}>
//             <Grid xs={4}>
//               <SingleAvatar props={[universityData]} />
//             </Grid>
//             <Grid xs={8}>
//               <h2>{universityData.name}</h2>
//             </Grid>
//           </Grid>
//         </Box>

//         <SearchBox />
//         <SingleCard props={filteredProfessors} />
//       </div>
//     </div>
//   );
// };

// export default Page;
"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SearchBox from "../components/SearchBox";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SingleAvatar from "../components/SingleAvatar";
import SingleCard from "../components/SingleCard";
import UniversityPageSkeleton from "./UniversityPageSkeleton";
import { Suspense } from 'react'

const Page = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const router = useRouter();
  
  const [universityData, setUniversityData] = useState(null);
  const [filteredProfessors, setFilteredProfessors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!search) {
        router.push("/");
        return;
      }

      try {
        const universityResponse = await fetch(`http://localhost:3005/universities/${search}`);
        if (!universityResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const universityData = await universityResponse.json();
        setUniversityData(universityData);

        const professorsResponse = await fetch(`http://localhost:3005/professors/byUniversity/${universityData._id}`);
        if (!professorsResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const professorsData = await professorsResponse.json();
        setFilteredProfessors(professorsData);
      } catch (error) {
        console.error('Error fetching university data:', error);
        router.push("/");
      }
    };

    fetchData();
  }, [search, router]);

  if (!universityData) {
    return <UniversityPageSkeleton />;
  }

  return (
    <Suspense>
    <div className="container">
      <div className="sub-container">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container alignItems="center" spacing={0}>
            <Grid item xs={4}>
              <SingleAvatar props={[universityData]} />
            </Grid>
            <Grid item xs={8}>
              <h2>{universityData.name}</h2>
            </Grid>
          </Grid>
        </Box>

        <SearchBox />
        <SingleCard props={filteredProfessors} />
      </div>
    </div>
    </Suspense>
  );
};

export default Page;
