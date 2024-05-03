import { Boats } from "../models/BoatsSchema.js";
import { Reservations } from "../models/ReservationsSchema.js";

export const getAllReservedBoats = async () => {
  const foundRes = await Reservations.find();
  const boatIDs = await foundRes.map((resBoat) => resBoat.boatsId);
  return Boats.find({ _id: { $in: boatIDs } });
};
