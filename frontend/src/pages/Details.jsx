import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { backendUrl } from "../Api/api.js"
import ResForm from "../components/ResForm.jsx"
import { TiDeleteOutline } from "react-icons/ti"
import { AllBoats } from "../Context/Context.jsx"
import { FaEdit } from "react-icons/fa"

const Details = () => {
  const { allBoats, setAllBoats } = useContext(AllBoats)
  const [boatsData, setBoatsData] = useState([])
  const { boatsId } = useParams()
  const [newRes, setNewRes] = useState()

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [username, setUsername] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")

  const [toggleUpdate, setToggleUpdate] = useState(false)

  useEffect(() => {
    fetch(`${backendUrl}/api/v1/boats/${boatsId}`)
      .then((res) => res.json())
      .then((data) => setBoatsData(data))
      .catch((err) => console.log(err))
  }, [newRes])

  const deleteBoat = () => {
    fetch(`${backendUrl}/api/v1/boats/${boatsId}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => setAllBoats(allBoats.filter((item) => data._id !== item._id)))
      .then(() => fetch(`${backendUrl}/api/v1/reservations/${boatsId}`, { method: "DELETE" }))
      .catch((err) => console.log(err))
  }

  const deleteReservation = () => {
    fetch(`${backendUrl}/api/v1/reservations/${boatsId}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => setNewRes(data))
      .catch((err) => console.log(err))
  }

  const handleResEdit = (boatsId) => {
    const reservation = boatsData.reservations.filter((item) => item._id === boatsId)

    setUsername(reservation[0].name)
    setPhone(reservation[0].phone)
    setEmail(reservation[0].email)
    setStartDate(reservation[0].startDate.slice(0, 10))
    setEndDate(reservation[0].endDate.slice(0, 10))

    setToggleUpdate(true)
  }

  return (
    <>
      <section>
        <div className="mb-8 flex flex-col items-start">
          <h1 className="font-bold mb-4">Boats Details Page</h1>
          <h2>{boatsData.name}</h2>
          <h2>SN: {boatsData.seriennummer}</h2>
          <h2>Type: {boatsData.boatsType}</h2>
          <h2>Material: {boatsData.material}</h2>
          <Link to="/boats" className="inline">
            <TiDeleteOutline
              onClick={deleteBoat}
              className="cursor-pointer text-red-500"
              size={30}
            />
          </Link>
        </div>

        <h2 className="font-bold">Reservations</h2>
        {boatsData.reservations &&
          boatsData.reservations.map((item) => {
            return (
              <div className="mb-8" key={item._id}>
                <p>{item.name}</p>
                <p>{item.phone}</p>
                <p>{item.email}</p>
                <p>{item.startDate}</p>
                <p>{item.endDate}</p>
                <div className="flex gap-2 items-center">
                  <TiDeleteOutline
                    onClick={deleteReservation}
                    className="cursor-pointer text-red-500"
                    size={30}
                  />
                  <FaEdit onClick={() => handleResEdit(item._id)} className="" size={25} />
                </div>
              </div>
            )
          })}
      </section>
      <section>
        <ResForm
          setNewRes={setNewRes}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          username={username}
          setUsername={setUsername}
          phone={phone}
          setPhone={setPhone}
          email={email}
          setEmail={setEmail}
          toggleUpdate={toggleUpdate}
          setToggleUpdate={setToggleUpdate}
        />
      </section>
    </>
  )
}

export default Details
