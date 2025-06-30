import { Express } from "express";
import cardLookupRouter from "./card-lookup";

function generateEndpoints(app: Express): void {
  app.use("/card-lookup", cardLookupRouter);
}

export default generateEndpoints;
