import { Boats } from "../models/BoatsSchema.js";
import { Reservations } from "../models/ReservationsSchema.js";

export const getAllAvailableBoats = async () => {
  const foundRes = await Reservations.find();
  const boatIDs = foundRes.map((resBoat) => resBoat.boatsId);
  return Boats.find({ _id: { $nin: boatIDs } });
};
