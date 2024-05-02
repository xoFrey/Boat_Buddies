import { Boats } from "../models/BoatsSchema";

export const deleteBoat = (boatsId) => {
  return Boats.findByIdAndDelete(boatsId).then((deleted) => {
    if (!deleted) throw new Error("Boat not found!");
    else return deleted;
  });
};
