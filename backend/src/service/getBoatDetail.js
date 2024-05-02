import { Boats } from "../models/BoatsSchema";
import { Reservations } from "../models/ReservationsSchema";

export const getBoatDetail = (boatsId) => {
  return Promise.all([
    Boats.findById(boatsId),
    Reservations.find({ boatsId }),
  ]).then(([foundBoats, foundRes]) =>
    res.json(
      foundBoats ? { ...foundBoats.toObject(), reservations: foundRes } : {},
    ),
  );
};
