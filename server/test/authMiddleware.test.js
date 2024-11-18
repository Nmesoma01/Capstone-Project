const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authMiddleware");
require("dotenv").config();

jest.mock("jsonwebtoken");

describe("authenticate middleware", () => {
  const mockReq = (token) => ({ cookies: { token } });
  const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const mockNext = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return 401 if no token is provided", () => {
    const req = mockReq(null);
    const res = mockRes();

    authenticate(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Unauthorized. Please login.",
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  test("should return 401 if token is invalid", () => {
    const req = mockReq("invalidToken");
    const res = mockRes();

    jwt.verify.mockImplementation(() => {
      throw new Error("Invalid token");
    });

    authenticate(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid token. Please login again.",
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  test("should call next() if token is valid", () => {
    const req = mockReq("validToken");
    const res = mockRes();

    jwt.verify.mockImplementation((token, secret) => {
      expect(secret).toBe(process.env.JWT_SECRET);
      if (token === "validToken") return { id: "user123" };
      throw new Error("Invalid token");
    });

    authenticate(req, res, mockNext);

    expect(jwt.verify).toHaveBeenCalledWith(
      "validToken",
      process.env.JWT_SECRET
    );
    expect(req.userId).toBe("user123");
    expect(mockNext).toHaveBeenCalled();
  });
});
