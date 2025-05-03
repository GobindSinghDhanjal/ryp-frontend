"use client";
import { Skeleton, Avatar } from "@mui/material";
import styles from "./ProfessorSkeleton.module.css";

const ProfessorSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.professorImage}>
        <Skeleton variant="circular">
          <Avatar sx={{ width: 80, height: 80 }} />
        </Skeleton>
      </div>
      <div className={styles.professorDetails}>
        <Skeleton variant="text" width={180} height={30} sx={{ mb: 1 }} />
        <Skeleton variant="text" width={120} height={20} sx={{ mb: 2 }} />
        <hr />
        <Skeleton
          variant="text"
          width={250}
          height={20}
          sx={{ mt: 2, mb: 2 }}
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={60}
        //   borderRadius={10}
        />
      </div>
    </div>
  );
};

export default ProfessorSkeleton;
