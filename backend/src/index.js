import { body, param, validationResult } from "express-validator";
import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import multer from "multer";
import cors from "cors";
import { connectToDatabase } from "./models/connectDb.js";
import { Boats } from "./models/BoatsSchema.js";
import { Reservations } from "./models/ReservationsSchema.js";
import { BoatService, ReservationService } from "./service/index.js";

config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("uploads"));

const upload = multer({ dest: "./uploads" });
app.post("/api/v1/files/upload", upload.single("pictures"), (req, res) => {
  res.json({ imgUrl: req.file.filename });
});

app.get("/api/v1/boats", (req, res) => {
  BoatService.getAllBoats()
    .then((allBoats) => res.json(allBoats || {}))
    .catch((err) => {
      console.log(err);
      res.status(500).json((err, { message: "Could not get all Boat! " }));
    });
});

app.get("/api/v1/reservations", (req, res) => {
  ReservationService.getAllReservations()
    .then((allReservations) => res.json(allReservations || {}))
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json((err, { message: "Could not get all Reservations! " }));
    });
});

app.get("/api/v1/boats/reserved", (req, res) => {
  ReservationService.getAllReservedBoats()
    .then((allRes) => res.json(allRes))
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json((err, { message: "Could not get reservated Boats! " }));
    });
});

app.get("/api/v1/boats/available", (req, res) => {
  ReservationService.getAllAvailableBoats()
    .then((allRes) => res.json(allRes))
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json((err, { message: "Could not get reservated Boats! " }));
    });
});

app.get("/api/v1/boats/:boatsId", (req, res) => {
  const boatsId = req.params.boatsId;
  BoatService.getBoatDetail(boatsId)
    .then(([foundBoats, foundRes]) =>
      res.json(
        foundBoats ? { ...foundBoats.toObject(), reservations: foundRes } : {},
      ),
    )
    .then((detail) => res.json(detail || {}))
    .catch((err) => {
      console.log(err);
      res.status(500).json((err, { message: "Could not get one Boat! " }));
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
  BoatService.createNewBoat(newBoat)
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

  ReservationService.createNewReservation(newReservation)
    .then((newRes) => res.json(newRes || {}))
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json((err, { message: "Could not add new Reservation! " }));
    });
});

app.delete("/api/v1/boats/:boatsId", (req, res) => {
  const boatsId = req.params.boatsId;
  BoatService.deleteBoat(boatsId)
    .then((deleted) => res.json(deleted || {}))
    .catch((err) => {
      console.log(err);
      res.status(500).json((err, { message: "Could not delete Boat! " }));
    });
});

app.delete("/api/v1/reservations/:resId", (req, res) => {
  const resId = req.params.resId;
  ReservationService.deleteReservation(resId)
    .then((deleted) => res.json(deleted || {}))
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json((err, { message: "Could not delete reservation! " }));
    });
});

app.patch("/api/v1/boats/:boatsId", (req, res) => {
  const boatsId = req.params.boatsId;
  const updateInfo = {
    name: req.body.name,
    boatsType: req.body.boatsType,
    baujahr: req.body.baujahr,
    seriennummer: req.body.seriennummer,
    material: req.body.material,
    imgUrl: req.body.imgUrl,
  };

  BoatService.updateBoat(boatsId, updateInfo)
    .then((updated) => res.json(updated || {}))
    .catch((err) => {
      console.log(err);
      res.status(500).json((err, { message: "Could not update Boat! " }));
    });
});

app.patch("/api/v1/reservations/:boatsId/:resId", (req, res) => {
  const resId = req.params.resId;
  const updateInfo = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    boatsId: req.params.boatsId,
  };

  ReservationService.updateReservation(resId, updateInfo).catch((err) => {
    console.log(err);
    res.status(500).json((err, { message: "Could not update Reservations! " }));
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
