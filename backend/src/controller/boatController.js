import { BoatService } from "../service";

const getAllBoats = async (req, res) => {
  try {
    const allBoats = await BoatService.getAllBoats();
    res.json(allBoats || {});
  } catch (err) {
    console.log(err);
    res.status(500).json((err, { message: "Could not get all Boat! " }));
  }
};

const getOneBoat = async (req, res) => {
  try {
    const boatsId = req.params.boatsId;
    const foundBoats = await BoatService.getBoatDetail(boatsId);

    const detail = await res.json({
      ...foundBoats.toObject(),
      reservations: foundRes,
    });

    res.json(detail || {});
  } catch (err) {
    console.log(err);
    res.status(500).json((err, { message: "Could not get one Boat! " }));
  }
};

const createBoat = async (req, res) => {
  try {
    const newBoat = {
      name: req.body.name,
      boatsType: req.body.boatsType,
      baujahr: req.body.baujahr,
      seriennummer: req.body.seriennummer,
      material: req.body.material,
      imgUrl: req.body.imgUrl,
    };
    const addedBoat = await BoatService.createNewBoat(newBoat);
    res.json(addedBoat || {});
  } catch (err) {
    console.log(err);
    res.status(500).json((err, { message: "Could not add new Boat! " }));
  }
};

const deleteBoat = async (req, res) => {
  try {
    const boatsId = req.params.boatsId;
    const deleted = await BoatService.deleteBoat(boatsId);
    res.json(deleted || {});
  } catch (err) {
    console.log(err);
    res.status(500).json((err, { message: "Could not delete Boat! " }));
  }
};

const updateBoat = async (req, res) => {
  try {
    const boatsId = req.params.boatsId;
    const updateInfo = {
      name: req.body.name,
      boatsType: req.body.boatsType,
      baujahr: req.body.baujahr,
      seriennummer: req.body.seriennummer,
      material: req.body.material,
      imgUrl: req.body.imgUrl,
    };

    const updated = await BoatService.updateBoat(boatsId, updateInfo);
    res.json(updated || {});
  } catch (err) {
    console.log(err);
    res.status(500).json((err, { message: "Could not update Boat! " }));
  }
};

export const BoatController = {
  getAllBoats,
  getOneBoat,
  createBoat,
  deleteBoat,
  updateBoat,
};
