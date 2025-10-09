import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/tanstack.routes.js";
import { connectDB } from "./db.js";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["https://react-tanstack-crud.onrender.com"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", router);

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Api is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
