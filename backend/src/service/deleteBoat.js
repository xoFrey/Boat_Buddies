import { Boats } from "../models/BoatsSchema.js";

export const deleteBoat = async (boatsId) => {
  const deleted = Boats.findByIdAndDelete(boatsId);
  if (!deleted) throw new Error("Boat not found!");
  else return deleted;
};
