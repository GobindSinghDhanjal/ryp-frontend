import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";
import { Rating, Skeleton } from "@mui/material";
import { calculateAverageRating } from "./averageRatingUtils";

export default function SingleAvatar({ props }) {
  const router = useRouter();

  function onButtonClick(prop) {
    if (prop.title) {
      router.push(`/professor?search=${encodeURIComponent(prop._id)}`);
    } else {
      router.push(`/university?search=${encodeURIComponent(prop.university)}`);
    }
  }

  function averageRating(params) {
    const ratings = professor.feedback.map((feedback) => feedback.rating);
    const average =
      ratings.reduce((total, rating) => total + rating, 0) / ratings.length;
  }

  if (!props || !props.length) {
    // Render skeleton or loading state while data is being fetched
    return (
      <div className="single-avatar-loading">
        <Stack direction="row" spacing={2} justifyContent="space-around">
          {[1, 2, 3].map((_, i) => (
            <div className="homepage-avatar" key={i}>
              <Skeleton variant="circular" width={76} height={76} />
              <Skeleton variant="text" width={76} height={20} />
              <Skeleton variant="text" width={76} height={20} />
            </div>
          ))}
        </Stack>
      </div>
    );
  }

  return (
    <div className="single-avatar">
      <Stack direction="row" spacing={2} justifyContent="space-around">
        {props.map(
          (prop, i) =>
            i < 3 && (
              <div className="homepage-avatar" key={i}>
                <Avatar
                  onClick={() => onButtonClick(prop)}
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
                    value={calculateAverageRating(prop.name)}
                    precision={0.5}
                    sx={{ margin: "1px auto", fontSize: 16 }}
                    readOnly
                  />
                )}
              </div>
            )
        )}
      </Stack>
    </div>
  );
}
