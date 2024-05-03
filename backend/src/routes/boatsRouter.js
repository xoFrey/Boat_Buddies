import express from "express";
import { BoatController } from "../controller/boatController";

export const boatsRouter = express
  .Router()
  .get("/api/v1/boats", BoatController.getAllBoats)
  .get("/api/v1/boats/:boatsId", BoatController.getOneBoat)
  .post("/api/v1/boats", BoatController.createBoat)
  .delete("/api/v1/boats/:boatsId", BoatController.deleteBoat)
  .patch("/api/v1/boats/:boatsId", BoatController.updateBoat);
