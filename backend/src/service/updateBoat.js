import { Boats } from "../models/BoatsSchema.js";

export const updateBoat = async (boatsId, updateInfo) => {
  if (updateInfo.seriennummer) {
    const foundBoat = await Boats.findOne({
      seriennummer: updateInfo.seriennummer,
    });
    if (foundBoat) {
      throw new Error("Cannot change to exisiting serial number!");
    }
    return Boats.findByIdAndUpdate(
      boatsId,
      { $set: updateInfo },
      { new: true },
    );
  }
};
