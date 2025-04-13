// import { Suspense } from "react";
// import { notFound } from "next/navigation";
// import ProfessorProfile from "../components/ProfessorProfile";
// import StudentRating from "../components/StudentRating";
// import RatingForm from "../components/RatingForm";
// import { Skeleton } from "@mui/material";

// async function getProfessorData(id) {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_NEXT_BASE_URL}/professors/${id}`
//     );

//     if (!response.ok) {
//       return null;
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching professor data:", error);
//     return null;
//   }
// }

// function calculateRatingStats(professor) {
//   if (!professor.feedbacks || professor.feedbacks.length === 0) {
//     return { averageRating: null, numberOfRatings: 0 };
//   }

//   const ratings = professor.feedbacks.map((feedback) => feedback.rating);
//   const averageRating =
//     ratings.reduce((total, rating) => total + rating, 0) / ratings.length;

//   return { averageRating, numberOfRatings: ratings.length };
// }

// export async function generateMetadata({ params }) {
//   const id = params.id;
//   const professor = await getProfessorData(id);

//   if (!professor) {
//     return {
//       title: "Professor Not Found",
//       description: "No professor data available.",
//     };
//   }

//   return {
//     title: `${professor.name} - Rate Your Professor`,
//     description: `Read reviews and ratings for ${professor.name}, a professor at ${professor.college.name}, ${professor.college.university.name}.`,
//     keywords: `${professor.name}, ${professor.title}, professor ratings, rate your professor`,
//     openGraph: {
//       title: `${professor.name} - Rate Your Professor`,
//       description: `Read reviews and ratings for ${professor.name}, a professor at ${professor.college.name}, ${professor.college.university.name}.`,
//       images: professor.image ? [{ url: professor.image }] : [],
//       url: `https://www.rateyourprofessor.in/professor/${professor._id}`,
//     },
//   };
// }

// export default async function ProfessorPage({ params }) {
//   const id = params.id;
//   const professor = await getProfessorData(id);

//   if (!professor) {
//     notFound();
//   }

//   const { averageRating, numberOfRatings } = calculateRatingStats(professor);

//   return (
//     <>
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "Person",
//             name: professor.name,
//             jobTitle: professor.title,
//             worksFor: {
//               "@type": "Organization",
//               name: professor.college.name,
//               parentOrganization: {
//                 "@type": "Organization",
//                 name: professor.college.university.name,
//               },
//             },
//             aggregateRating:
//               numberOfRatings > 0
//                 ? {
//                     "@type": "AggregateRating",
//                     ratingValue: averageRating.toFixed(1),
//                     ratingCount: numberOfRatings,
//                     bestRating: "5",
//                     worstRating: "1",
//                   }
//                 : undefined,
//           }),
//         }}
//       />

//       <div className="professor container">
//         <div className="sub-container">
//           <ProfessorProfile
//             professor={professor}
//             averageRating={averageRating}
//             numberOfRatings={numberOfRatings}
//           />

//           <br />
//           <hr />

//           <Suspense
//             fallback={<Skeleton variant="text" height={280} width="100%" />}
//           >
//             <RatingForm id={professor._id} />
//           </Suspense>

//           <br />
//           <hr />

//           <h3>Student Ratings</h3>

//           <StudentRating feedback={professor.feedbacks} />
//         </div>
//       </div>
//     </>
//   );
// }
export const revalidate = 10;

import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProfessorProfile from "../components/ProfessorProfile";
import StudentRating from "../components/StudentRating";
import RatingForm from "../components/RatingForm";
import { Skeleton } from "@mui/material";

async function getProfessorDataFresh(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_BASE_URL}/professors/${id}`,
      {
        next: { revalidate: 10 },
      }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

// 🟡 For metadata (cached OK)
async function getProfessorDataMeta(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_BASE_URL}/professors/${id}`
    );
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

function calculateRatingStats(professor) {
  const ratings = professor.feedbacks?.map((f) => f.rating) || [];
  const average = ratings.length
    ? ratings.reduce((a, b) => a + b, 0) / ratings.length
    : null;
  return { averageRating: average, numberOfRatings: ratings.length };
}

export async function generateMetadata({ params }) {
  const professor = await getProfessorDataMeta(params.id);

  if (!professor) {
    return {
      title: "Professor Not Found",
      description: "No professor data available.",
    };
  }

  return {
    title: `${professor.name} - Rate Your Professor`,
    description: `Read reviews and ratings for ${professor.name}, a professor at ${professor.college.name}, ${professor.college.university.name}.`,
    openGraph: {
      title: `${professor.name} - Rate Your Professor`,
      description: `Read reviews and ratings for ${professor.name}, a professor at ${professor.college.name}, ${professor.college.university.name}.`,
      url: `https://www.rateyourprofessor.in/professor/${professor._id}`,
    },
  };
}

export default async function ProfessorPage({ params }) {
  const professor = await getProfessorDataFresh(params.id);
  if (!professor) notFound();

  const { averageRating, numberOfRatings } = calculateRatingStats(professor);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: professor.name,
            jobTitle: professor.title,
            worksFor: {
              "@type": "Organization",
              name: professor.college.name,
              parentOrganization: {
                "@type": "Organization",
                name: professor.college.university.name,
              },
            },
            aggregateRating:
              numberOfRatings > 0
                ? {
                    "@type": "AggregateRating",
                    ratingValue: averageRating.toFixed(1),
                    ratingCount: numberOfRatings,
                    bestRating: "5",
                    worstRating: "1",
                  }
                : undefined,
          }),
        }}
      />

      <div className="professor container">
        <div className="sub-container">
          <ProfessorProfile
            professor={professor}
            averageRating={averageRating}
            numberOfRatings={numberOfRatings}
          />
          <br />
          <hr />

          <Suspense
            fallback={<Skeleton variant="text" height={280} width="100%" />}
          >
            <RatingForm id={professor._id} />
          </Suspense>

          <br />
          <hr />
          <h3>Student Ratings</h3>
          <StudentRating feedback={professor.feedbacks} />
        </div>
      </div>
    </>
  );
}
