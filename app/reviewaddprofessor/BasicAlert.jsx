import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Divider } from "@mui/material";

export default function BasicAlerts({ alert }) {
  return (
    <div className="div">
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity={alert.severity}>
          {alert.message}
        </Alert>
      </Stack>
      <Divider style={{ marginTop: "1rem", marginBottom: "1rem" }} />
    </div>
  );
}
