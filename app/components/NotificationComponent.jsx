// /components/NotificationComponent.js
"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = process.env.NEXT_PUBLIC_PASSCODE || "";

        const response = await fetch("/api/notifications", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Authentication failed or other error.");
        }

        const data = await response.json();

        if (data.length) {
          setNotifications(data);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setError("Failed to load notifications.");
      }
    };

    fetchNotifications();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      {notifications.map((notification) => (
        <Card
          key={notification._id}
          sx={{
            maxWidth: 400,
            width: "100%",
            borderRadius: 2,
            boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.21)",
          }}
        >
          <CardContent sx={{ minHeight: 100, position: "relative" }}>
            <Typography variant="h6" component="div"  sx={{ marginBottom: 1, fontSize: "1rem" }}>
              {notification.title} 
            </Typography>
            <Typography
              variant="body1"
              component="div"
              sx={{ marginBottom: 1, fontSize: "0.9rem" }}
            >
              {notification.message}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
                fontSize: "0.75rem", // Smaller font size for the date
              }}
            >
              {new Date(notification.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default NotificationComponent;
