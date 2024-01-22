import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import errorHandler from "./error/errorHandler.js";
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Declare user authentication routes
app.use("/api/v1/auth", authRouter);

app.use(errorHandler); // apply error handler middleware

export default app;
