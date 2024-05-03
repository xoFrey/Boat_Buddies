import { Reservations } from "../models/ReservationsSchema.js";

export const updateReservation = async (resId, updateInfo) => {
  if (updateInfo.startDate) {
    const foundRes = await Reservations.findOne(
      { startDate: updateInfo.startDate },
      { boatsId: updateInfo.boatsId },
    );
    if (foundRes) {
      throw new Error("Cannot change to exisiting start Date!");
    }
  }
  return Reservations.findByIdAndUpdate(
    resId,
    { $set: updateInfo },
    { new: true },
  );
};
