import { Avatar, Rating } from "@mui/material";
import styles from "./ProfessorCard.module.css";
import avgRating from "../avgRatingUtil";

export default function ProfessorCard({ prop, onButtonClick }) {
  return (
    <div
      className={styles.professorCard}
      onClick={() => {
        onButtonClick(prop);
      }}
    >
      <div className={styles.image}>
        <Avatar
          alt={prop.name}
          src={prop.image}
          sx={{ width: 70, height: 70 }}
        ></Avatar>
      </div>
      <div className={styles.details}>
        <h3>{prop.name}</h3>
        <div className={styles.college}>
          <p>{prop.college.name}</p>
        </div>

        <Rating
          name="read-only"
          value={avgRating(prop)}
          precision={0.5}
          sx={{ display: "flex", fontSize: 16 }}
          readOnly
        />
      </div>
    </div>
  );
}
