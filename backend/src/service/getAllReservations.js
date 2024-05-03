import { Reservations } from "../models/ReservationsSchema.js";

export const getAllReservations = async () => {
  const found = await Reservations.find({});
  return found;
};
