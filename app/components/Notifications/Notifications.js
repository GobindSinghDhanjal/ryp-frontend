"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Loading from "./loading";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextCursor, setNextCursor] = useState(null);
  const observer = useRef();

  const fetchNotifications = useCallback(async () => {
    if (loading && notifications.length > 0) return;
    setLoading(true);

    try {
      const token = process.env.NEXT_PUBLIC_PASSCODE || "";
      const url = `${
        process.env.NEXT_PUBLIC_NEXT_BASE_URL
      }/notifications?limit=10${nextCursor ? `&cursor=${nextCursor}` : ""}`;

      console.log("Fetching from:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Authentication failed or other error.");
      }

      const { data, nextCursor: newCursor } = await response.json();

      setNotifications((prev) => {
        const existingIds = new Set(prev.map((item) => item._id));
        const newNotifications = data.filter(
          (item) => !existingIds.has(item._id)
        );
        return [...prev, ...newNotifications];
      });

      setNextCursor(newCursor);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setError("Failed to load notifications.");
    } finally {
      setLoading(false);
    }
  }, [nextCursor, loading]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const lastNotificationRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextCursor) {
          fetchNotifications();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, nextCursor]
  );

  if (error) return <p>{error}</p>;

  return (
    <div className="container sub-container">
      <h1>Notifications</h1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {notifications.map((notification, index) => (
          <Card
            key={notification._id}
            ref={
              index === notifications.length - 1 ? lastNotificationRef : null
            }
            sx={{
              width: "100%",
              borderRadius: 2,
              boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.21)",
            }}
          >
            <CardContent sx={{ minHeight: 100, position: "relative" }}>
              <Typography
                variant="h6"
                component="div"
                sx={{ marginBottom: 1, fontSize: "1rem" }}
              >
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
                  fontSize: "0.75rem",
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
      {loading && <Loading />}
    </div>
  );
};

export default Notifications;
