import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config";
import "./db/mongodb.js";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";

// app config
const app = express();
const port = process.env.port;

// middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

app.use(userRouter);
app.use(authRouter);

// api routes
app.get("/", (req, res) => {
  res.send("hello guys");
});

// listen
app.listen(port, (req, res) => {
  console.log(`server is running at ${port}`);
});
