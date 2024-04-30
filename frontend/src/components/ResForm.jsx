import { useState } from "react";
import { useParams } from "react-router-dom";
import { backendUrl } from "../Api/api";

const ResForm = ({
  setNewRes,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  username,
  setUsername,
  phone,
  setPhone,
  email,
  setEmail,
  toggleUpdate,
  setToggleUpdate,
  resId
}) => {
  const { boatsId } = useParams();
  const [error, setError] = useState(false);

  const addReservation = (e) => {
    e.preventDefault();
    if (
      username.length === 0 ||
      phone.length === 0 ||
      email.length === 0 ||
      startDate.length === 0 ||
      endDate.length === 0
    )
      return setError(true);

    const newReservation = {
      name: username,
      phone: phone,
      email: email,
      startDate: startDate,
      endDate: endDate,
      boatsId: boatsId
    };

    fetch(`${backendUrl}/api/v1/reservations/${boatsId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReservation)
    })
      .then((res) => res.json())
      .then((data) => setNewRes(data))
      .catch((err) => console.log(err));

    setUsername("");
    setPhone("");
    setEmail("");
    setStartDate("");
    setEndDate("");
    setError(false);
  };

  const updateReservation = (e) => {
    e.preventDefault();

    if (
      username.length === 0 ||
      phone.length === 0 ||
      email.length === 0 ||
      startDate.length === 0 ||
      endDate.length === 0
    )
      return setError(true);

    const updatedData = {
      name: username,
      phone: phone,
      email: email,
      startDate: startDate,
      endDate: endDate,
      boatsId: boatsId
    };

    fetch(`${backendUrl}/api/v1/reservations/${boatsId}/${resId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData)
    })
      .then((res) => res.json())
      .then((data) => setNewRes(data))
      .catch((err) => console.log(err));

    setToggleUpdate(false);
    setUsername("");
    setPhone("");
    setEmail("");
    setStartDate("");
    setEndDate("");
    setError(false);
  };

  return (
    <main className="flex flex-col items-center">
      <div className="px-8">
        <h2 className="font-bold">
          {toggleUpdate ? "Update your reservation" : "Reserve a nice and juicy boat"}
        </h2>
        <form
          onSubmit={toggleUpdate ? updateReservation : addReservation}
          className="flex flex-col gap-5 mt-5">
          <div className="relative">
            <label
              htmlFor="id"
              className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
              Boats Id
            </label>
            <input
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              defaultValue={boatsId}
              disabled
            />
          </div>
          <div className="relative">
            <label
              htmlFor="username"
              className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
              Username
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              name="username"
              id="username"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="phone"
              className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
              Phone Number
            </label>
            <input
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              type="text"
              name="phone"
              id="phone"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="email"
              className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
              E-Mail
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              name="email"
              id="email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <label
                htmlFor="start"
                className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
                Start Date
              </label>
              <input
                onChange={(e) => setStartDate(e.target.value)}
                value={startDate}
                type="date"
                name="start"
                id="start"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="end"
                className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
                End Date
              </label>
              <input
                onChange={(e) => setEndDate(e.target.value)}
                value={endDate}
                type="date"
                name="end"
                id="end"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <h3 className={`text-red-500 ${error ? "visible" : "hidden"}`}>
            {toggleUpdate ? " Äh, bitte, nicht leer lassen" : "Bitte etwas eintragen!"}
          </h3>
          <div className="flex gap-3 mb-20">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ">
              {toggleUpdate ? "Update" : "Submit"}
            </button>
            <button
              type="Exit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Exit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ResForm;
