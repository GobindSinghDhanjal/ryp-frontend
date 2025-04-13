import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { Grid, Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import avgRating from "./avgRatingUtil";

export default function ProfessorCard({ props }) {
  const router = useRouter();

  function onButtonClick(prop) {
    if (prop.title) {
      router.push(`/professor?search=${encodeURIComponent(prop._id)}`);
    } else {
      router.push(`/university?search=${encodeURIComponent(prop._id)}`);
    }
  }

  return (
    <div className="card">
    <Grid container>
      {props.map((prop, i) => (
        <Grid className="professor-card" xs={12} md={6} sx={{ padding: 1 }}>
        <Card
          className="single-card"
          onClick={() => {
            onButtonClick(prop);
          }}
          key={i}
          sx={{
            maxWidth: 345,
            borderRadius: "10px",
            marginTop: "40px",
            padding: "20px 10px",
          }}
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
        </Grid>
      ))}
      </Grid>
    </div>
  );
}
