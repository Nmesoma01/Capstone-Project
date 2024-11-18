const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const authenticate = require("../middleware/authMiddleware");
const path = require("path");
const multer = require("multer");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET; // Load the JWT secret from environment variables

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Add file type prefix to prevent filename collisions
    const prefix =
      file.fieldname === "profileImage" ? "profile-" : "portfolio-";
    cb(null, prefix + Date.now() + path.extname(file.originalname));
  },
});

// Configure file filter
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "profileImage") {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return cb(new Error("Only image files are allowed!"), false);
    }
  } else if (file.fieldname === "portfolioFile") {
    // Accept documents only
    if (!file.originalname.match(/\.(pdf|doc|docx)$/i)) {
      return cb(new Error("Only PDF and Word documents are allowed!"), false);
    }
  }
  cb(null, true);
};

// Configure multer upload
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
}).fields([
  { name: "profileImage", maxCount: 1 },
  { name: "portfolioFile", maxCount: 1 },
]);

// Register (Signup) Route

const { OAuth2Client } = require("google-auth-library");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

router.post("/google-signup", async (req, res) => {
  const { tokenId } = req.body;

  try {
    // Verify the token with Google
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: GOOGLE_CLIENT_ID,
    });
    const { email, name, picture } = ticket.getPayload();

    // Check if user exists in your database
    let user = await User.findOne({ email });
    if (!user) {
      // Sign up the new user if they don’t exist
      user = new User({
        name,
        email,
        profile: {
          image: picture,
        },
        password: Math.random().toString(36).slice(-8), // Temporary password for Google-auth users
      });
      await user.save();
    }

    // Generate JWT for session management
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    // Respond with user info
    res.json({
      message: "Google signup/login successful",
      user: {
        name: user.name,
        email: user.email,
        image: user.profile.image,
      },
    });
  } catch (error) {
    console.error("Google signup/login error:", error);
    res.status(500).json({ message: "Google signup/login failed" });
  }
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body; // Ensure 'name' is destructured
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Include 'name' in the new User object
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.redirect("/profile"); // Redirect to profile page after signup
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.redirect("/dashboard");
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Update Profile Route
router.post("/profile", authenticate, (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      // Handle Multer errors
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ message: "File is too large. Maximum size is 10MB." });
      }
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res
          .status(400)
          .json({ message: "Unexpected file upload field." });
      }
      return res
        .status(400)
        .json({ message: `File upload error: ${err.message}` });
    } else if (err) {
      // Handle other errors
      return res.status(400).json({ message: err.message });
    }

    try {
      const user = await User.findById(req.userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      // Create a sanitized profile object
      const sanitizedProfile = {
        firstName: req.body.firstName || user.profile.firstName,
        lastName: req.body.lastName || user.profile.lastName,
        location: req.body.location || user.profile.location,
        bio: req.body.bio || user.profile.bio,
      };

      // Handle account type
      if (
        req.body.accountType &&
        ["dancer", "recruiter"].includes(req.body.accountType)
      ) {
        sanitizedProfile.accountType = req.body.accountType;
      }

      // Handle dance style
      const validDanceStyles = [
        "traditional",
        "hipHop",
        "contemporary",
        "classic",
        "afrobeats",
        "street",
        "cultural",
        "partnerDance",
        "ballet",
        "danceFitness",
        "folk",
      ];
      if (
        req.body.danceStyle &&
        validDanceStyles.includes(req.body.danceStyle)
      ) {
        sanitizedProfile.danceStyle = req.body.danceStyle;
      }

      // Handle experience level
      if (
        req.body.experienceLevel &&
        ["beginner", "intermediate", "professional"].includes(
          req.body.experienceLevel
        )
      ) {
        sanitizedProfile.experienceLevel = req.body.experienceLevel;
      }

      // Update user profile with existing data
      user.profile = {
        ...user.profile,
        ...sanitizedProfile,
      };

      // Handle profile image upload
      if (req.files && req.files["profileImage"]) {
        const imageUrl = `/uploads/${req.files["profileImage"][0].filename}`;
        user.profile.image = imageUrl;
      }

      // Handle portfolio file upload
      if (req.files && req.files["portfolioFile"]) {
        const portfolioUrl = `/uploads/${req.files["portfolioFile"][0].filename}`;
        user.profile.portfolio = portfolioUrl;
      }

      await user.save();

      res.json({
        message: "Profile updated successfully",
        profile: user.profile,
      });
    } catch (error) {
      console.error("Profile update error:", error);
      res.status(500).json({
        message: "Error updating profile",
        error: error.message,
      });
    }
  });
});

router.get("/profile", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If the user doesn't have a profile, initialize it
    if (!user.profile) {
      user.profile = {};
    }

    // Prepare the response object
    const profileData = {
      name: user.name,
      email: user.email,
      profile: {
        firstName: user.profile.firstName || "",
        lastName: user.profile.lastName || "",
        accountType: user.profile.accountType || "",
        location: user.profile.location || "",
        danceStyle: user.profile.danceStyle || "",
        experienceLevel: user.profile.experienceLevel || "",
        bio: user.profile.bio || "",
        image: user.profile.image
          ? `/uploads/${path.basename(user.profile.image)}`
          : null,
        portfolio: user.profile.portfolio
          ? `/uploads/${path.basename(user.profile.portfolio)}`
          : null,
      },
    };

    res.json(profileData);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
