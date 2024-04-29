import { useContext } from "react"
import StatsCard from "../components/StatsCard"
import { AllBoats, AllReservations } from "../Context/Context"

const Home = () => {
  const { allBoats } = useContext(AllBoats)
  const { allReservations } = useContext(AllReservations)

  const title = {
    res: "Aktuelle Reservierungen",
    avail: "Verfügbare Boote",
    boats: "Gesamtanzahl Boote"
  }

  return (
    <main className="flex justify-center">
      <section className="flex gap-8 min-h-screen items-center">
        <StatsCard title={title.res} stats={allReservations.length} />
        <StatsCard title={title.avail} stats={allBoats.length - allReservations.length} />
        <StatsCard title={title.boats} stats={allBoats.length} />
      </section>
    </main>
  )
}

export default Home
