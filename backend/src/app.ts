import express, { NextFunction, Request, Response } from "express";
import { json } from "body-parser";
import { connect } from "mongoose";
import "dotenv/config";

import placesRoutes from "./routes/places-routes";
import usersRoutes from "./routes/users-routes";
import HttpError from "./shared/models/http-error";

const app = express();

app.use(json());

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use(() => {
  throw new HttpError("Could not find this route.", 404);
});

app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

connect(`${process.env.MONGODB_URI}`)
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
