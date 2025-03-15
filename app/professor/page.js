import ProfessorPage from "./ProfessorPage";
import { Metadata } from "next";

export async function generateMetadata({ searchParams }) {
  const id = searchParams?.search;
  if (!id) {
    return {
      title: "Professor Not Found",
      description: "No professor data available.",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_BASE_URL}/professors/${id}`,
      { next: { revalidate: 0 } }
    );

    if (!response.ok) {
      throw new Error("Professor not found");
    }

    const professor = await response.json();

    return {
      title: `${professor.name} - Rate Your Professor`,
      description: `Read reviews and ratings for ${professor.name}, a professor at ${professor.college.name}, ${professor.college.university.name}.`,
      keywords: `${professor.name}, ${professor.title}, professor ratings, rate your professor`,
      metadataBase: new URL("https://www.rateyourprofessor.in"),
      openGraph: {
        title: `${professor.name} - Rate Your Professor`,
        description: `Read reviews and ratings for ${professor.name}, a professor at ${professor.college.name}, ${professor.college.university.name}.`,
        images: [
          `https://www.rateyourprofessor.in/professor-images/${professor._id}.jpg`,
        ], // Ensure absolute URL
        url: `https://www.rateyourprofessor.in/professor?search=${professor._id}`,
      },
    };
  } catch (error) {
    console.error("Error fetching professor metadata:", error);
    return {
      title: "Error Loading Professor",
      description: "Unable to retrieve professor details.",
    };
  }
}

export default function ProfessorPageWrapper() {
  return <ProfessorPage />;
}
