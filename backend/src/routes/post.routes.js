import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { isAuthorizedToPostModification } from "../middleware/authZ.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { postSchema } from "../schema/contentSchema.js";
import { validateData } from "../middleware/validation.middleware.js";
import * as postController from "../controllers/post.controller.js";

const router = express.Router();

router.use(authenticateUser);

router
  .route("/")
  // GET endpoint to retrieve all posts
  .get(postController.getAllPosts)
  // POST endpoint to create a new post, using Multer middleware for file uploads
  .post(upload.single("postImage"), validateData(postSchema), postController.createPost);

router
  .route("/:id")
  // GET endpoint to retrieve a specific post by ID
  .get(postController.getPostById)
  // PUT endpoint to update the post, with authorization middleware
  .put(isAuthorizedToPostModification, validateData(postSchema), postController.updatePost)
  // DELETE endpoint to delete a post, with authorization middleware
  .delete(isAuthorizedToPostModification, postController.deletePost);

export default router;
