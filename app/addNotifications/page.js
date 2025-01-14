// "use client";

// import { useState } from "react";

// export default function NotificationsPage() {
//   const [authPasscode, setAuthPasscode] = useState("");
//   const [title, setTitle] = useState("");
//   const [message, setMessage] = useState("");
//   const [notifications, setNotifications] = useState([]);

//   const fetchNotifications = async () => {
//     try {
//       const res = await fetch("/api/notifications", {
//         headers: { Authorization: `Bearer ${authPasscode}` },
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setNotifications(data);
//       } else {
//         alert("Unauthorized");
//       }
//     } catch (err) {
//       alert("Error fetching notifications");
//     }
//   };

//   const pushNotification = async () => {
//     try {
//       const res = await fetch("/api/notifications", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${authPasscode}`,
//         },
//         body: JSON.stringify({ title, message }),
//       });

//       if (res.ok) {
//         setTitle("");
//         setMessage("");
//         fetchNotifications(); // Refresh notifications after pushing one
//       } else {
//         alert("Unauthorized or Error Creating Notification");
//       }
//     } catch (err) {
//       alert("Error pushing notification");
//     }
//   };

//   return (
//     <div>
//       <h1>Notifications Dashboard</h1>

//       <div>
//         <label>
//           Authentication Passcode:
//           <input
//             type="password"
//             value={authPasscode}
//             onChange={(e) => setAuthPasscode(e.target.value)}
//           />
//         </label>
//         <button onClick={fetchNotifications}>Fetch Notifications</button>
//       </div>

//       <div>
//         <h2>Create a Notification</h2>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <textarea
//           placeholder="Message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         ></textarea>
//         <button onClick={pushNotification}>Push Notification</button>
//       </div>

//       <div>
//         <h2>Notifications List</h2>
//         <ul>
//           {notifications.map((notif) => (
//             <li key={notif._id}>
//               <strong>{notif.title}</strong> - {notif.message} (Created:{" "}
//               {new Date(notif.date).toLocaleString("en-IN", {
//                 timeZone: "Asia/Kolkata",
//               })}
//               )
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Container,
} from "@mui/material";

export default function NotificationsPage() {
  const [authPasscode, setAuthPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [notificationStatus, setNotificationStatus] = useState(null);

  const handlePasscodeSubmit = () => {
    const correctPasscode = process.env.NEXT_PUBLIC_PASSCODE; // Ensure the passcode is correctly set in .env file
    if (authPasscode === correctPasscode) {
      setIsAuthenticated(true);
    } else {
      setNotificationStatus({ type: "error", message: "Incorrect passcode!" });
    }
  };

  const pushNotification = async () => {
    try {
      const res = await fetch("/api/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authPasscode}`,
        },
        body: JSON.stringify({ title, message }),
      });

      if (res.ok) {
        setTitle("");
        setMessage("");
        setNotificationStatus({
          type: "success",
          message: "Notification pushed successfully!",
        });
      } else {
        setNotificationStatus({
          type: "error",
          message: "Error creating notification or unauthorized",
        });
      }
    } catch (err) {
      setNotificationStatus({
        type: "error",
        message: "Error pushing notification",
      });
    }
  };

  return (
    <div className="container sub-container">
      <Container>
        {!isAuthenticated ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <Typography variant="h4" gutterBottom>
              Enter Passcode
            </Typography>
            <TextField
              label="Passcode"
              variant="outlined"
              type="password"
              value={authPasscode}
              onChange={(e) => setAuthPasscode(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handlePasscodeSubmit}
            >
              Submit
            </Button>
            {notificationStatus && (
              <Alert sx={{ mt: 2 }} severity={notificationStatus.type}>
                {notificationStatus.message}
              </Alert>
            )}
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <Typography variant="h4" gutterBottom>
              Create a Notification
            </Typography>
            <TextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Message"
              variant="outlined"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={pushNotification}
            >
              Push Notification
            </Button>
            {notificationStatus && (
              <Alert sx={{ mt: 2 }} severity={notificationStatus.type}>
                {notificationStatus.message}
              </Alert>
            )}
          </Box>
        )}
      </Container>
    </div>
  );
}
