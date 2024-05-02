import { Boats } from "../models/BoatsSchema.js";

export const getAllBoats = () => {
  return Boats.find({});
};
