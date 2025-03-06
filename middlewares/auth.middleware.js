import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.models.js";

const verifyJWT = async (req, res, next) => {
  try {
    // console.log(req.headers);
    // const token = req.headers?.authorization?.split(" ")[1];
    // const token = req.headers.authorization;
   
    console.log(req.cookies.accessToken);
    

    // const accessToken = token.split(" ")[1];
    const accessToken=req.cookies.accessToken;
    // console.log(req.headers);
    if (!accessToken)
      return res.status(401).json({ msg: "Unauthorised request" });

    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    
    const user = await UserModel.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    if (!user) return res.status(400).json({ msg: "Invalid access token" });

    req.user = user;
    next();
  } catch (error) {
    return res.json({ msg: error.message });
  }
};

export { verifyJWT };
