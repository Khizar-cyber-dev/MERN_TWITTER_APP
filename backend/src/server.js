import express from "express";
import connectDB from "./db/DB_Mongo.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";


cors({
  origin: "http://localhost:3000",
});

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
