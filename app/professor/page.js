// "use client";
// import { Box, Button, Grid, Rating, Typography } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import SingleAvatar from "../components/SingleAvatar";
// import { useRouter, useSearchParams } from "next/navigation";
// import { professors } from "@/public/data/sampledata";
// import ProfessorRating from "./ProfessorRating";
// import StudentRating from "./StudentRating";

// const page = () => {
//   const searchParams = useSearchParams();
//   const search = searchParams.get("search");
//   const router = useRouter();
//   const [professor, setProfessor] = useState(null);
//   const [averageRating, setAverageRating] = useState(null);
//   const [numberOfRatings, setNumberOfRatings] = useState(0);

//   useEffect(() => {
//     if (!search) {
//       router.push("/");
//       return;
//     }

//     // Check if the university data exists in your dataset
//     const data = professors.find((professor) => professor.name === search);

//     if (data) {
//       setProfessor(data);
//       setAverageRating(calculateAverageRating(data.name));
//     } else {
//       router.push("/");
//     }
//   }, [search, router]);

//   const calculateAverageRating = (professorName) => {
//     const professor = professors.find((prof) => prof.name === professorName);

//     if (!professor) {
//       return null;
//     }

//     const ratings = professor.feedback.map((feedback) => feedback.rating);

//     const averageRating =
//       ratings.reduce((total, rating) => total + rating, 0) / ratings.length;

//     setNumberOfRatings(ratings.length);
//     return averageRating;
//   };

//   if (!professor) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="professor container">
//       <div className="sub-container">
//         <Box sx={{ flexGrow: 1 }}>
//           <Grid container alignItems="center" spacing={0}>
//             <Grid item xs={4}>
//               <SingleAvatar props={[professor]} />
//             </Grid>
//             <Grid item xs={8}>
//               <h2>{professor.name}</h2>
//               <p>{professor.type}</p>
//               <hr />
//               <h4>
//                 {professor.college}, {professor.university}
//               </h4>

//               <Rating
//                 name="read-only"
//                 value={averageRating}
//                 precision={0.5}
//                 sx={{ display: "flex", fontSize: 16 }}
//                 readOnly
//               />
//               <small>({numberOfRatings} Ratings)</small>
//             </Grid>
//           </Grid>
//         </Box>

//         <br />
//         <hr />
//         <ProfessorRating />

//         <br />
//         <hr />

//         <h3>Student Ratings</h3>
//         <StudentRating feedback={professor.feedback} />

//       </div>
//     </div>
//   );
// };

// export default page;
"use client";
import { Avatar, Box, Grid, Rating, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import SingleAvatar from "../components/SingleAvatar";
import { useRouter, useSearchParams } from "next/navigation";
import ProfessorRating from "./ProfessorRating";
import StudentRating from "./StudentRating";

const ProfessorPage = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  // const { search } = router.query;
  const id = search;
  const [professor, setProfessor] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const [numberOfRatings, setNumberOfRatings] = useState(0);

  useEffect(() => {
    if (!id) {
      router.push("/");
      return;
    }

    async function fetchProfessorData() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/professors/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch professor data");
        }
        const data = await response.json();
        setProfessor(data);
        setAverageRating(calculateAverageRating(data));
      } catch (error) {
        console.error("Error fetching professor data:", error);
        router.push("/");
      }
    }

    fetchProfessorData();
  }, [id, router]);

  const calculateAverageRating = (professor) => {
    if (!professor.feedback || professor.feedback.length === 0) {
      return null;
    }

    const ratings = professor.feedback.map((feedback) => feedback.rating);
    const averageRating =
      ratings.reduce((total, rating) => total + rating, 0) / ratings.length;

    setNumberOfRatings(ratings.length);
    return averageRating;
  };

  if (!professor) {
    return (
      <div className="professor-skeleton container">
        <div className="sub-container">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container alignItems="center" spacing={0}>
              <Grid item xs={4}>
                <Skeleton variant="circular" width={76} height={76} />
              </Grid>
              <Grid item xs={8}>
                <Skeleton variant="text" width="80%" height={40} />
                <Skeleton variant="text" width="60%" height={20} />
                <Skeleton variant="text" width="40%" height={20} />
                <Skeleton variant="text" width="80%" height={20} />
              </Grid>
            </Grid>
          </Box>

          <br />
          <hr />

          <Skeleton variant="text" width="40%" height={20} />
          <Skeleton variant="text" width="60%" height={20} />
          <Skeleton variant="text" width="70%" height={20} />

          {/* Other skeleton components related to professor's details */}
        </div>
      </div>
    );
  }

  return (
    <div className="professor container">
      <div className="sub-container">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container alignItems="center" spacing={0}>
            <Grid item xs={4}>
              <Avatar
                alt={professor.name}
                src={professor.image}
                sx={{
                  width: 76,
                  height: 76,
                }}
              />
            </Grid>
            <Grid item xs={8}>
              <h2>{professor.name}</h2>
              <p>{professor.title}</p>
              <hr />
              <h4>
                {professor.college.name}, {professor.college.university.name}
              </h4>

              <Rating
                name="read-only"
                value={averageRating}
                precision={0.5}
                sx={{ display: "flex", fontSize: 16 }}
                readOnly
              />
              <small>({numberOfRatings} Ratings)</small>
            </Grid>
          </Grid>
        </Box>

        <br />
        <hr />

        <ProfessorRating />

        <br />
        <hr />

        <h3>Student Ratings</h3>
        <StudentRating feedback={professor.feedbacks} />

        {/* Other components related to professor's details */}
      </div>
    </div>
  );
};

export default ProfessorPage;