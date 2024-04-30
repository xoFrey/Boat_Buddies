import { useContext, useEffect, useState } from "react"
import BoatCard from "../components/BoatCard"
import BoatsForm from "../components/BoatsForm"
import { AllBoats, FilterBoats } from "../Context/Context"
import { Button } from "../components/Button"
import { backendUrl } from "../Api/api"

const Boats = ({ setRender }) => {
  const { allBoats } = useContext(AllBoats)
  const { filter, setFilter } = useContext(FilterBoats)
  const [availBoats, setAvailBoats] = useState([])
  const [reservedBoats, setReservedBoats] = useState([])

  useEffect(() => {
    fetch(`${backendUrl}/api/v1/boats/available`)
      .then((res) => res.json())
      .then((data) => setAvailBoats(data))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    fetch(`${backendUrl}/api/v1/boats/reserved`)
      .then((res) => res.json())
      .then((data) => setReservedBoats(data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <main className="bg-lightblue min-h-screen flex items-center py-20 flex-col px-8">
      <h1 className="font-bold text-3xl text-center mb-8">
        Boats Control Center Plus Advanced Pro
      </h1>
      <section className="flex flex-col items-center pt-4">
        <div className="flex gap-2 justify-center mb-10">
          <Button text={"All Boats"} functionFn={() => setFilter("allBoats")} />
          <Button text={"Available Boats"} functionFn={() => setFilter("availableBoats")} />
          <Button text={"All reserved Boats"} functionFn={() => setFilter("reservedBoats")} />
        </div>
        {filter === "allBoats" && (
          <article className="grid lg:grid-cols-2 xl:grid-cols-4 grid-cols-1 gap-5 px-5 mb-12 ">
            {allBoats ? (
              allBoats.map((boat, index) => (
                <div key={index}>
                  <BoatCard boat={boat} />
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </article>
        )}
        {filter === "availableBoats" && (
          <article className="grid sm:grid-cols-3 grid-cols-1 gap-4 px-5 mb-12 ">
            {availBoats ? (
              availBoats.map((boat, index) => (
                <div key={index}>
                  <BoatCard boat={boat} />
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </article>
        )}
        {filter === "reservedBoats" && (
          <article className="grid sm:grid-cols-3 grid-cols-1 gap-4 px-5 mb-12 ">
            {reservedBoats ? (
              reservedBoats.map((boat, index) => (
                <div key={index}>
                  <BoatCard boat={boat} />
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </article>
        )}

        <BoatsForm setRender={setRender} />
      </section>
    </main>
  )
}

export default Boats
