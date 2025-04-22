"use client";
import React, { Suspense } from "react";
import LoadingScreen from "../components/LoadingScreen";
import SearchProfessor from "./SearchProfessor";

const Page = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <SearchProfessor />
    </Suspense>
  );
};

export default Page;
