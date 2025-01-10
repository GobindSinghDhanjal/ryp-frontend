import { getProfessorById } from "@/app/utils/getProfessor";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const professor = await getProfessorById(params.id);

    if (!professor) {
      return NextResponse.json(
        { message: "Professor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(professor, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
