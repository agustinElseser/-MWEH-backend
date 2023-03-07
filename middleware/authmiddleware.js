import jwt from "jsonwebtoken";
import User from "../models/User.js";

const checkAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select(
        "-password -token -confirm"
      );

      return next();
    } catch (error) {
      const e = new Error("TOKEN NO VALIDO");
      res.status(403).json({ msg: e.message });
    }
  }
  if (!token) {
    const error = new Error("TOKEN NO VALIDO  O INEXISTENTE");
    res.status(403).json({ msg: error.message });
  }

  next();
};

export default checkAuth;
