import { connectDB } from "../config/db";
import Mentorship from "../models/Mentorship.js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Connect to MongoDB
      await connectDB();

      // Extract form data from the request body
      const formData = req.body;

      // Create a new mentorship document and save it to the DB
      const newMentorship = new Mentorship(formData);
      await newMentorship.save();

      return res
        .status(200)
        .json({ success: true, message: "Form submitted successfully!" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: "Failed to submit form" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
