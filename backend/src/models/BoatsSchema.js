import mongoose from "mongoose"

const boatsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    boatsType: {
      type: String,
      required: true,
      enum: ["Tretboot", "Segelboot", "Kuftkissenboot", "Geisterschiff", "Containerschiff"]
    },
    baujahr: { type: Number, required: true },
    seriennummer: { type: Number, required: true },
    material: { type: String, required: true, enum: ["GFK", "Holz", "Metall", "Pappe", "Seelen"] },
    imgUrl: { type: String, required: true, trim: true }
  },
  { collection: "boats" }
)

export const Boats = mongoose.model("Boats", boatsSchema)
