// professorUtils.js

import { professors } from "@/public/data/sampledata";

export function calculateAverageRating(professorName) {
    const professor = professors.find(prof => prof.name === professorName);

    if (!professor) {
        return null; // Professor not found
    }

    const feedbackCount = professor.feedback.length;
    if (feedbackCount === 0) {
        return 0; // No feedback available
    }

    const totalRating = professor.feedback.reduce((acc, feedback) => acc + feedback.rating, 0);
    const averageRating = totalRating / feedbackCount;

    return averageRating;
}
