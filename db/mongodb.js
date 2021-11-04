import mongoose from "mongoose";
import "dotenv/config";

const dbURL = process.env.dbURL;

mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db is connected");
  })
  .catch((err) => {
    console.log("db error", err);
  });
