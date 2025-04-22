"use client";
import { Suspense } from "react";
import UniversityPageSkeleton from "./UniversityPageSkeleton";
import University from "./University";

const Page = () => {
  return (
    <Suspense fallback={<UniversityPageSkeleton />}>
      <University />
    </Suspense>
  );
};

export default Page;
