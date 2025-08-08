import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import generateEndpoints from "./controller";
require("console-stamp")(console, "[HH:MM:ss.l]");

const application = express();

application.use(cors({ origin: "*" }));
application.use(bodyParser.json());

const port = process.env.PORT || 3001;

application.listen(port, async () => {
  generateEndpoints(application);
  console.log("Server started at port", port);
});
