const request = require("supertest");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const authRouter = require("../routes/auth.js");
const authenticate = require("../middleware/authMiddleware.js");

jest.mock("bcryptjs");
jest.mock("jsonwebtoken");
jest.mock("../models/User.js");
jest.mock("../middleware/authMiddleware.js");

const app = express();
app.use(express.json());
app.use("/auth", authRouter);

describe("Auth Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /signup", () => {
    it("should register a new user and redirect to profile", async () => {
      User.findOne.mockResolvedValue(null);
      User.prototype.save.mockResolvedValue();
      bcrypt.hash.mockResolvedValue("hashedPassword");
      jwt.sign.mockReturnValue("token");

      const response = await request(app).post("/auth/signup").send({
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      });

      expect(User.findOne).toHaveBeenCalledWith({ email: "john@example.com" });
      expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);
      expect(response.status).toBe(302);
      expect(response.headers.location).toBe("/profile");
    });

    it("should return 400 if user already exists", async () => {
      User.findOne.mockResolvedValue({ email: "existing@example.com" });

      const response = await request(app).post("/auth/signup").send({
        name: "Jane Doe",
        email: "existing@example.com",
        password: "password123",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("User already exists");
    });
  });

  describe("POST /login", () => {
    it("should log in a user with valid credentials", async () => {
      const user = {
        _id: "userId",
        email: "john@example.com",
        password: "hashedPassword",
      };
      User.findOne.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("token");

      const response = await request(app)
        .post("/auth/login")
        .send({ email: "john@example.com", password: "password123" });

      expect(User.findOne).toHaveBeenCalledWith({ email: "john@example.com" });
      expect(response.status).toBe(302);
      expect(response.headers.location).toBe("/dashboard");
    });

    it("should return 400 if user is not found", async () => {
      User.findOne.mockResolvedValue(null);

      const response = await request(app)
        .post("/auth/login")
        .send({ email: "notfound@example.com", password: "password123" });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("User not found");
    });
  });

  describe("GET /profile", () => {
    it("should retrieve profile of authenticated user", async () => {
      const user = {
        _id: "userId",
        name: "John Doe",
        email: "john@example.com",
        profile: { firstName: "John", lastName: "Doe" },
      };

      authenticate.mockImplementation((req, res, next) => {
        req.userId = user._id;
        next();
      });

      User.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(user),
      });

      const response = await request(app).get("/auth/profile");

      expect(response.status).toBe(200);
      expect(response.body.profile.firstName).toBe("John");
    });

    it("should return 404 if user profile not found", async () => {
      authenticate.mockImplementation((req, res, next) => {
        req.userId = "invalidUserId";
        next();
      });

      User.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      const response = await request(app).get("/auth/profile");

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("User not found");
    });
  });
});
