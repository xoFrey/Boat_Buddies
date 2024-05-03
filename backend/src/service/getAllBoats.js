import { Boats } from "../models/BoatsSchema.js";

export const getAllBoats = async () => {
  const found = await Boats.find({});
  return found;
};
