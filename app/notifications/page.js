import NotificationComponent from "@/app/components/NotificationComponent";
import Loading from "./loading";
import { Suspense } from "react";

export default function NotificationsPage() {
  return (
    <div className="container sub-container">
      <h2>Notifications</h2>
      <Suspense fallback={<Loading />}>
        <NotificationComponent />
      </Suspense>
    </div>
  );
}
