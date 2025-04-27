import Avatar from "@mui/material/Avatar";
import { useRouter } from "next/navigation";
import { Rating, Skeleton } from "@mui/material";
import styles from "./TopUniversities.module.css";

export default function TopUniversities({ props }) {
  const router = useRouter();

  function onButtonClick(prop) {
    router.push(`/university/${prop._id}`);
  }

  if (!props || !props.length) {
    return (
      <div className={styles.container}>
        {[1, 2, 3].map((_, i) => (
          <div className="homepage-avatar" key={i}>
            <Skeleton variant="circular" width={76} height={76} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {props.map(
        (prop, i) =>
          i < 3 && (
            <div
              className="homepage-avatar"
              onClick={() => onButtonClick(prop)}
              key={i}
            >
              <Avatar
                className="avatar-image"
                alt={prop.name}
                src={prop.image}
                sx={{
                  width: 76,
                  height: 76,
                }}
              />
              {prop.title && <p>{prop.name}</p>}

              {prop.title && (
                <Rating
                  name="read-only"
                  value={prop.averageRating}
                  precision={0.5}
                  sx={{ margin: "1px auto", fontSize: 16 }}
                  readOnly
                />
              )}
            </div>
          )
      )}
    </div>
  );
}
