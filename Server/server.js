import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import cafeRouter from "./routes/cafe.js"

// bL8vwmdraXiti-F
// mongodb+srv://machika:<password>@cluster0.gnuwln2.mongodb.net/?retryWrites=true&w=majority


const app = express();

app.use(morgan("start"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRouter); // http://localhost:8000/users/signup
app.use("/cafe", cafeRouter)

const MONGODB_URL =
  "mongodb+srv://machika:bL8vwmdraXiti-F@cluster0.gnuwln2.mongodb.net/cafe_db?retryWrites=true&w=majority"

const port = 8800;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => console.log(`${error} did not connect`));
