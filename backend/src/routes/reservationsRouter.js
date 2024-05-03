import express from "express";
import { ReservationsController } from "../controller/reservationController";

export const reservationsRouter = express
  .Router()
  .get("/", ReservationsController.getAllRes)
  .get("/reserved", ReservationsController.getAllReservedBoats)
  .get("/available", ReservationsController.getAllAvailableBoats)
  .post("/:boatsId", ReservationsController.createReservation)
  .delete("/:resId", ReservationsController.deleteReservation)
  .patch("/:resId", ReservationsController.updateReservation);
