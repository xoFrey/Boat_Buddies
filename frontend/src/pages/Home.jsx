import { useContext } from "react";
import StatsCard from "../components/StatsCard";
import { AllBoats, AllReservations, FilterBoats } from "../Context/Context";

const Home = () => {
  const { allBoats } = useContext(AllBoats);
  const { allReservations } = useContext(AllReservations);
  const { filter, setFilter } = useContext(FilterBoats);

  const title = {
    res: "Aktuelle Reservierungen",
    avail: "Verfügbare Boote",
    boats: "Gesamtanzahl Boote"
  };

  return (
    <main className="flex justify-center bg-lightblue">
      <section className="flex flex-wrap gap-2 min-h-screen content-center justify-center">
        <StatsCard title={title.res} stats={allReservations.length} setFilter={() => setFilter("reservedBoats")} />
        <StatsCard title={title.avail} stats={allBoats.length - allReservations.length} setFilter={() => setFilter("availableBoats")} />
        <StatsCard title={title.boats} stats={allBoats.length} setFilter={() => setFilter("allBoats")} />
      </section>
    </main>
  );
};

export default Home;
