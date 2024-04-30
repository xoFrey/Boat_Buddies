import { useState } from "react"
import { useParams } from "react-router-dom"
import { backendUrl } from "../Api/api"

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
  setToggleUpdate
}) => {
  const { boatsId } = useParams()
  const [error, setError] = useState(false)

  const addReservation = (e) => {
    e.preventDefault()
    if (
      username.length === 0 ||
      phone.length === 0 ||
      email.length === 0 ||
      startDate.length === 0 ||
      endDate.length === 0
    )
      return setError(true)

    const newReservation = {
      name: username,
      phone: phone,
      email: email,
      startDate: startDate,
      endDate: endDate,
      boatsId: boatsId
    }

    fetch(`${backendUrl}/api/v1/reservations/${boatsId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReservation)
    })
      .then((res) => res.json())
      .then((data) => setNewRes(data))
      .catch((err) => console.log(err))

    setUsername("")
    setPhone("")
    setEmail("")
    setStartDate("")
    setEndDate("")
    setError(false)
  }

  const updateReservation = (e) => {
    e.preventDefault()

    if (
      username.length === 0 ||
      phone.length === 0 ||
      email.length === 0 ||
      startDate.length === 0 ||
      endDate.length === 0
    )
      return setError(true)

    const updatedData = {
      name: username,
      phone: phone,
      email: email,
      startDate: startDate,
      endDate: endDate,
      boatsId: boatsId
    }

    fetch(`${backendUrl}/api/v1/reservations/${boatsId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData)
    })
      .then((res) => res.json())
      .then((data) => setNewRes(data))
      .catch((err) => console.log(err))

    setToggleUpdate(false)
    setUsername("")
    setPhone("")
    setEmail("")
    setStartDate("")
    setEndDate("")
    setError(false)
  }

  return (
    <div className="px-8">
      <h2 className="font-bold">
        {toggleUpdate ? "Update your reservation" : "Reserve a nice and juicy boat"}
      </h2>
      <form
        onSubmit={toggleUpdate ? updateReservation : addReservation}
        className="flex flex-col gap-2">
        <input type="text" defaultValue={boatsId} disabled />
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
          name="username"
          id="username"
        />
        <input
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          type="text"
          name="phone"
          id="phone"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          name="email"
          id="email"
        />
        <div className="flex">
          <input
            onChange={(e) => setStartDate(e.target.value)}
            value={startDate}
            type="date"
            name="start"
            id="start"
          />
          <input
            onChange={(e) => setEndDate(e.target.value)}
            value={endDate}
            type="date"
            name="end"
            id="end"
          />
        </div>
        <h3 className={`text-red-500 ${error ? "visible" : "hidden"}`}>
          {toggleUpdate ? " Äh, bitte, nicht leer lassen" : "Bitte etwas eintragen!"}
        </h3>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          {toggleUpdate ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  )
}

export default ResForm
