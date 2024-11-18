const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const MentorshipForm = require("../models/Mentorship.js"); // for testing purpose
//const MentorshipForm = require('../models/MentorshipForm'); //For production
const authenticate = require("../middleware/authMiddleware.js");
const multer = require("multer");
const path = require("path");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, accountType } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      email,
      password: hashedPassword,
      profile: {
        firstName,
        lastName,
        accountType,
      },
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({
      message: "User created successfully",
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.json({
      message: "Logged in successfully",
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const fs = require("fs").promises;

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "..", "uploads");
fs.mkdir(uploadDir, { recursive: true }).catch(console.error);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload an image file."), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

router.post(
  "/profile",
  authenticate,
  upload.single("image"),
  async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      // Update user profile fields
      user.profile = {
        ...user.profile,
        firstName: req.body.firstName || user.profile.firstName,
        lastName: req.body.lastName || user.profile.lastName,
        accountType: req.body.accountType || user.profile.accountType,
        location: req.body.location || user.profile.location,
        danceStyle: req.body.danceStyle || user.profile.danceStyle,
        experienceLevel:
          req.body.experienceLevel || user.profile.experienceLevel,
        bio: req.body.bio || user.profile.bio,
      };

      // Handle image upload
      if (req.file) {
        // Remove old image if it exists
        if (user.profile.image) {
          const oldImagePath = path.join(__dirname, "..", user.profile.image);
          await fs.unlink(oldImagePath).catch(console.error);
        }

        // Store the new image path
        const imageUrl = `/uploads/${req.file.filename}`;
        user.profile.image = imageUrl;
      }

      await user.save();

      res.json({
        message: "Profile updated successfully",
        profile: user.profile,
      });
    } catch (error) {
      console.error("Profile update error:", error);
      res
        .status(500)
        .json({ message: "Error updating profile", error: error.message });
    }
  }
);

// Serve uploaded files
router.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

router.post("/mentorship-form", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const mentorshipForm = new MentorshipForm({
      user: req.userId,
      ...req.body,
    });

    await mentorshipForm.save();
    res.status(201).json({
      message: "Mentorship form submitted successfully",
      form: mentorshipForm,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/mentorship-forms", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || !user.isMentor) {
      return res
        .status(403)
        .json({ message: "Access denied. Mentor status required." });
    }

    const forms = await MentorshipForm.find().populate(
      "user",
      "email profile.firstName profile.lastName"
    );
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
