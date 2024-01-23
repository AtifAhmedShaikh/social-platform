import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import errorHandler from "./error/errorHandler.js";
import authRouter from "./routes/auth.routes.js";
import helmet from "helmet";
import morgan from "morgan";
import userRouter from "./routes/user.routes.js";

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
app.use("/api/v1/users", userRouter);

// Handle not found routes
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not founded!" });
});
app.use(errorHandler); // apply error handler middleware

export default app;
