import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token)
    return res.status(401).json({ message: "You are not authenticated!" });

  jwt.verify(token, process.env.JWT_KEY, function (err, data) {
    if (err)
      return res.status(403).json({ message: "You are not authorized!" });
    else {
      req.user = data;
      next();
    }
  });
};
