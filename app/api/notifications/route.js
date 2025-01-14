import dbConnect from "@/app/utils/dbConnect";
import Notification from "@/app/models/Notification";
import { authenticate } from "@/app/utils/authenticate";

export async function GET(req) {
  try {
    authenticate(req);
    await dbConnect();

    const notifications = await Notification.find().sort({ date: -1 });
    return new Response(JSON.stringify(notifications), { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 401 });
  }
}

export async function POST(req) {
  try {
    authenticate(req);
    await dbConnect();

    const { title, message } = await req.json();

    if (!message) {
      return new Response("Missing title or message", { status: 400 });
    }

    const newNotification = new Notification({
      title: title || " ",
      message,
    });
    await newNotification.save();

    return new Response(JSON.stringify(newNotification), { status: 201 });
  } catch (error) {
    return new Response(error.message, { status: 401 });
  }
}
