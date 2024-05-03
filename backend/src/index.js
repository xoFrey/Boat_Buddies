import { body, param, validationResult } from "express-validator";
import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import multer from "multer";
import cors from "cors";
import { connectToDatabase } from "./models/connectDb.js";
import { boatsRouter } from "./routes/boatsRouter.js";
import { reservationsRouter } from "./routes/reservationsRouter.js";

config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("uploads"));

const upload = multer({ dest: "./uploads" });
app.post("/api/v1/files/upload", upload.single("pictures"), (req, res) => {
  res.json({ imgUrl: req.file.filename });
});
app.use("/api/v1/boats", boatsRouter);
app.use("/api/v1/reservations", reservationsRouter);

connectToDatabase()
  .then(() => {
    const PORT = process.env.PORT;
    app.listen(PORT, () => console.log("Server runs on port:", PORT));
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });
