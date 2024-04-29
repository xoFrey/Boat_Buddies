import { body, param, validationResult } from "express-validator"
import { config } from "dotenv"
import express from "express"
import morgan from "morgan"
import multer from "multer"
import cors from "cors"
import { connectToDatabase } from "./models/connectDb.js"

config()

const app = express()

// Middleware
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.static("uploads"))

connectToDatabase()
  .then(() => {
    const PORT = process.env.PORT
    app.listen(PORT, () => console.log("Server runs on port:", PORT))
  })
  .catch((err) => {
    console.log(err)
    process.exit()
  })
