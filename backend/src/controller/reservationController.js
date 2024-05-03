const getAllRes = async (req, res) => {
  try {
    const allReservations = await ReservationService.getAllReservations();
    res.json(allReservations || {});
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json((err, { message: "Could not get all Reservations! " }));
  }
};

const getAllReservedBoats = async (req, res) => {
  try {
    const allRes = await ReservationService.getAllReservedBoats();
    res.json(allRes);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json((err, { message: "Could not get reservated Boats! " }));
  }
};

const getAllAvailableBoats = async (req, res) => {
  try {
    const available = await ReservationService.getAllAvailableBoats();
    res.json(available);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json((err, { message: "Could not get reservated Boats! " }));
  }
};

const createReservation = async (req, res) => {
  try {
    const newReservation = {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      startDate: req.body.startDate,
      endDate: req.body.endDate, // # Date.now() Plus
      boatsId: req.params.boatsId,
    };
    const newRes = await ReservationService.createNewReservation(
      newReservation,
    );
    res.json(newRes || {});
  } catch (err) {
    console.log(err);
    res.status(500).json((err, { message: "Could not add new Reservation! " }));
  }
};

const deleteReservation = async (req, res) => {
  try {
    const resId = req.params.resId;
    const deleted = await ReservationService.deleteReservation(resId);
    res.json(deleted || {});
  } catch (err) {
    console.log(err);
    res.status(500).json((err, { message: "Could not delete  Reservation! " }));
  }
};

const updateReservation = async (req, res) => {
  try {
    const resId = req.params.resId;
    const updateInfo = {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      boatsId: req.params.boatsId,
    };
    const updated =
      await ReservationService.ReservationService.updateReservation(
        resId,
        updateInfo,
      );
    res.json(updated || {});
  } catch (err) {
    console.log(err);
    res.status(500).json((err, { message: "Could not edit Reservation! " }));
  }
};

export const ReservationsController = {
  getAllRes,
  getAllReservedBoats,
  getAllAvailableBoats,
  createReservation,
  deleteReservation,
  updateReservation,
};

//   try {
//   } catch (err) {}
