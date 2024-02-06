import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import errorHandler from "./error/errorHandler.js";
import authRouter from "./routes/auth.routes.js";
import helmet from "helmet";
import morgan from "morgan";
import userRouter from "./routes/user.routes.js";
import updateAccountRouter from "./routes/updateAccount.routes.js";
import postRouter from "./routes/post.routes.js";
import likeRouter from "./routes/like.routes.js";
import commentRouter from "./routes/comment.routes.js";
import tweetRouter from "./routes/tweet.routes.js";
import reelRouter from "./routes/reel.routes.js";
import followRouter from "./routes/Follow.routes.js";
import userGalleryRouter from "./routes/userGallery.routes.js";

const app = express();

// configure express app middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Declare app routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/update-account", updateAccountRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/tweets", tweetRouter);
app.use("/api/v1/reels", reelRouter);
app.use("/api/v1/follow", followRouter);
app.use("/api/v1/gallery", userGalleryRouter);

// Handle not found routes
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not founded!" });
});
app.use(errorHandler); // apply error handler middleware

export default app;
