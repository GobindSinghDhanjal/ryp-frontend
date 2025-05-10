import styles from "./university.module.css";
import { Avatar } from "@mui/material";
import FilteredProfessors from "./FilteredProfessors";
import SearchBox from "@/app/components/SearchBox/SearchBox";

const University = ({ university, professors }) => {
  return (
    <div className="container">
      <div className="sub-container">
        <div className={styles.universityHeader}>
          <div className={styles.image}>
            <Avatar
              className={styles.universityImage}
              alt={university.name}
              src={university.image}
            />
          </div>
          <div className={styles.details}>
            <h2>{university.name}</h2>
          </div>
        </div>

        <SearchBox />

        {/* <FilteredProfessors universityId={university._id} /> */}
        <FilteredProfessors professors={professors} />
      </div>
    </div>
  );
};

export default University;
