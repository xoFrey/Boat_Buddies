import { Reservations } from "../models/ReservationsSchema.js";

export const deleteReservation = async (resId) => {
  const deleted = await Reservations.findOneAndDelete(resId);
  if (!deleted) throw new Error("Reservation not found!");
  else return deleted;
};
