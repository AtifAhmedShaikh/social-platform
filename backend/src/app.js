import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import errorHandler from "./error/errorHandler.js";
import authRouter from "./routes/auth.routes.js";
import helmet from "helmet";
import morgan from "morgan";
import userRouter from "./routes/user.routes.js";
import editProfileRouter from "./routes/editProfile.routes.js";
import postRouter from "./routes/post.routes.js";
import likeRouter from "./routes/like.routes.js";
import commentRouter from "./routes/comment.routes.js";
import tweetRouter from "./routes/tweet.routes.js";
import reelRouter from "./routes/reel.routes.js";
import followRouter from "./routes/Follow.routes.js";
import likedListRouter from "./routes/likedUsersList.routes.js";
import { corsOptions } from "./config/options.js";
import { sendNotifyEmailToClient } from "./utils/notifyEmail.js";

const app = express();

// configure express app middlewares
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Declare Index route of server
app.get("/", (_, res) => {
  res.status(200).json({ message: "Welcome to social platform server !" });
});
// Declare app routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/edit-profile", editProfileRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/tweets", tweetRouter);
app.use("/api/v1/reels", reelRouter);
app.use("/api/v1/relationship", followRouter);
app.use("/api/v1/liked-list", likedListRouter);
app.get("/send", async (req, res) => {
  const send = await sendNotifyEmailToClient({
    message: "testing Email for My App ",
    sendTo: "rashidahmedshaikh2219@gmail.com",
    title: "Title Not Found ! why ?",
  });
  res.status(200).json({ response: send });
});

// Handle not found routes
app.use((_, res) => {
  res.status(404).json({ message: "route not founded!" });
});

app.use(errorHandler); // apply error handler middleware

export default app;
