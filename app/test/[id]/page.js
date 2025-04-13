"use client";

import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();
  return (
    <div className="container">
      <div className="sub-container">This is a test route : {id}</div>
    </div>
  );
}
