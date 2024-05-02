import { Reservations } from "../models/ReservationsSchema.js";

export const getAllReservations = () => {
  return Reservations.find({});
};
