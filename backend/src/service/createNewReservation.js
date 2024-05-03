import { Reservations } from "../models/ReservationsSchema.js";

export const createNewReservation = async (newReservation) => {
  const foundRes = await Reservations.find(
    { startDate: newReservation.startDate },
    { boatsId: newReservation.boatsId },
  );
  if (foundRes) throw new Error("Reservation to this Boat already exists!");
  else return Reservations.create(newReservation);
};
