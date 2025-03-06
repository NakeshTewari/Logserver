import { Router } from "express";
import multer from "multer";
import {
    RegisterUser,
    loginUser,
    logoutUser,
    currentUserDetails,
  } from "../controllers/user.controllers.js";
 import {verifyJWT} from "../middlewares/auth.middleware.js";

  const router = Router();

  router.route("/register").post( RegisterUser);
  router.route("/login").post(loginUser);

  router.route("/logout").post(verifyJWT, logoutUser);

router.route("/currentUser").get(verifyJWT, currentUserDetails);

export default router;
