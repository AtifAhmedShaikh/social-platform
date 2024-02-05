import dotenv from "dotenv";
import process from "node:process";

dotenv.config({
  path: ".env",
});

const DATABASE_URI = process.env.DATABASE_URI;
const PORT = process.env.PORT;
const MODE = process.env.MODE;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
const SMTP_FROM_EMAIL = process.env.SMTP_FROM_EMAIL;
const SMTP_FROM_NAME = process.env.SMTP_FROM_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;

export {
  DATABASE_URI,
  PORT,
  MODE,
  FRONTEND_ORIGIN,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  SMTP_USER,
  SMTP_FROM_NAME,
  SMTP_FROM_EMAIL,
  SMTP_PASSWORD,
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
};
