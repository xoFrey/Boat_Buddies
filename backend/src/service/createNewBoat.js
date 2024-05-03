import { Boats } from "../models/BoatsSchema.js";

export const createNewBoat = async (boatInfo) => {
  const foundBoat = await Boats.find({ name: boatInfo.seriennummer });
  if (foundBoat) throw new Error("Boat already exists");
  else return Boats.create(boatInfo);
};
