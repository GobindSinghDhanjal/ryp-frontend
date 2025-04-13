import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";
import { Rating, Skeleton } from "@mui/material";
import { useState } from "react";
import LoadingScreen from "./LoadingScreen";
import { useEffect } from "react";

export default function SingleAvatar({ props }) {
  const router = useRouter();

  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   console.log("loading : " + loading);
  // }, [loading]);

  function onButtonClick(prop) {
    // setLoading(true);
    if (prop.title) {
      router.push(`/professor?search=${encodeURIComponent(prop._id)}`);
      // setTimeout(() => {
      //   setLoading(false);
      //   router.push(`/professor?search=${encodeURIComponent(prop._id)}`);
      // }, 300);
    } else {
      router.push(`/university?search=${encodeURIComponent(prop._id)}`);
      // setLoading(false);
    }
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
      </Stack>
    </div>
  );
}
