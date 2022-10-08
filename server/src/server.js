import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import connectDB from "./config/connectDB";
import initAPIRoutes from "./routes/api";

import cors from "cors";

require("dotenv").config();

let app = express();

app.use(cors({ origin: true }));

//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);
initAPIRoutes(app);

connectDB();

let port = process.env.PORT || 6969;

app.listen(port, () => {
  console.log(`succeeded: web is running in http://localhost:${port}/`);
});
