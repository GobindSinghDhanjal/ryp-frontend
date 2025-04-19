import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import avgRating from "../avgRatingUtil";
import styles from "./ProfessorList.module.css";

export default function ProfessorList({ props }) {
  const router = useRouter();

  function onButtonClick(prop) {
    router.push(`/professor?search=${encodeURIComponent(prop._id)}`);
  }

  return (
    <div className={styles.container}>
      {props.map((prop, i) => (
        <Card
          className={styles.card}
          onClick={() => {
            onButtonClick(prop);
          }}
          key={i}
        >
          <CardHeader
            avatar={
              <Avatar
                alt={prop.name}
                src={prop.image}
                sx={{ width: 70, height: 70 }}
              ></Avatar>
            }
            title={prop.name}
            subheader={
              <div>
                {prop.college.name}, {prop.college.university.name}
                <Rating
                  name="read-only"
                  value={avgRating(prop)}
                  precision={0.5}
                  sx={{ display: "flex", fontSize: 16 }}
                  readOnly
                />
              </div>
            }
          />
        </Card>
      ))}
    </div>
  );
}
