import { createNewBoat } from "./createNewBoat.js";
import { createNewReservation } from "./createNewReservation.js";
import { deleteBoat } from "./deleteBoat.js";
import { deleteReservation } from "./deleteReservation.js";
import { getAllAvailableBoats } from "./getAllAvailableBoats.js";
import { getAllBoats } from "./getAllBoats.js";
import { getAllReservations } from "./getAllReservations.js";
import { getAllReservedBoats } from "./getAllReservedBoats.js";
import { getBoatDetail } from "./getBoatDetail.js";
import { updateBoat } from "./updateBoat.js";
import { updateReservation } from "./updateReservation.js";

export const BoatService = {
  getAllBoats,
  getBoatDetail,
  createNewBoat,
  deleteBoat,
  updateBoat,
};

export const ReservationService = {
  getAllReservations,
  getAllReservedBoats,
  getAllAvailableBoats,
  createNewReservation,
  deleteReservation,
  updateReservation,
};
