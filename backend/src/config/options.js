import { FRONTEND_ORIGIN } from "./envConfig.js";

// setup configuration of cookies for storing tokens in user's browser cookies securely
export const cookieOptions = {
  httpOnly: true,
};
// setup configuration of cors to allow over frontend App Origin to access server
export const corsOptions = {
  origin: FRONTEND_ORIGIN,
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
