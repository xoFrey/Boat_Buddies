import { Boats } from "../models/BoatsSchema.js";
import { Reservations } from "../models/ReservationsSchema.js";

export const getBoatDetail = (boatsId) => {
  return Promise.all([Boats.findById(boatsId), Reservations.find({ boatsId })]);
};
