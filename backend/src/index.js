import { body, param, validationResult } from "express-validator";
import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import multer from "multer";
import cors from "cors";
import { connectToDatabase } from "./models/connectDb.js";
import { Boats } from "./models/BoatsSchema.js";
import { Reservations } from "./models/ReservationsSchema.js";

config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("uploads"));

app.get("/api/v1/boats", (req, res) => {
  Boats.find()
    .then((allBoats) => res.json(allBoats || {}))
    .catch((err) => {
      console.log(err);
      res.status(500).json((err, { message: "Could not get all Boat! " }));
    });
});

app.get("/api/v1/boats/:boatsId", (req, res) => {
  const boatsId = req.params.boatsId;
  Promise.all([Boats.findById(boatsId), Reservations.find({ boatsId })])
    .then(([foundBoats, foundRes]) =>
      res.json(foundBoats ? { ...foundBoats.toObject(), foundRes } : {}),
    ) // ! why second not spread?
    .catch((err) => {
      console.log(err);
      res.status(500).json((err, { message: "Could not get all Boat! " }));
    });
});

app.post("/api/v1/boats", (req, res) => {
  const newBoat = {
    name: req.body.name,
    boatsType: req.body.boatsType,
    baujahr: req.body.baujahr,
    seriennummer: req.body.seriennummer,
    material: req.body.material,
    imgUrl: req.body.imgUrl,
  };
  Boats.create(newBoat)
    .then((addedBoat) => res.json(addedBoat || {}))
    .catch((err) => {
      console.log(err);
      res.status(500).json((err, { message: "Could not add new Boat! " }));
    });
});

app.post("/api/v1/reservations/:boatsId", (req, res) => {
  const newReservation = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    startDate: req.body.startDate,
    endDate: req.body.endDate, // # Date.now() Plus
    boatsId: req.params.boatsId,
  };

  Reservations.create(newReservation)
    .then((newRes) => res.json(newRes || {}))
    .catch((err) => {
      console.log(err);
      res.status(500).json((err, { message: "Could not add new Boat! " }));
    });
});

app.delete("/api/v1/boats/:boatsId", (req, res) => {
  const boatsId = req.params.boatsId;
  Boats.findByIdAndDelete(boatsId)
    .then((deleted) => res.json(deleted || {}))
    .catch((err) => {
      console.log(err);
      res.status(500).json((err, { message: "Could not add new Boat! " }));
    });
});

connectToDatabase()
  .then(() => {
    const PORT = process.env.PORT;
    app.listen(PORT, () => console.log("Server runs on port:", PORT));
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });
