import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

//connect to DB
connectToDB().then(
  app.listen(process.env.PORT, () => {
    console.log(`Server is up and running on Port number ${process.env.PORT}`);
  })
);

app.use("/api/users", userRouter);

app.use((err, req, res, nex));
