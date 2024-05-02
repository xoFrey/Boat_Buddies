import { Reservations } from "../models/ReservationsSchema.js";

export const createNewReservation = (newReservation) => {
  Reservations.find(
    { startDate: newReservation.startDate },
    { boatsId: newReservation.boatsId },
  ).then((foundRes) => {
    if (foundRes) throw new Error("Reservation to this Boat already exists!");
    else return Reservations.create(newReservation);
  });
};
