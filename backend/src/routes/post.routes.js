import express from "express";
import { authenticateUser, isAuthorizedToDelete } from "../middleware/auth.middleware.js";
import { createPost, deletePost, getPostById, getPosts } from "../controllers/post.controller.js";
import { validateData } from "../middleware/validation.middleware.js";
import { createPostSchema } from "../validation/postSchema.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.use(authenticateUser);

router.route("/all").get(getPosts);
router.route("/:id").get(getPostById);
router.route("/create").post(upload.single("postImage"), validateData(createPostSchema), createPost);
router.route("/delete/:id").delete(isAuthorizedToDelete("POST"), deletePost);

export default router;
