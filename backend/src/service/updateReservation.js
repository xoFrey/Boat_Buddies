import { Reservations } from "../models/ReservationsSchema.js";

export const updateReservation = (resId, updateInfo) => {
  const editReservation = () => {
    Reservations.findByIdAndUpdate(resId, { $set: updateInfo }, { new: true });
  };
  if (updateInfo.startDate) {
    return Reservations.findOne(
      { startDate: updateInfo.startDate },
      { boatsId: updateInfo.boatsId },
    ).then((foundRes) => {
      if (foundRes) {
        throw new Error("Cannot change to exisiting start Date!");
      }
      return editReservation();
    });
  } else {
    return editReservation();
  }
};
