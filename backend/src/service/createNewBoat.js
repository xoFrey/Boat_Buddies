import { Boats } from "../models/BoatsSchema.js";

export const createNewBoat = (boatInfo) => {
  return Boats.find({ name: boatInfo.seriennummer }).then((foundBoat) => {
    if (foundBoat) throw new Error("Boat already exists");
    else return Boats.create(boatInfo);
  });
};
