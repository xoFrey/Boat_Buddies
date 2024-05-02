import { Boats } from "../models/BoatsSchema.js";

export const updateBoat = (boatsId, updateInfo) => {
  const editBoat = () => {
    Boats.findByIdAndUpdate(boatsId, { $set: updateInfo }, { new: true });
  };
  if (updateInfo.seriennummer) {
    return Boats.findOne({ seriennummer: updateInfo.seriennummer }).then(
      (foundBoat) => {
        if (foundBoat) {
          throw new Error("Cannot change to exisiting serial number!");
        }
        return editBoat();
      },
    );
  } else {
    return editBoat();
  }
};
