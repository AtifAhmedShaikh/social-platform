import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { isAuthorizedToPostModification } from "../middleware/authZ.middleware.js";
import { createPost, deletePost, getPostById, getPosts } from "../controllers/post.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.use(authenticateUser);

router.route("/").get(getPosts);
router.route("/:id").get(getPostById).delete(isAuthorizedToPostModification, deletePost);
router.route("/create").post(upload.single("postImage"), createPost);

export default router;
