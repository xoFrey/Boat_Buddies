import { Boats } from "../models/BoatsSchema.js";
import { Reservations } from "../models/ReservationsSchema.js";

export const getAllReservedBoats = () => {
  return Reservations.find()
    .then((foundRes) => foundRes.map((resBoat) => resBoat.boatsId))
    .then((boatIDs) => Boats.find({ _id: { $in: boatIDs } }));
};
