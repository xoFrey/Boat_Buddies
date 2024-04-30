import { useContext, useEffect, useState } from "react"
import { Button } from "./Button"
import { backendUrl } from "../Api/api"
import { AllBoats } from "../Context/Context"

const BoatsForm = () => {
  const { allBoats, setAllBoats } = useContext(AllBoats)
  const [name, setName] = useState("")
  const [baujahr, setBaujahr] = useState(0)
  const [seriennummer, setSeriennummer] = useState(0)
  const [materialien, setMaterialien] = useState()
  const [boottypen, setBoottypen] = useState()
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState(false)

  const addBoat = (e) => {
    e.preventDefault()

    if (name.length === 0 || baujahr === 0 || seriennummer === 0) return setError(true)

    const newBoat = {
      name: name,
      boatsType: boottypen,
      baujahr: baujahr,
      seriennummer: seriennummer,
      material: materialien
      // imgUrl: { type: String, required: true, trim: true },
    }
    fetch(`${backendUrl}/api/v1/boats`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBoat)
    })
      .then((res) => res.json())
      .then((data) => {
        setAllBoats([...allBoats, data])
      })
      .catch((err) => console.log(err))

    setName("")
    setBaujahr(0)
    setSeriennummer(0)
    setError(false)
  }

  return (
    <section className="mt-10">
      <Button text={"Add new Boat"} functionFn={() => setShowForm(!showForm)} />
      <form
        onSubmit={addBoat}
        className={`flex flex-col gap-5 mb-20 mt-10 ${showForm ? "visible" : "hidden"}`}>
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
          <label htmlFor="materials" className="block text-sm font-medium leading-6 text-gray-900">
            Materials
          </label>
          <select
            onChange={(e) => setMaterialien(e.target.value)}
            value={materialien}
            id="materials"
            name="materials"
            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue="GFK">
            <option>GFK</option>
            <option>Holz</option>
            <option>Metall</option>
            <option>Pappe</option>
            <option>Seelen</option>
          </select>
        </div>
        <div>
          <label htmlFor="boattype" className="block text-sm font-medium leading-6 text-gray-900">
            Boat Type
          </label>
          <select
            onChange={(e) => setBoottypen(e.target.value)}
            value={boottypen}
            id="boattype"
            name="boattype"
            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue="Tretboot">
            <option>Tretboot</option>
            <option>Segelboot</option>
            <option>Luftkissenboot</option>
            <option>Geisterschiff</option>
            <option>Containerschiff</option>
          </select>

          <h3 className={`text-red-500 ${error ? "visible" : "hidden"}`}>Bitte etwas eintragen!</h3>

          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Submit
          </button>
        </div>
      </form>
    </section>
  )
}

export default BoatsForm
