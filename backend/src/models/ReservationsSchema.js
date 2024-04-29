import mongoose from "mongoose"

const reservationsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    startDate: { type: Date, required: true, default: Date.now(), trim: true },
    endDate: { type: Date, required: true, trim: true }, // # Date.now() Plus
    boatsId: { type: mongoose.Types.ObjectId, ref: "Boats", required: true }
  },
  { collection: "reservations" }
)

export const Reservations = mongoose.model("Reservations", reservationsSchema)
