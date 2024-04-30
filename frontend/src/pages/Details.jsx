import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { backendUrl } from "../Api/api.js";
import ResForm from "../components/ResForm.jsx";
import { TiDeleteOutline } from "react-icons/ti";
import { AllBoats } from "../Context/Context.jsx";
import { FaEdit } from "react-icons/fa";
import { Button } from "../components/Button.jsx";

const Details = () => {
  const { allBoats, setAllBoats } = useContext(AllBoats);
  const [boatsData, setBoatsData] = useState([]);
  const { boatsId } = useParams();
  const [newRes, setNewRes] = useState();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [toggleForm, setToggleForm] = useState(false);

  const [name, setName] = useState("");
  const [baujahr, setBaujahr] = useState(0);
  const [seriennummer, setSeriennummer] = useState(0);
  const [materialien, setMaterialien] = useState("");
  const [boottypen, setBoottypen] = useState("");
  const [error, setError] = useState(false);


  useEffect(() => {
    fetch(`${backendUrl}/api/v1/boats/${boatsId}`)
      .then((res) => res.json())
      .then((data) => setBoatsData(data))
      .catch((err) => console.log(err));
  }, [newRes]);

  const deleteBoat = () => {
    fetch(`${backendUrl}/api/v1/boats/${boatsId}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => setAllBoats(allBoats.filter((item) => data._id !== item._id)))
      .then(() => fetch(`${backendUrl}/api/v1/reservations/${boatsId}`, { method: "DELETE" }))
      .catch((err) => console.log(err));
  };

  const deleteReservation = () => {
    fetch(`${backendUrl}/api/v1/reservations/${boatsId}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => setNewRes(data))
      .catch((err) => console.log(err));
  };

  const handleResEdit = (boatsId) => {
    const reservation = boatsData.reservations.filter((item) => item._id === boatsId);
    setUsername(reservation[0].name);
    setPhone(reservation[0].phone);
    setEmail(reservation[0].email);
    setStartDate(reservation[0].startDate.slice(0, 10));
    setEndDate(reservation[0].endDate.slice(0, 10));

    setToggleUpdate(true);
  };


  const handleBoatEdit = () => {
    setToggleForm(true);
    setName(boatsData.name);
    setSeriennummer(boatsData.seriennummer);
    setBoottypen(boatsData.boatsType);
    setMaterialien(boatsData.material);
    setBaujahr(boatsData.baujahr);
  };

  const editBoat = (e) => {
    e.preventDefault();
    const updateBoat = {
      name: name,
      boatsType: boottypen,
      baujahr: baujahr,
      seriennummer: seriennummer,
      material: materialien,
      // imgUrl:,
    };

    fetch(`${backendUrl}/api/v1/boats/${boatsId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateBoat)
      })
      .then((res) => res.json())
      .then((data) => setNewRes(data))
      .catch((err) => console.log(err));
    setToggleForm(false);
  };



  return (
    <>
      <section>
        <div className="mb-8 flex flex-col items-start">
          <h1 className="font-bold mb-4">Boats Details Page</h1>
          <h2>{boatsData.name}</h2>
          <h2>SN: {boatsData.seriennummer}</h2>
          <h2>Baujahr: {boatsData.baujahr}</h2>
          <h2>Type: {boatsData.boatsType}</h2>
          <h2>Material: {boatsData.material}</h2>
          <div className="flex gap-2 items-center">
            <Link to="/boats" className="inline">
              <TiDeleteOutline
                onClick={deleteBoat}
                className="cursor-pointer text-red-500"
                size={30}
              />
            </Link>
            <FaEdit onClick={handleBoatEdit} className="cursor-pointer" size={25} />
          </div>
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
                  <FaEdit
                    onClick={() => handleResEdit(item._id)}
                    className="cursor-pointer"
                    size={25}
                  />
                </div>
              </div>
            );
          })}
      </section>
      <section>
        {toggleForm ? (
          <section className="mt-10">

            <form onSubmit={editBoat} className={`flex flex-col gap-5 mb-20 mt-10 `}>
              <div className="relative">
                <label
                  htmlFor="name"
                  className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
                  Name
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder=""
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="baujahr"
                  className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
                  Baujahr
                </label>
                <input
                  onChange={(e) => setBaujahr(e.target.value)}
                  value={baujahr}
                  type="number"
                  name="baujahr"
                  id="baujahr"
                  min={0}
                  // max={9999}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="SN"
                  className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
                  Seriennummer
                </label>
                <input
                  onChange={(e) => setSeriennummer(e.target.value)}
                  value={seriennummer}
                  type="number"
                  name="SN"
                  id="SN"
                  min={0}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div>
                <label
                  htmlFor="materials"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Materials
                </label>
                <select
                  onChange={(e) => setMaterialien(e.target.value)}
                  value={materialien}
                  id="materials"
                  name="materials"
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option>GFK</option>
                  <option>Holz</option>
                  <option>Metall</option>
                  <option>Pappe</option>
                  <option>Seelen</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="boattype"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Boat Type
                </label>
                <select
                  onChange={(e) => setBoottypen(e.target.value)}
                  value={boottypen}
                  id="boattype"
                  name="boattype"
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option>Tretboot</option>
                  <option>Segelboot</option>
                  <option>Luftkissenboot</option>
                  <option>Geisterschiff</option>
                  <option>Containerschiff</option>
                </select>

                <h3 className={`text-red-500 ${error ? "visible" : "hidden"}`}>
                  Bitte etwas eintragen!
                </h3>

                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Submit
                </button>
              </div>
            </form>
          </section>
        ) : (
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
        )}
      </section>
    </>
  );
};

export default Details;
