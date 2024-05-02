import { Reservations } from "../models/ReservationsSchema";

export const getAllReservations = () => {
  return Reservations.find({});
};
