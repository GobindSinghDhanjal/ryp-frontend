import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";
import { Rating, Skeleton } from "@mui/material";

export default function TopRatedUniversities({ props }) {
  const router = useRouter();

  function onButtonClick(prop) {
    router.push(`/university?search=${encodeURIComponent(prop._id)}`);
  }

  if (!props || !props.length) {
    return (
      <div className="single-avatar-loading">
        <Stack direction="row" spacing={2} justifyContent="space-around">
          {[1, 2, 3].map((_, i) => (
            <div className="homepage-avatar" key={i}>
              <Skeleton variant="circular" width={76} height={76} />
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
              </div>
            )
        )}
      </Stack>
    </div>
  );
}
