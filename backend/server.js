import app from "./src/app.js";
import { PORT } from "./src/config/envConfig.js";
import connectMongoDB from "./src/database/connection.js";

connectMongoDB();

app.listen(PORT, () => {
  console.log("server has running at :", PORT);
});
