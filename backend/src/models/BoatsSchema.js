import mongoose from "mongoose";

const boatsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    boatsType: {
      type: String,
      required: true,
      enum: [
        "Tretboot",
        "Segelboot",
        "Luftkissenboot",
        "Geisterschiff",
        "Containerschiff",
      ],
    },
    baujahr: { type: Number, required: true },
    seriennummer: { type: Number, required: true, unique: true },
    material: {
      type: String,
      required: true,
      enum: ["GFK", "Holz", "Metall", "Pappe", "Seelen"],
    },
    imgUrl: { type: String, required: false, trim: true },
  },
  { collection: "boats" },
);

export const Boats = mongoose.model("Boats", boatsSchema);
