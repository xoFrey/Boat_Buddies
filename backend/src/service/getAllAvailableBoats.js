import { Boats } from "../models/BoatsSchema";
import { Reservations } from "../models/ReservationsSchema";

export const getAllAvailableBoats = () => {
  return Reservations.find()
    .then((foundRes) => foundRes.map((resBoat) => resBoat.boatsId))
    .then((boatIDs) => Boats.find({ _id: { $nin: boatIDs } }));
};
