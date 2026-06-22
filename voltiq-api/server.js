import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import connectMongoDB from "./mongodb/connect.js";
import userRouter from "./routes/user.route.js";
import listingRouter from "./routes/listing.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

connectMongoDB(process.env.MONGO);

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173", // TODO: CHANGE_FOR_PROD
    credentials: true,
    methods: "GET, HEAD, OPTIONS, PUT, PATCH, POST, DELETE",
  }),
);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("ERROR 500");
});

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

// http://localhost:3000/api/v1/users/66e572489aba57053932eebe
app.use("/api/v1/users", userRouter);
// http://localhost:3000/api/v1/listings/latest
app.use("/api/v1/listings", listingRouter);

app.use("/api/v1/auth", authRouter);

// TODO: CHANGE_FOR_PROD
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
