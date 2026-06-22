import jwt from "jsonwebtoken";

const UNAUTHORIZED_RESPONSE = { errors: "Not authorised" };

export const verifyAdminToken = (req, res, next) => {
  const token = req.cookies.accesstoken;

  if (!token) {
    return res.status(401).json(UNAUTHORIZED_RESPONSE);
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return res.status(401).json(UNAUTHORIZED_RESPONSE);
    }

    if (user?.role && user.role !== "admin") {
      return res.status(401).json(UNAUTHORIZED_RESPONSE);
    }

    req.user = user;
    req.userId = user.id;

    return next();
  });
};
