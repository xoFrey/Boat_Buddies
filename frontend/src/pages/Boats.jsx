import { useContext } from "react";
import BoatCard from "../components/BoatCard";
import BoatsForm from "../components/BoatsForm";
import { AllBoats } from "../Context/Context";
import { Button } from "../components/Button";

const Boats = ({ setRender }) => {
  const { allBoats } = useContext(AllBoats);

  return <section className="flex flex-col items-center pt-4">
    <div className="flex gap-2 justify-center mb-10">
      <Button text={"All Boats"} />
      <Button text={"Available Boats"} />
      <Button text={"All reserved Boats"} />
    </div>
    <article className="grid sm:grid-cols-3 grid-cols-1 gap-4 px-5 mb-12 ">
      {allBoats ? allBoats.map((boat, index) => (
        <div key={index} >
          <BoatCard boat={boat} />
        </div>
      )) : <p>Loading...</p>}

    </article>

    <BoatsForm setRender={setRender} />
  </section>;
};

export default Boats;
