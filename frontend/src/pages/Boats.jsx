import { useContext } from "react";
import BoatCard from "../components/BoatCard";
import { AllBoats } from "../Context/Context";

const Boats = () => {
  const { allBoats } = useContext(AllBoats);

  return <section className="flex flex-col items-center">
    <div className="flex gap-2 justify-center">
      <button>All Boats</button>
      <button>All Reservations</button>
      <button>All Available</button>
    </div>
    <article className="grid sm:grid-cols-3 grid-cols-1 gap-4 px-5 ">
      {allBoats.map((boat) => (
        <div key={boat._id} >
          <BoatCard boat={boat} />
        </div>
      ))}

    </article>
    <button className="border rounded-xl p-2 shadow-md cursor-pointer">Add New Boat</button>
  </section>;
};

export default Boats;
