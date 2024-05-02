import mongoose from "mongoose"
import { config } from "dotenv"

config()

export const connectToDatabase = () => {
  const dbUrl = process.env.DB_URL
  return mongoose.connect(dbUrl, { dbName: "BoatBuddies" })
}
