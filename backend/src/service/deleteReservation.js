import { Reservations } from "../models/ReservationsSchema";

export const deleteReservation = (resId) => {
  return Reservations.findOneAndDelete(resId).then((deleted) => {
    if (!deleted) throw new Error("Reservation not found!");
    else return deleted;
  });
};
